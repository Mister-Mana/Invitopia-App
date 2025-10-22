import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useEvents } from '@/hooks/useEvents';
import { useGuests } from '@/hooks/useGuests';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  ChevronLeft,
  Edit,
  QrCode,
  Download,
  Mail,
  Eye,
  BarChart3,
  UserCheck,
  AlertCircle,
  MessageSquare,
  Send,
  ExternalLink,
  Settings,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import EventProgressBar from '@/components/EventProgressBar';
import { EventCheckIn } from '@/components/events/EventCheckIn';
import EventStatisticsRealtime from '@/components/events/EventStatisticsRealtime';
import CalendarExport from '@/components/events/CalendarExport';
import QRCode from 'qrcode';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const EventDetailsPage: React.FC = () => {
  const { t } = useLanguage();
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { events, getEventById, updateEvent, deleteEvent } = useEvents();
  const { getEventGuests } = useGuests();
  
  const [event, setEvent] = useState<any>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  // Get tab from URL params
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    if (!eventId) return;

    // Get event from events state
    const foundEvent = getEventById(eventId);
    if (foundEvent) {
      setEvent(foundEvent);
      setEditForm(foundEvent);
      
      // Generate QR code for public event page
      const eventUrl = `${window.location.origin}/public/events/${eventId}`;
      QRCode.toDataURL(eventUrl, { width: 256 })
        .then(setQrCodeUrl)
        .catch(console.error);
    }

    // Fetch guests for this event
    const fetchGuests = async () => {
      try {
        const eventGuests = await getEventGuests(eventId);
        setGuests(eventGuests || []);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
    setLoading(false);
  }, [eventId, events, getEventById, getEventGuests]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement de l'événement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!event) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
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
  const formattedDate = format(eventDate, 'EEEE dd MMMM yyyy', { locale: fr });
  const formattedTime = format(eventDate, 'HH:mm');

  const stats = {
    confirmed: guests.filter(g => g.rsvp_status === 'confirmed').length,
    declined: guests.filter(g => g.rsvp_status === 'declined').length,
    pending: guests.filter(g => g.rsvp_status === 'pending').length,
    checkedIn: guests.filter(g => g.checked_in).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const shareEvent = () => {
    const eventUrl = `${window.location.origin}/public/events/${event.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Découvrez ${event.title}`,
        url: eventUrl,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(eventUrl);
      toast.success("Lien d'invitation copié dans le presse-papier !");
    }
  };

  const handleSaveEvent = async () => {
    try {
      await updateEvent(event.id, editForm);
      setEvent({ ...event, ...editForm });
      setIsEditingEvent(false);
      toast.success('Événement mis à jour avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour: ' + error.message);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${event.title}" ?`)) {
      try {
        await deleteEvent(event.id);
        toast.success('Événement supprimé');
        navigate('/events');
      } catch (error: any) {
        toast.error('Erreur lors de la suppression: ' + error.message);
      }
    }
  };

  const sendWhatsAppInvitations = () => {
    const eventUrl = `${window.location.origin}/public/events/${event.id}`;
    const message = `🎉 Vous êtes invité(e) à ${event.title}!\n\n📅 ${formattedDate} à ${formattedTime}\n📍 ${event.location?.address || 'Lieu à confirmer'}\n\nVoir l'événement: ${eventUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/events')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux événements
          </Button>
          
          <div className="flex gap-2">
            <CalendarExport event={event} />
            <Button variant="outline" onClick={shareEvent}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Dialog open={isEditingEvent} onOpenChange={setIsEditingEvent}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Modifier l'événement</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={editForm.type} onValueChange={(value) => setEditForm({...editForm, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Mariage</SelectItem>
                          <SelectItem value="birthday">Anniversaire</SelectItem>
                          <SelectItem value="corporate">Entreprise</SelectItem>
                          <SelectItem value="conference">Conférence</SelectItem>
                          <SelectItem value="concert">Concert</SelectItem>
                          <SelectItem value="party">Fête</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Date de début</Label>
                      <Input
                        id="start_date"
                        type="datetime-local"
                        value={editForm.start_date ? new Date(editForm.start_date).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setEditForm({...editForm, start_date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacité</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={editForm.capacity || ''}
                        onChange={(e) => setEditForm({...editForm, capacity: parseInt(e.target.value) || undefined})}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="visibility"
                      checked={editForm.visibility === 'public'}
                      onCheckedChange={(checked) => setEditForm({...editForm, visibility: checked ? 'public' : 'private'})}
                    />
                    <Label htmlFor="visibility">Événement public</Label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingEvent(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSaveEvent}>
                      Sauvegarder
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="text-destructive" onClick={handleDeleteEvent}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>

        {/* Event Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </div>
          {event.description && (
            <p className="text-muted-foreground text-lg">{event.description}</p>
          )}
        </div>

        {/* Cover Image */}
        {event.primary_cover_image && (
          <Card>
            <CardContent className="p-0">
              <img 
                src={event.primary_cover_image} 
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Event Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <p className="text-lg font-semibold">{event.location?.address || 'À définir'}</p>
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
                  <p className="text-lg font-semibold">{stats.confirmed}</p>
                  <p className="text-sm text-muted-foreground">sur {guests.length} invités</p>
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
                    {guests.length > 0 ? Math.round(((stats.confirmed + stats.declined) / guests.length) * 100) : 0}%
                  </p>
                  <p className="text-sm text-muted-foreground">réponses reçues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <EventProgressBar 
          eventDate={event.start_date}
          creationDate={event.created_at}
        />

        {/* Tabs Content */}
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="guests">Invités ({guests.length})</TabsTrigger>
            <TabsTrigger value="checkin">Check-in</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={sendWhatsAppInvitations}>
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-sm">WhatsApp</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm">Email</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <QrCode className="h-6 w-6" />
                        <span className="text-sm">Code QR</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Code QR de l'événement</DialogTitle>
                      </DialogHeader>
                      <div className="text-center">
                        {qrCodeUrl && (
                          <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
                        )}
                        <p className="text-sm text-muted-foreground">
                          Scannez ce code pour accéder directement à la page RSVP
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.download = `qr-code-${event.title}.png`;
                            link.href = qrCodeUrl;
                            link.click();
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Exporter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event URL */}
            <Card>
              <CardHeader>
                <CardTitle>Lien d'invitation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input 
                    value={`${window.location.origin}/public/events/${event.id}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={shareEvent}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/public/events/${event.id}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
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
                        <p className="text-2xl font-bold text-green-800">{stats.confirmed}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-600">Déclinés</p>
                        <p className="text-2xl font-bold text-red-800">{stats.declined}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-8 w-8 text-yellow-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-600">En attente</p>
                        <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Eye className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-600">Check-in</p>
                        <p className="text-2xl font-bold text-blue-800">{stats.checkedIn}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guests List */}
                <div className="space-y-2">
                  {guests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <p className="text-sm text-muted-foreground">{guest.email}</p>
                      </div>
                      <Badge className={
                        guest.rsvp_status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        guest.rsvp_status === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {guest.rsvp_status === 'confirmed' ? 'Confirmé' :
                         guest.rsvp_status === 'declined' ? 'Décliné' : 'En attente'}
                      </Badge>
                    </div>
                  ))}
                  {guests.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun invité ajouté pour le moment
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="checkin">
            <EventCheckIn eventId={eventId!} />
          </TabsContent>

          <TabsContent value="invitations">
            <Card>
              <CardHeader>
                <CardTitle>Envoi d'invitations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={sendWhatsAppInvitations} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Envoyer via WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer par Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer par SMS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <EventStatisticsRealtime eventId={eventId!} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EventDetailsPage;