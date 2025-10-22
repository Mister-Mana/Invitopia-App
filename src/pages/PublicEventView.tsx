import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';
import { useGuests } from '@/hooks/useGuests';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowLeft, 
  Share2,
  Heart,
  MessageCircle
} from 'lucide-react';
import { formatDate } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const PublicEventView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { getPublicEventById } = useEvents();
  const { guests } = useGuests(eventId || '');
  
  const [event, setEvent] = React.useState<any>(null);
  const [organizer, setOrganizer] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadEvent = async () => {
      if (eventId) {
        const eventData = await getPublicEventById(eventId);
        setEvent(eventData);
        
        // Fetch organizer info
        if (eventData?.organizer_id) {
          const { data: organizerData } = await supabase
            .from('profiles')
            .select('name, avatar, organization')
            .eq('id', eventData.organizer_id)
            .single();
          
          if (organizerData) {
            setOrganizer(organizerData);
          }
        }
      }
      setLoading(false);
    };
    loadEvent();
  }, [eventId, getPublicEventById]);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              Cet événement n'existe pas ou n'est plus disponible publiquement.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (event.visibility !== 'public') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Événement privé</h1>
            <p className="text-muted-foreground mb-6">
              Cet événement est privé et nécessite une invitation pour y accéder.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const confirmedGuests = guests.filter(guest => guest.rsvp_status === 'confirmed').length;
  const totalCapacity = event.capacity || 100;

  const formatEventDate = (dateString: string) => {
    return formatDate(new Date(dateString), 'EEEE d MMMM yyyy à HH:mm', { locale: fr });
  };

  const getEventTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      wedding: 'Mariage',
      birthday: 'Anniversaire', 
      corporate: 'Entreprise',
      conference: 'Conférence',
      party: 'Fête',
      other: 'Autre'
    };
    return types[type] || type;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          {event.primary_cover_image ? (
            <img 
              src={event.primary_cover_image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {getEventTypeLabel(event.type)}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.title}</h1>
              <div className="flex items-center justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatEventDate(event.start_date)}
                </div>
                {event.location?.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {event.location.address}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {event.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>À propos de cet événement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Détails de l'événement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date et heure</p>
                      <p className="text-muted-foreground">{formatEventDate(event.start_date)}</p>
                      {event.end_date && (
                        <p className="text-sm text-muted-foreground">
                          Fin: {formatEventDate(event.end_date)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {event.location?.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Lieu</p>
                        <p className="text-muted-foreground">{event.location.address}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Invités</p>
                      <p className="text-muted-foreground">
                        {confirmedGuests} confirmés / {totalCapacity} places
                      </p>
                    </div>
                  </div>

                  {event.registration_deadline && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Date limite d'inscription</p>
                        <p className="text-muted-foreground">
                          {formatEventDate(event.registration_deadline)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* RSVP Card */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">Participer à l'événement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {confirmedGuests}/{totalCapacity}
                    </div>
                    <p className="text-sm text-muted-foreground">participants confirmés</p>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(confirmedGuests / totalCapacity) * 100}%` }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <Heart className="h-4 w-4 mr-2" />
                      Je participe
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Organisé par</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={organizer?.avatar || ''} />
                      <AvatarFallback>{organizer?.name?.[0] || 'O'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{organizer?.name || 'Organisateur'}</p>
                      {organizer?.organization && (
                        <p className="text-sm text-muted-foreground">{organizer.organization}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments/Questions */}
              <Card>
                <CardHeader>
                  <CardTitle>Questions et commentaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Poser une question
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PublicEventView;