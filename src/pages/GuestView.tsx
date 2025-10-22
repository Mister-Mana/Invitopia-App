
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Clock, Users, Share2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';
import EventProgressBar from '@/components/EventProgressBar';

// Types nécessaires
interface GuestEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  creationDate: string;
  organizer: string;
  category: string;
  tableAssignment?: string;
}

interface GuestViewProps {}

const GuestView: React.FC<GuestViewProps> = () => {
  const { t } = useLanguage();
  const { invitationId } = useParams<{ invitationId: string }>();
  const [event, setEvent] = useState<GuestEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<'attending' | 'declined' | 'pending'>('pending');

  // Sample event data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate API call to fetch event details
    setTimeout(() => {
      setEvent({
        id: '1',
        title: 'Mariage de Marie et Jean',
        date: '2024-12-15',
        time: '14:00',
        location: 'Hôtel Pullman',
        address: '15 Place de la République, Kinshasa',
        description: 'Nous sommes ravis de vous inviter à célébrer notre union.',
        imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        creationDate: '2023-09-15',
        organizer: 'Marie Kabongo',
        category: 'wedding',
        tableAssignment: 'Table Orchidée'
      });
      setLoading(false);
    }, 1000);
  }, [invitationId]);

  const handleAttendance = (status: 'attending' | 'declined') => {
    // In a real app, this would send the response to an API
    setAttendance(status);
    
    if (status === 'attending') {
      toast.success("Merci d'avoir confirmé votre présence !");
    } else {
      toast.info("Nous regrettons que vous ne puissiez pas venir, merci de nous avoir informés.");
    }
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Je t'invite à ${event?.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-invitopia-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-invitopia-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-invitopia-600">Chargement de l'invitation...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!event) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-invitopia-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-sm text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Invitation non trouvée</h1>
            <p className="text-invitopia-600 mb-6">
              L'invitation que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Format the date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        {/* Cover Image */}
        {event.imageUrl && (
          <div className="h-48 md:h-64 lg:h-80 w-full relative">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-invitopia-900/70 to-transparent"></div>
          </div>
        )}

        <div className="container mx-auto px-6 py-8">
          <div className={`bg-white rounded-xl shadow-sm ${event.imageUrl ? '-mt-16 relative z-10' : ''}`}>
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-invitopia-900">{event.title}</h1>
              
              <div className="mt-6 space-y-4 text-invitopia-600">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 mt-0.5 text-invitopia-500" />
                  <div>
                    <p className="font-medium text-invitopia-800">{formattedDate}</p>
                    {event.time && <p>{event.time}</p>}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-invitopia-500" />
                  <div>
                    <p className="font-medium text-invitopia-800">{event.location}</p>
                    {event.address && <p>{event.address}</p>}
                  </div>
                </div>
                
                {event.tableAssignment && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 mt-0.5 text-invitopia-500" />
                    <div>
                      <p className="font-medium text-invitopia-800">Placement</p>
                      <p>{event.tableAssignment}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <EventProgressBar 
                eventDate={event.date} 
                creationDate={event.creationDate}
                className="mt-6" 
              />
              
              {attendance === 'pending' && (
                <div className="mt-8 space-y-4">
                  <p className="text-center text-invitopia-800 font-medium">
                    Participerez-vous à cet événement ?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Button 
                      onClick={() => handleAttendance('attending')}
                      className="bg-invitopia-700 hover:bg-invitopia-600 flex-1 sm:flex-grow-0 sm:min-w-32"
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Je participe
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleAttendance('declined')}
                      className="border-invitopia-200 hover:border-invitopia-300 text-invitopia-700 flex-1 sm:flex-grow-0 sm:min-w-32"
                    >
                      Je ne participe pas
                    </Button>
                  </div>
                </div>
              )}
              
              {attendance === 'attending' && (
                <Alert className="mt-8 bg-green-50 border-green-200 text-green-800">
                  <AlertDescription>
                    Vous avez confirmé votre participation. Nous vous remercions et avons hâte de vous voir !
                  </AlertDescription>
                </Alert>
              )}
              
              {attendance === 'declined' && (
                <Alert className="mt-8 bg-invitopia-50 border-invitopia-200">
                  <AlertDescription>
                    Vous avez décliné cette invitation. Si vous changez d'avis, vous pouvez toujours revenir sur cette page.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="border-t border-invitopia-100 p-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="map">Carte</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  {event.description ? (
                    <div className="prose max-w-none">
                      <p>{event.description}</p>
                    </div>
                  ) : (
                    <p className="text-invitopia-500">Aucun détail supplémentaire n'est disponible.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="map">
                  <div className="h-64 bg-invitopia-100 rounded-md flex items-center justify-center">
                    <p className="text-invitopia-500">Carte interactive non disponible.</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 flex justify-center">
                <Button variant="ghost" className="text-invitopia-600" onClick={shareEvent}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager cette invitation
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-invitopia-500 text-sm">
            <p>Événement organisé par {event.organizer}</p>
            <p className="mt-1">
              <a href="/" className="text-invitopia-600 hover:text-invitopia-800 hover:underline">
                Propulsé par Invitopia
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GuestView;
