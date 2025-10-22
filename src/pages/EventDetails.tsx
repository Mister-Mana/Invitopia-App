
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  ChevronLeft,
  Edit,
  Settings,
  QrCode,
  Download,
  Mail,
  Eye,
  BarChart3,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import EventProgressBar from '@/components/EventProgressBar';

const EventDetails: React.FC = () => {
  const { t } = useLanguage();
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données de l'événement
    setTimeout(() => {
      setEvent({
        id: eventId,
        title: 'Festival de Musique de Kinshasa 2024',
        description: 'Le plus grand festival de musique de la République Démocratique du Congo avec des artistes locaux et internationaux.',
        type: 'concert',
        status: 'published',
        visibility: 'public',
        start_date: '2024-07-15T18:00:00Z',
        end_date: '2024-07-16T02:00:00Z',
        location: {
          name: 'Stade des Martyrs',
          address: 'Avenue de la Libération, Kinshasa, RDC',
          coordinates: { lat: -4.3276, lng: 15.3136 }
        },
        capacity: 2000,
        registration_deadline: '2024-07-10T23:59:59Z',
        organizer_id: user?.id,
        created_at: '2024-01-15T10:00:00Z',
        images: [
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800&h=400&fit=crop'
        ],
        stats: {
          totalInvited: 1500,
          confirmed: 892,
          declined: 156,
          pending: 452,
          checkedIn: 0
        },
        tickets: {
          vip: { price: 50, sold: 45, total: 100 },
          standard: { price: 25, sold: 580, total: 1000 },
          student: { price: 15, sold: 267, total: 400 }
        }
      });
      setLoading(false);
    }, 1000);
  }, [eventId, user?.id]);

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Découvrez ${event?.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier !");
    }
  };

  const handleCanvaIntegration = () => {
    // Intégration Canva pour créer du contenu visuel
    const canvaDesignUrl = `https://www.canva.com/design/create?template=invitation&title=${encodeURIComponent(event.title)}&date=${event.start_date}&location=${encodeURIComponent(event.location.name)}`;
    window.open(canvaDesignUrl, '_blank');
    toast.success("Ouverture de Canva pour créer vos visuels d'invitation");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-invitopia-600 mx-auto"></div>
            <p className="mt-4 text-invitopia-600">Chargement des détails de l'événement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!event) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
              <h1 className="text-xl font-bold text-gray-900 mb-2">Événement non trouvé</h1>
              <p className="text-gray-600 mb-4">
                L'événement que vous recherchez n'existe pas ou vous n'avez pas les permissions pour y accéder.
              </p>
              <Button onClick={() => navigate('/events')}>
                Retour aux événements
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const eventDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="text-invitopia-600 hover:text-invitopia-800 mb-4"
          onClick={() => navigate('/events')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour aux événements
        </Button>
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-invitopia-900">{event.title}</h1>
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
            </div>
            <p className="text-invitopia-600">{event.description}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={shareEvent}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline" onClick={handleCanvaIntegration} className="bg-purple-50 text-purple-700 hover:bg-purple-100">
              <Edit className="h-4 w-4 mr-2" />
              Créer avec Canva
            </Button>
            <Button className="bg-invitopia-600 hover:bg-invitopia-700">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>

        {/* Event Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-invitopia-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-lg font-semibold">{formattedDate}</p>
                  <p className="text-sm text-gray-500">{formattedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-invitopia-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Lieu</p>
                  <p className="text-lg font-semibold">{event.location.name}</p>
                  <p className="text-sm text-gray-500">Kinshasa</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-invitopia-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Participants</p>
                  <p className="text-lg font-semibold">{event.stats.confirmed}</p>
                  <p className="text-sm text-gray-500">sur {event.stats.totalInvited} invités</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-invitopia-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Taux de réponse</p>
                  <p className="text-lg font-semibold">
                    {Math.round(((event.stats.confirmed + event.stats.declined) / event.stats.totalInvited) * 100)}%
                  </p>
                  <p className="text-sm text-gray-500">réponses reçues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progress Bar */}
      <EventProgressBar 
        eventDate={event.start_date}
        creationDate={event.created_at}
        className="mb-8"
      />

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="guests">Invités</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Image Gallery */}
          {event.images && event.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Images de l'événement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Événement ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Mail className="h-6 w-6" />
                  <span className="text-sm">Envoyer invitations</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handleCanvaIntegration}>
                  <Edit className="h-6 w-6" />
                  <span className="text-sm">Créer visuel</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <QrCode className="h-6 w-6" />
                  <span className="text-sm">Code QR</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Download className="h-6 w-6" />
                  <span className="text-sm">Exporter</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guests">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des invités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <UserCheck className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600">Confirmés</p>
                      <p className="text-2xl font-bold text-green-800">{event.stats.confirmed}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-600">Déclinés</p>
                      <p className="text-2xl font-bold text-red-800">{event.stats.declined}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-600">En attente</p>
                      <p className="text-2xl font-bold text-yellow-800">{event.stats.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600">Check-in</p>
                      <p className="text-2xl font-bold text-blue-800">{event.stats.checkedIn}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-500">Fonctionnalité de gestion des invités complète à venir...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyses et statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Tableaux de bord analytiques à venir...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation du design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={handleCanvaIntegration} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Ouvrir dans Canva
                </Button>
                <p className="text-gray-500">
                  Créez des invitations et contenus visuels personnalisés avec Canva. 
                  Vos créations seront automatiquement synchronisées avec votre événement.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de l'événement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Paramètres avancés à venir...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EventDetails;
