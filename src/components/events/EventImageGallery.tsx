import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ImageUpload from '@/components/ui/ImageUpload';
import { toast } from 'sonner';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Download, 
  Share2,
  Eye,
  Camera
} from 'lucide-react';

interface EventImageGalleryProps {
  eventId: string;
  isOwner: boolean;
}

interface EventImage {
  id: string;
  url: string;
  filename: string;
  uploaded_at: string;
  is_cover: boolean;
}

const EventImageGallery: React.FC<EventImageGalleryProps> = ({ eventId, isOwner }) => {
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    fetchEventImages();
  }, [eventId]);

  const fetchEventImages = async () => {
    try {
      setLoading(true);
      // Simuler des images pour l'instant - à remplacer par de vraies données
      const mockImages: EventImage[] = [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500',
          filename: 'event-photo-1.jpg',
          uploaded_at: new Date().toISOString(),
          is_cover: true
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500',
          filename: 'event-photo-2.jpg',
          uploaded_at: new Date().toISOString(),
          is_cover: false
        }
      ];
      setImages(mockImages);
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
      toast.error('Erreur lors du chargement des images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File | null, previewUrl: string | null) => {
    if (!file) return;

    setUploading(true);
    try {
      // Upload vers Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `event-${eventId}-${Date.now()}.${fileExt}`;
      const filePath = `events/${eventId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('site-uploads')
        .getPublicUrl(filePath);

      const newImage: EventImage = {
        id: Date.now().toString(),
        url: data.publicUrl,
        filename: file.name,
        uploaded_at: new Date().toISOString(),
        is_cover: images.length === 0
      };

      setImages(prev => [...prev, newImage]);
      setUploadDialogOpen(false);
      toast.success('Image uploadée avec succès');
    } catch (error) {
      console.error('Erreur upload:', error);
      toast.error('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      try {
        setImages(prev => prev.filter(img => img.id !== imageId));
        toast.success('Image supprimée avec succès');
      } catch (error) {
        console.error('Erreur suppression:', error);
        toast.error('Erreur lors de la suppression de l\'image');
      }
    }
  };

  const handleSetAsCover = async (imageId: string) => {
    try {
      setImages(prev => prev.map(img => ({
        ...img,
        is_cover: img.id === imageId
      })));
      toast.success('Image définie comme couverture');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la définition de la couverture');
    }
  };

  const handleShareImage = (imageUrl: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Image de l\'événement',
        url: imageUrl
      });
    } else {
      navigator.clipboard.writeText(imageUrl);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Galerie ({images.length} image{images.length > 1 ? 's' : ''})
        </h3>
        {isOwner && (
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle image</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <ImageUpload
                  onImageChange={handleImageUpload}
                  size="lg"
                  fallbackText="📸"
                />
                {uploading && (
                  <div className="mt-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Upload en cours...</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {images.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune image</h3>
            <p className="text-muted-foreground mb-4">
              {isOwner 
                ? "Ajoutez des images pour embellir votre événement" 
                : "Aucune image n'a été partagée pour cet événement"}
            </p>
            {isOwner && (
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter la première image
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="group relative overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                    onClick={() => setSelectedImage(image.url)}
                  />
                  
                  {image.is_cover && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Couverture
                      </span>
                    </div>
                  )}

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedImage(image.url)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleShareImage(image.url)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>

                      {isOwner && (
                        <>
                          {!image.is_cover && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleSetAsCover(image.id)}
                              title="Définir comme couverture"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Aperçu de l'image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage}
                alt="Aperçu"
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" asChild>
                  <a href={selectedImage} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </a>
                </Button>
                <Button onClick={() => handleShareImage(selectedImage)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventImageGallery;