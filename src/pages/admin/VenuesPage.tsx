
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useVenues } from '@/hooks/useVenues';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter,
  Building2,
  Users,
  Star,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const VenuesPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const { venues, loading, error, createVenue, updateVenue, deleteVenue } = useVenues();

  const hasAccess = user?.role === 'admin' || user?.role === 'super_admin';

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Accès non autorisé</h3>
              <p className="text-gray-500">Vous n'avez pas l'autorisation d'accéder à cette section.</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-invitopia-800 mb-2 flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              {t('admin.venues')}
            </h1>
            <p className="text-invitopia-600">
              {t('admin.venuesDescription')}
            </p>
          </div>
          
          <Button className="bg-invitopia-600 hover:bg-invitopia-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('admin.addVenue')}
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-invitopia-400" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom ou localisation..."
                  className="pl-9 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-invitopia-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <p>Erreur lors du chargement des lieux : {error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Venues Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVenues.map((venue) => (
          <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {venue.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-[16/10] relative">
                        <img
                          src={image}
                          alt={`${venue.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="secondary" className="bg-white/90">
                  <Star className="h-3 w-3 mr-1 text-yellow-500" />
                  {venue.rating}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{venue.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {venue.location}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4">{venue.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {venue.capacity} personnes
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    À partir de {venue.price} FC
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {venue.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{venue.amenities.length - 3} autres
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      Voir les détails
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{venue.name}</DialogTitle>
                      <DialogDescription>{venue.location}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {venue.images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="aspect-video relative">
                                <img
                                  src={image}
                                  alt={`${venue.name} - Image ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-gray-600">{venue.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Équipements</h4>
                        <div className="flex flex-wrap gap-2">
                          {venue.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Capacité</h4>
                          <p className="text-gray-600">{venue.capacity} personnes</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Prix de base</h4>
                          <p className="text-gray-600">À partir de {venue.price} FC</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button className="bg-invitopia-600 hover:bg-invitopia-700">
                  Réserver
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {filteredVenues.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lieu trouvé</h3>
          <p className="text-gray-500 mb-6">
            Aucun lieu ne correspond à votre recherche.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default VenuesPage;
