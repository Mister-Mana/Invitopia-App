import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useEvents } from '@/hooks/useEvents';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import CountrySelector from '@/components/createEvent/CountrySelector';
import { format } from 'date-fns';

const EventEditPage: React.FC = () => {
  const { t } = useLanguage();
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { events, getEventById, updateEvent } = useEvents();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    type: 'other',
    start_date: '',
    end_date: '',
    location: {
      address: '',
      city: '',
      country: '',
      venue: ''
    },
    capacity: '',
    visibility: 'private',
    allow_plus_ones: true,
    requires_approval: false,
    primary_cover_image: ''
  });

  useEffect(() => {
    if (!eventId) return;

    const event = getEventById(eventId);
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        type: event.type || 'other',
        start_date: event.start_date ? format(new Date(event.start_date), "yyyy-MM-dd'T'HH:mm") : '',
        end_date: event.end_date ? format(new Date(event.end_date), "yyyy-MM-dd'T'HH:mm") : '',
        location: {
          address: event.location?.address || '',
          city: event.location?.city || '',
          country: event.location?.country || '',
          venue: event.location?.venue || ''
        },
        capacity: event.capacity || '',
        visibility: event.visibility || 'private',
        allow_plus_ones: event.settings?.allow_plus_ones ?? true,
        requires_approval: event.settings?.requires_approval ?? false,
        primary_cover_image: event.primary_cover_image || ''
      });
    }
    setLoading(false);
  }, [eventId, getEventById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) return;

    setSaving(true);
    try {
      const updateData: any = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        location: formData.location,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        visibility: formData.visibility,
        primary_cover_image: formData.primary_cover_image,
        settings: {
          allow_plus_ones: formData.allow_plus_ones,
          requires_approval: formData.requires_approval
        }
      };

      // Ajouter la catégorie si elle existe
      if (formData.category) {
        updateData.category = formData.category;
      }

      await updateEvent(eventId, updateData);

      toast.success('Événement mis à jour avec succès');
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Erreur lors de la mise à jour de l\'événement');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Chargement...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/events/${eventId}`)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Modifier l'événement</h1>
              <p className="text-muted-foreground">Mettez à jour les informations de votre événement</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de l'événement *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  placeholder="Ex: Anniversaire de Marie"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez votre événement..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="type">Type d'événement *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Mariage</SelectItem>
                    <SelectItem value="birthday">Anniversaire</SelectItem>
                    <SelectItem value="corporate">Événement d'entreprise</SelectItem>
                    <SelectItem value="conference">Conférence</SelectItem>
                    <SelectItem value="party">Fête</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cover_image">Image de couverture</Label>
                {formData.primary_cover_image && (
                  <div className="mt-2 mb-4">
                    <img 
                      src={formData.primary_cover_image} 
                      alt="Couverture de l'événement" 
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={(formData as any).category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Ex: Soirée privée, Événement professionnel..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Date et heure */}
          <Card>
            <CardHeader>
              <CardTitle>Date et heure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="start_date">Date de début *</Label>
                <Input
                  id="start_date"
                  type="datetime-local"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="end_date">Date de fin</Label>
                <Input
                  id="end_date"
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange('end_date', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Localisation */}
          <Card>
            <CardHeader>
              <CardTitle>Localisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="venue">Nom du lieu</Label>
                <Input
                  id="venue"
                  value={formData.location.venue}
                  onChange={(e) => handleLocationChange('venue', e.target.value)}
                  placeholder="Ex: Hôtel Pullman"
                />
              </div>

              <div>
                <Label htmlFor="address">Adresse complète *</Label>
                <Input
                  id="address"
                  value={formData.location.address}
                  onChange={(e) => handleLocationChange('address', e.target.value)}
                  required
                  placeholder="123 Avenue de la Paix"
                />
              </div>

              <div>
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  required
                  placeholder="Kinshasa"
                />
              </div>

              <CountrySelector
                value={formData.location.country}
                onChange={(value) => handleLocationChange('country', value)}
                required
              />
            </CardContent>
          </Card>

          {/* Paramètres */}
          <Card>
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="capacity">Capacité maximale</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Ex: 100"
                />
              </div>

              <div>
                <Label htmlFor="visibility">Visibilité</Label>
                <Select value={formData.visibility} onValueChange={(value) => handleInputChange('visibility', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Privé</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="allow_plus_ones">Autoriser les accompagnants</Label>
                <Switch
                  id="allow_plus_ones"
                  checked={formData.allow_plus_ones}
                  onCheckedChange={(checked) => handleInputChange('allow_plus_ones', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="requires_approval">Nécessite une approbation</Label>
                <Switch
                  id="requires_approval"
                  checked={formData.requires_approval}
                  onCheckedChange={(checked) => handleInputChange('requires_approval', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/events/${eventId}`)}
              disabled={saving}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EventEditPage;
