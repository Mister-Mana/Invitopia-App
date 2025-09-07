import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageIcon, X, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VenueImageManagementProps {
  coverImage?: string;
  galleryImages: string[];
  onCoverImageChange: (url: string | null) => void;
  onGalleryImagesChange: (urls: string[]) => void;
}

const VenueImageManagement: React.FC<VenueImageManagementProps> = ({
  coverImage,
  galleryImages,
  onCoverImageChange,
  onGalleryImagesChange
}) => {
  const { uploadImage, isUploading } = useImageUpload();
  const [dragOver, setDragOver] = useState(false);

  const handleCoverImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        onCoverImageChange(imageUrl);
        toast.success('Image de couverture ajoutée');
      }
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const handleGalleryImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        onGalleryImagesChange([...galleryImages, imageUrl]);
        toast.success('Image ajoutée à la galerie');
      }
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isGallery) {
        handleGalleryImageUpload(file);
      } else {
        handleCoverImageUpload(file);
      }
    }
  };

  const handleDrop = (event: React.DragEvent, isGallery: boolean = false) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (isGallery) {
        handleGalleryImageUpload(file);
      } else {
        handleCoverImageUpload(file);
      }
    }
  };

  const removeCoverImage = () => {
    onCoverImageChange(null);
    toast.success('Image de couverture supprimée');
  };

  const removeGalleryImage = (index: number) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(newImages);
    toast.success('Image supprimée de la galerie');
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Image de couverture
          </CardTitle>
        </CardHeader>
        <CardContent>
          {coverImage ? (
            <div className="relative">
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeCoverImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => handleDrop(e, false)}
            >
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Glissez une image ici ou cliquez pour sélectionner
              </p>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, false)}
                  className="hidden"
                  id="cover-upload"
                  disabled={isUploading}
                />
                <Label htmlFor="cover-upload">
                  <Button variant="outline" disabled={isUploading} asChild>
                    <span>
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Téléchargement...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Sélectionner une image
                        </>
                      )}
                    </span>
                  </Button>
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gallery Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Galerie d'images
            </div>
            <Badge variant="secondary">
              {galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => handleDrop(e, true)}
          >
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Ajouter des images à la galerie
            </p>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, true)}
                className="hidden"
                id="gallery-upload"
                disabled={isUploading}
              />
              <Label htmlFor="gallery-upload">
                <Button variant="outline" size="sm" disabled={isUploading} asChild>
                  <span>
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Téléchargement...
                      </>
                    ) : (
                      'Sélectionner'
                    )}
                  </span>
                </Button>
              </Label>
            </div>
          </div>

          {/* Gallery Grid */}
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueImageManagement;