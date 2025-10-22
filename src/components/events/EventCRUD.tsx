import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Eye, Calendar, MapPin, Users } from 'lucide-react';
import { useEvents, Event } from '@/hooks/useEvents';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import WhatsAppIntegration from '@/components/WhatsAppIntegration';
import EventQRCode from './EventQRCode';
import EventEditDialog from './EventEditDialog';
// import SendInvitationsDialog from './SendInvitationsDialog';
import { useContacts } from '@/hooks/useContacts';

interface EventCRUDProps {
  event: Event;
  onEventUpdated?: () => void;
}

const EventCRUD: React.FC<EventCRUDProps> = ({ event, onEventUpdated }) => {
  const { updateEvent, deleteEvent } = useEvents();
  const { contacts } = useContacts();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description || '',
    type: event.type,
    start_date: event.start_date,
    end_date: event.end_date || '',
    location: event.location || {},
    status: event.status,
    visibility: event.visibility,
    capacity: event.capacity || 0
  });

  const handleEdit = async () => {
    try {
      await updateEvent(event.id, formData);
      setIsEditOpen(false);
      toast.success('Événement mis à jour !');
      onEventUpdated?.();
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(event.id);
      toast.success('Événement supprimé !');
      onEventUpdated?.();
    } catch (error: any) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewEvent = () => {
    navigate(`/events/${event.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusText = (status: string) => {
    const texts = {
      draft: 'Brouillon',
      published: 'Publié',
      cancelled: 'Annulé',
      completed: 'Terminé'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(event.start_date)}
              </div>
              {event.location?.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location.address}
                </div>
              )}
              {event.capacity && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.capacity} places
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
              {getStatusText(event.status)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {event.description && (
          <p className="text-gray-600 mb-4">{event.description}</p>
        )}
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewEvent}
            className="gap-2"
            asChild
          >
            <Link to={`/events/${event.id}`}>
              <Eye className="h-4 w-4" />
              Voir
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditOpen(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </Button>

          <EventQRCode
            eventId={event.id}
            eventTitle={event.title}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInviteOpen(true)}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Inviter
          </Button>

          <WhatsAppIntegration
            eventTitle={event.title}
            eventDescription={event.description}
            eventDate={formatDate(event.start_date)}
            eventLocation={event.location?.address}
            eventUrl={`${window.location.origin}/events/${event.id}`}
          />

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>

        {/* Edit Dialog - Simple form for now */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier l'événement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Titre"
              />
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description"
              />
              <div className="flex gap-2">
                <Button onClick={handleEdit}>Sauvegarder</Button>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Annuler</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EventCRUD;