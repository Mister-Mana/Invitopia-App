import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useEvents } from '@/hooks/useEvents';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EventQRCode from '@/components/events/EventQRCode';
import EventShareDialog from '@/components/events/EventShareDialog';
import { SendInvitationsDialog } from '@/components/events/SendInvitationsDialog';
import { useContacts } from '@/hooks/useContacts';
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
  AlertCircle,
  MessageSquare,
  Phone,
  FileDown,
  Palette,
  Upload,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import EventProgressBar from '@/components/EventProgressBar';
import EventEditDialog from '@/components/events/EventEditDialog';

const EventManagement: React.FC = () => {
  const { t } = useLanguage();
  const { id: eventId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();
  const { contacts } = useContacts();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showInvitationsDialog, setShowInvitationsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      
      setLoading(true);
      try {
        const eventData = getEventById(eventId);
        if (eventData) {
          setEvent(eventData);
        } else {
          // Fetch from database if not in cache
          // Simulating API call for now
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
              cover_images: [
                'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800&h=400&fit=crop'
              ],
              primary_cover_image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
              stats: {
                totalInvited: 1500,
                confirmed: 892,
                declined: 156,
                pending: 452,
                checkedIn: 0
              },
              guestbook_entries: 23,
              preferences: {
                beverages: {
                  wine: 234,
                  beer: 456,
                  juice: 123,
                  water: 789
                }
              }
            });
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Erreur lors du chargement de l\'événement');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, user?.id, getEventById]);

  const handleEventUpdate = async () => {
    if (!eventId) return;
    const updatedEvent = getEventById(eventId);
    if (updatedEvent) {
      setEvent(updatedEvent);
    }
  };

  const handleSendInvitations = () => {
    if (contacts.length === 0) {
      toast.error('Aucun contact disponible pour envoyer des invitations');
      return;
    }
    setSelectedContacts(contacts.map(c => c.id));
    setShowInvitationsDialog(true);
  };

  const handleExportGuests = () => {
    // Simulate export functionality
    const csvContent = `Nom,Email,Phone,RSVP,Check-in
${event?.stats ? 
  `Invités confirmés,${event.stats.confirmed},,Confirmé,Non
Invités déclinés,${event.stats.declined},,Décliné,Non
Invités en attente,${event.stats.pending},,En attente,Non` : ''
}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invites_${event?.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Liste des invités exportée !');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressValue = () => {
    if (!event) return 0;
    const creationDate = new Date(event.created_at);
    const eventDate = new Date(event.start_date);
    const now = new Date();
    
    const totalTime = eventDate.getTime() - creationDate.getTime();
    const elapsedTime = now.getTime() - creationDate.getTime();
    
    return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement des détails de l'événement...</p>
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
              <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
              <h1 className="text-xl font-bold mb-2">Événement non trouvé</h1>
              <p className="text-muted-foreground mb-4">
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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/events')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour aux événements
        </Button>
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowShareDialog(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <EventQRCode 
              eventId={event.id} 
              eventTitle={event.title}
              eventUrl={`${window.location.origin}/public/events/${event.id}`}
            />
            <Button onClick={() => setShowEditDialog(true)}>
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
                <Calendar className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-lg font-semibold">{formattedDate}</p>
                  <p className="text-sm text-muted-foreground">{formattedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Lieu</p>
                  <p className="text-lg font-semibold">{event.location.name}</p>
                  <p className="text-sm text-muted-foreground">Kinshasa</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Participants</p>
                  <p className="text-lg font-semibold">{event.stats.confirmed}</p>
                  <p className="text-sm text-muted-foreground">sur {event.stats.totalInvited} invités</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Taux de réponse</p>
                  <p className="text-lg font-semibold">
                    {Math.round(((event.stats.confirmed + event.stats.declined) / event.stats.totalInvited) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">réponses reçues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Progression de l'événement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Temps écoulé</span>
                <span className="text-sm text-muted-foreground">{Math.round(getProgressValue())}%</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
              <EventProgressBar 
                eventDate={event.start_date}
                creationDate={event.created_at}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="guests">Invités</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="guestbook">Livre d'or</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Image Gallery */}
          {event.cover_images && event.cover_images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Images de l'événement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.cover_images.map((image: string, index: number) => (
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
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handleSendInvitations}>
                  <Mail className="h-6 w-6" />
                  <span className="text-sm">Envoyer invitations</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setShowShareDialog(true)}>
                  <Share2 className="h-6 w-6" />
                  <span className="text-sm">Partager événement</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <QrCode className="h-6 w-6" />
                  <span className="text-sm">Code QR</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handleExportGuests}>
                  <Download className="h-6 w-6" />
                  <span className="text-sm">Exporter données</span>
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
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <UserCheck className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600">Confirmés</p>
                      <p className="text-2xl font-bold text-green-800">{event.stats.confirmed}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-600">Déclinés</p>
                      <p className="text-2xl font-bold text-red-800">{event.stats.declined}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-600">En attente</p>
                      <p className="text-2xl font-bold text-yellow-800">{event.stats.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600">Check-in</p>
                      <p className="text-2xl font-bold text-blue-800">{event.stats.checkedIn}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Button onClick={handleSendInvitations}>
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer nouvelles invitations
                </Button>
                <Button variant="outline" onClick={handleExportGuests}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Exporter liste
                </Button>
              </div>
              
              <p className="text-muted-foreground">Tableau détaillé des invités disponible prochainement...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <MessageSquare className="h-5 w-5" />
                      WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Envoyez des invitations via WhatsApp Web ou connectez votre compte WhatsApp Business.
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp Web
                      </Button>
                      <Button variant="outline" className="w-full">
                        Connecter WhatsApp Business
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Mail className="h-5 w-5" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Envoyez des invitations personnalisées par email avec modèles intégrés.
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSendInvitations}>
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer par email
                      </Button>
                      <Button variant="outline" className="w-full">
                        Gérer modèles
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <Phone className="h-5 w-5" />
                      SMS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Envoyez des invitations et rappels par SMS pour un taux d'ouverture optimal.
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <Phone className="h-4 w-4 mr-2" />
                        Envoyer SMS
                      </Button>
                      <Button variant="outline" className="w-full">
                        Configurer SMS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guestbook">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Livre d'or
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">{event.guestbook_entries || 0} messages reçus</span>
                </div>
                <p className="text-sm text-blue-600">
                  Les invités peuvent laisser des messages de félicitations et des souhaits dans le livre d'or numérique.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Marie Kabila</p>
                      <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                  <p className="text-sm">Félicitations pour cet événement magnifique ! J'ai hâte d'y participer. 🎉</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      J
                    </div>
                    <div>
                      <p className="font-medium">Jean Mukendi</p>
                      <p className="text-sm text-muted-foreground">Il y a 5 heures</p>
                    </div>
                  </div>
                  <p className="text-sm">Merci pour l'invitation ! Ce festival va être incroyable. 🎵</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Voir tous les messages ({event.guestbook_entries || 0})
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences des invités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Préférences de boissons</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.preferences?.beverages && Object.entries(event.preferences.beverages).map(([drink, count]) => (
                      <div key={drink} className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{count as number}</p>
                        <p className="text-sm font-medium capitalize">{drink}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Restrictions alimentaires</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                      <p className="text-2xl font-bold text-red-600">12</p>
                      <p className="text-sm font-medium">Végétariens</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                      <p className="text-2xl font-bold text-green-600">8</p>
                      <p className="text-sm font-medium">Végétaliens</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
                      <p className="text-2xl font-bold text-orange-600">5</p>
                      <p className="text-sm font-medium">Sans gluten</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Autres préférences</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Transport : 234 personnes ont besoin de transport</p>
                    <p>• Hébergement : 89 personnes recherchent un hébergement</p>
                    <p>• Accessibilité : 12 personnes ont des besoins spéciaux</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyses et statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Taux d'ouverture des invitations</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Email</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">SMS</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">WhatsApp</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Évolution des confirmations</h3>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Graphique des confirmations dans le temps</p>
                  </div>
                </div>
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Paramètres généraux</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" onClick={() => setShowEditDialog(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier les détails
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Paramètres avancés
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Upload className="h-4 w-4 mr-2" />
                        Changer l'image
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" onClick={() => setShowShareDialog(true)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Partager l'événement
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Palette className="h-4 w-4 mr-2" />
                        Personnaliser le design
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileDown className="h-4 w-4 mr-2" />
                        Exporter les données
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <EventShareDialog 
        event={event}
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
      />

      <SendInvitationsDialog
        open={showInvitationsDialog}
        onOpenChange={setShowInvitationsDialog}
        eventId={event.id}
        eventTitle={event.title}
        selectedContacts={selectedContacts}
        contacts={contacts}
      />

      <EventEditDialog
        event={event}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onEventUpdated={handleEventUpdate}
      />
    </DashboardLayout>
  );
};

export default EventManagement;