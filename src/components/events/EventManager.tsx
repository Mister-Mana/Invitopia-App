import React, { useState, useMemo } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Users,
  MapPin,
  Clock,
  MoreVertical,
  Share2,
  Edit,
  Trash2,
  Eye,
  Download,
  Settings,
  Camera
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventManagerProps {
  className?: string;
}

const EventManager: React.FC<EventManagerProps> = ({ className }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { events, loading, deleteEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('upcoming');

  // Filter and organize events
  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location?.address || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    const now = new Date();
    
    return {
      upcoming: filtered.filter(event => 
        event.status === 'published' && new Date(event.start_date) >= now
      ),
      past: filtered.filter(event => 
        event.status === 'completed' || new Date(event.start_date) < now
      ),
      drafts: filtered.filter(event => event.status === 'draft'),
      all: filtered
    };
  }, [events, searchTerm, statusFilter, typeFilter]);

  const stats = {
    total: events.length,
    published: events.filter(e => e.status === 'published').length,
    drafts: events.filter(e => e.status === 'draft').length,
    thisMonth: events.filter(e => {
      const eventDate = new Date(e.start_date);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && 
             eventDate.getFullYear() === now.getFullYear();
    }).length
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return '💒';
      case 'birthday': return '🎂';
      case 'corporate': return '🏢';
      case 'conference': return '📊';
      case 'concert': return '🎵';
      case 'party': return '🎉';
      default: return '📅';
    }
  };

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${eventTitle}" ?`)) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleShare = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Découvrez cet événement: ${event.title}`,
        url: `${window.location.origin}/events/${event.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`);
    }
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{getTypeIcon(event.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {event.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(event.start_date), 'dd MMM yyyy', { locale: fr })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {format(new Date(event.start_date), 'HH:mm')}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(event.status)}>
              {t(`events.status.${event.status}`)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/events/${event.id}`} className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/events/${event.id}?tab=checkin`} className="flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Check-in
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/events/${event.id}/edit`} className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare(event)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleDelete(event.id, event.title)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {event.location?.address && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {event.location.address}
          </div>
        )}
        {event.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {event.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>0 / {event.capacity || '∞'} invités</span>
          </div>
          <Button size="sm" asChild>
            <Link to={`/events/${event.id}`}>
              Gérer
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
            <div className="text-sm text-muted-foreground">Publiés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
            <div className="text-sm text-muted-foreground">Brouillons</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.thisMonth}</div>
            <div className="text-sm text-muted-foreground">Ce mois</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des événements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
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

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Exporter
              </Button>
              <Button asChild>
                <Link to="/events/create">
                  <Plus className="h-4 w-4 mr-1" />
                  Créer
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            À venir ({filteredEvents.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Passés ({filteredEvents.past.length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Brouillons ({filteredEvents.drafts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {filteredEvents.upcoming.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {filteredEvents.upcoming.length === 0 && (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun événement à venir</h3>
                <p className="text-muted-foreground mb-4">
                  Créez votre premier événement pour commencer
                </p>
                <Button asChild>
                  <Link to="/events/create">Créer un événement</Link>
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid gap-4">
            {filteredEvents.past.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {filteredEvents.past.length === 0 && (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun événement passé</h3>
                <p className="text-muted-foreground">
                  Vos événements terminés apparaîtront ici
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="grid gap-4">
            {filteredEvents.drafts.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {filteredEvents.drafts.length === 0 && (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun brouillon</h3>
                <p className="text-muted-foreground">
                  Vos brouillons d'événements apparaîtront ici
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventManager;