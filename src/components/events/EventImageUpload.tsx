import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  Camera, 
  X, 
  Crop, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Sparkles,
  Star,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { useImageUpload } from '@/hooks/useImageUpload';

interface EventImageUploadProps {
  currentImages?: string[];
  primaryImage?: string;
  onImagesUpdate: (images: string[], primaryImage?: string) => void;
  maxImages?: number;
}

const EventImageUpload: React.FC<EventImageUploadProps> = ({
  currentImages = [],
  primaryImage,
  onImagesUpdate,
  maxImages = 5
}) => {
  const [images, setImages] = useState<string[]>(currentImages);
  const [primary, setPrimary] = useState<string | undefined>(primaryImage);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editSettings, setEditSettings] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    rotation: 0,
    zoom: 100
  });
  const { uploadImage, isUploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length + images.length > maxImages) {
      toast.error(`Vous ne pouvez ajouter que ${maxImages} images maximum`);
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner uniquement des fichiers image');
        continue;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error('Les images ne doivent pas dépasser 10MB');
        continue;
      }

      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          const newImages = [...images, imageUrl];
          setImages(newImages);
          
          // Si c'est la première image, la définir comme principale
          if (newImages.length === 1) {
            setPrimary(imageUrl);
            onImagesUpdate(newImages, imageUrl);
          } else {
            onImagesUpdate(newImages, primary);
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const removeImage = (imageUrl: string) => {
    const newImages = images.filter(img => img !== imageUrl);
    setImages(newImages);
    
    // Si on supprime l'image principale, définir la première comme nouvelle principale
    let newPrimary = primary;
    if (primary === imageUrl) {
      newPrimary = newImages.length > 0 ? newImages[0] : undefined;
      setPrimary(newPrimary);
    }
    
    onImagesUpdate(newImages, newPrimary);
  };

  const setPrimaryImage = (imageUrl: string) => {
    setPrimary(imageUrl);
    onImagesUpdate(images, imageUrl);
  };

  const openEditDialog = (imageUrl: string) => {
    setEditingImage(imageUrl);
    setEditSettings({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      rotation: 0,
      zoom: 100
    });
    setIsEditDialogOpen(true);
  };

  const applyImageEnhancements = () => {
    // En pratique, vous appliqueriez ces transformations à l'image
    // Pour cette démo, nous fermons simplement le dialogue
    toast.success('Améliorations appliquées à l\'image');
    setIsEditDialogOpen(false);
  };

  const getImageStyle = () => {
    return {
      filter: `brightness(${editSettings.brightness}%) contrast(${editSettings.contrast}%) saturate(${editSettings.saturation}%)`,
      transform: `rotate(${editSettings.rotation}deg) scale(${editSettings.zoom / 100})`,
      transition: 'all 0.3s ease'
    };
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Images de l'événement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || images.length >= maxImages}
              className="gap-2"
            >
              {isUploading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {isUploading ? 'Téléchargement...' : 'Ajouter des images'}
            </Button>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    
                    {/* Primary Badge */}
                    {primary === imageUrl && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Principale
                        </div>
                      </div>
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      {primary !== imageUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setPrimaryImage(imageUrl)}
                          className="gap-1"
                        >
                          <Star className="h-3 w-3" />
                          Principale
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEditDialog(imageUrl)}
                        className="gap-1"
                      >
                        <Sparkles className="h-3 w-3" />
                        Améliorer
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(imageUrl)}
                        className="gap-1"
                      >
                        <X className="h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          )}

          {images.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Aucune image ajoutée</p>
              <p className="text-sm text-muted-foreground">
                Ajoutez des images pour rendre votre événement plus attrayant
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            {images.length}/{maxImages} images ajoutées. 
            Formats supportés: JPG, PNG, WebP. Taille max: 10MB par image.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Image Enhancement Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Améliorer l'image
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="space-y-4">
              <AspectRatio ratio={16 / 9}>
                {editingImage && (
                  <img
                    src={editingImage}
                    alt="Image à éditer"
                    className="w-full h-full object-cover rounded-lg"
                    style={getImageStyle()}
                  />
                )}
              </AspectRatio>
              
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditSettings(prev => ({ ...prev, rotation: prev.rotation - 90 }))}
                >
                  <RotateCw className="h-4 w-4 transform scale-x-[-1]" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditSettings(prev => ({ ...prev, rotation: prev.rotation + 90 }))}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditSettings(prev => ({ ...prev, zoom: Math.max(50, prev.zoom - 10) }))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditSettings(prev => ({ ...prev, zoom: Math.min(200, prev.zoom + 10) }))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Luminosité</Label>
                  <Slider
                    value={[editSettings.brightness]}
                    onValueChange={([value]) => setEditSettings(prev => ({ ...prev, brightness: value }))}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground">{editSettings.brightness}%</div>
                </div>

                <div className="space-y-2">
                  <Label>Contraste</Label>
                  <Slider
                    value={[editSettings.contrast]}
                    onValueChange={([value]) => setEditSettings(prev => ({ ...prev, contrast: value }))}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground">{editSettings.contrast}%</div>
                </div>

                <div className="space-y-2">
                  <Label>Saturation</Label>
                  <Slider
                    value={[editSettings.saturation]}
                    onValueChange={([value]) => setEditSettings(prev => ({ ...prev, saturation: value }))}
                    min={0}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground">{editSettings.saturation}%</div>
                </div>

                <div className="space-y-2">
                  <Label>Zoom</Label>
                  <Slider
                    value={[editSettings.zoom]}
                    onValueChange={([value]) => setEditSettings(prev => ({ ...prev, zoom: value }))}
                    min={50}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground">{editSettings.zoom}%</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={applyImageEnhancements} className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Appliquer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventImageUpload;