
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useVenues } from '@/hooks/useVenues';
import { MapPin, Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import VenueImageManagement from './VenueImageManagement';

const VenueManagement: React.FC = () => {
  const { venues, loading, error, createVenue, updateVenue, deleteVenue } = useVenues();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 0,
    price: 0,
    description: '',
    amenities: [] as string[],
    cover_image: '',
    gallery_images: [] as string[]
  });

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVenue) {
        await updateVenue(editingVenue.id, formData);
        toast.success('Lieu mis à jour');
      } else {
        await createVenue(formData);
        toast.success('Lieu créé');
      }
      resetForm();
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      location: '', 
      capacity: 0, 
      price: 0, 
      description: '', 
      amenities: [],
      cover_image: '',
      gallery_images: []
    });
    setEditingVenue(null);
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (venue: any) => {
    setFormData({
      name: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      price: venue.price,
      description: venue.description || '',
      amenities: venue.amenities || [],
      cover_image: venue.cover_image || '',
      gallery_images: venue.gallery_images || []
    });
    setEditingVenue(venue);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) {
      try {
        await deleteVenue(id);
        toast.success('Lieu supprimé');
      } catch (error: any) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Gestion des lieux et salles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un lieu..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau lieu
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVenue ? 'Modifier le lieu' : 'Nouveau lieu'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Localisation *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacité</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Prix (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <VenueImageManagement
                    coverImage={formData.cover_image}
                    galleryImages={formData.gallery_images}
                    onCoverImageChange={(url) => setFormData(prev => ({ ...prev, cover_image: url || '' }))}
                    onGalleryImagesChange={(urls) => setFormData(prev => ({ ...prev, gallery_images: urls }))}
                  />

                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingVenue ? 'Mettre à jour' : 'Créer'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredVenues.map((venue) => (
              <div key={venue.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{venue.name}</h3>
                      {venue.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{venue.rating}</span>
                        </div>
                      )}
                      <Badge variant={venue.status === 'active' ? 'default' : 'secondary'}>
                        {venue.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{venue.location}</p>
                    {venue.description && (
                      <p className="text-sm text-gray-500 mb-2">{venue.description}</p>
                    )}
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Capacité: {venue.capacity}</span>
                      <span>Prix: {venue.price}€</span>
                    </div>
                    {venue.amenities && venue.amenities.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {venue.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(venue)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(venue.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredVenues.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun lieu trouvé
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueManagement;
