import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMasterOfCeremonies } from '@/hooks/useMasterOfCeremonies';
import PageTransition from '@/components/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Search,
  Filter,
  Calendar,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import MCCarousel from '@/components/mc/MCCarousel';

const MCPage: React.FC = () => {
  const { t } = useLanguage();
  const { mcs, loading, error } = useMasterOfCeremonies();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMCs, setFilteredMCs] = useState(mcs);

  useEffect(() => {
    if (searchTerm) {
      const filtered = mcs.filter(mc => 
        mc.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mc.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mc.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mc.specialties?.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredMCs(filtered);
    } else {
      setFilteredMCs(mcs);
    }
  }, [searchTerm, mcs]);

  if (error) {
    toast.error('Erreur lors du chargement des maîtres de cérémonie');
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Maîtres de Cérémonie
              </h1>
            </div>
            <p className="text-muted-foreground">
              Trouvez le maître de cérémonie parfait pour votre événement
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Rechercher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher par nom, spécialité, localisation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured MCs Carousel */}
          {!loading && mcs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                MCs Recommandés
              </h2>
              <MCCarousel />
            </div>
          )}

          {/* All MCs Grid */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Tous les Maîtres de Cérémonie
              <span className="text-muted-foreground text-lg ml-2">
                ({filteredMCs.length} résultats)
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMCs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMCs.map((mc) => (
                <Card key={mc.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {mc.cover_image ? (
                      <img
                        src={mc.cover_image}
                        alt={mc.business_name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Award className="h-16 w-16 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant={mc.is_verified ? 'default' : 'secondary'}>
                        {mc.is_verified ? 'Vérifié' : 'Non vérifié'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {mc.business_name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mc.rating}/5</span>
                        <span>({mc.total_reviews} avis)</span>
                      </div>
                    </div>

                    {mc.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{mc.location}</span>
                      </div>
                    )}

                    {mc.experience_years && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>{mc.experience_years} ans d'expérience</span>
                      </div>
                    )}

                    {mc.bio && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {mc.bio}
                      </p>
                    )}

                    {mc.specialties && mc.specialties.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {mc.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {mc.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{mc.specialties.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link to={`/mc/${mc.id}`}>
                          Voir le profil
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucun maître de cérémonie trouvé
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Essayez de modifier vos critères de recherche'
                    : 'Aucun maître de cérémonie n\'est disponible pour le moment'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default MCPage;