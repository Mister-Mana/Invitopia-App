import React, { useState, useEffect } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ui/ImageUpload';
import CountrySelector from '@/components/createEvent/CountrySelector';
import { toast } from 'sonner';
import { Edit, Save, X } from 'lucide-react';

interface EventEditDialogProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
  onEventUpdated: (event: any) => void;
}

const EventEditDialog: React.FC<EventEditDialogProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  onEventUpdated 
}) => {
  const { updateEvent } = useEvents();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'other',
    start_date: '',
    end_date: '',
    location: {
      address: '',
      city: '',
      country: ''
    },
    capacity: '',
    status: 'draft',
    visibility: 'private',
    primary_cover_image: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        type: event.type || 'other',
        start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
        end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '',
        location: {
          address: event.location?.address || '',
          city: event.location?.city || '',
          country: event.location?.country || ''
        },
        capacity: event.capacity?.toString() || '',
        status: event.status || 'draft',
        visibility: event.visibility || 'private',
        primary_cover_image: event.primary_cover_image || ''
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.start_date) {
      toast.error('Le titre et la date de début sont requis');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        type: formData.type as any,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        location: {
          address: formData.location.address.trim() || null,
          city: formData.location.city.trim() || null,
          country: formData.location.country.trim() || null
        },
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        status: formData.status as any,
        visibility: formData.visibility as any,
        primary_cover_image: formData.primary_cover_image || null
      };

      const updatedEvent = await updateEvent(event.id, updateData);
      onEventUpdated(updatedEvent);
      toast.success('Événement mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour de l\'événement');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (file: File | null, previewUrl: string | null) => {
    if (previewUrl) {
      setFormData(prev => ({ ...prev, primary_cover_image: previewUrl }));
    } else {
      setFormData(prev => ({ ...prev, primary_cover_image: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Modifier l'événement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image de couverture */}
          <div className="space-y-2">
            <Label>Image de couverture</Label>
            <ImageUpload
              onImageChange={handleImageChange}
              currentImage={formData.primary_cover_image}
              size="lg"
              fallbackText="🎉"
            />
          </div>

          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Titre de l'événement *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Mon super événement"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type d'événement</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Mariage</SelectItem>
                  <SelectItem value="birthday">Anniversaire</SelectItem>
                  <SelectItem value="corporate">Entreprise</SelectItem>
                  <SelectItem value="conference">Conférence</SelectItem>
                  <SelectItem value="party">Fête</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                placeholder="100"
                min="1"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Décrivez votre événement..."
              rows={3}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Date et heure de début *</Label>
              <Input
                id="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Date et heure de fin</Label>
              <Input
                id="end_date"
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              />
            </div>
          </div>

          {/* Lieu */}
          <div className="space-y-4">
            <Label>Lieu</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse complète</Label>
                <Input
                  id="address"
                  placeholder="123 Avenue de la Paix"
                  value={formData.location.address}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, address: e.target.value }
                  }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    placeholder="Kinshasa"
                    value={formData.location.city}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, city: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <CountrySelector
                    value={formData.location.country}
                    onChange={(value) => setFormData(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, country: value }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Paramètres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibilité</Label>
              <Select value={formData.visibility} onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Visibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Privé</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditDialog;