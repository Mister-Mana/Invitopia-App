import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, ArrowRight, Plus } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useLanguage } from '@/contexts/LanguageContext';
import { format, isToday, isFuture, isPast } from 'date-fns';
import { fr } from 'date-fns/locale';

const EventPreviewSection: React.FC = () => {
  const { t } = useLanguage();
  const { events, loading } = useEvents();

  const categorizedEvents = useMemo(() => {
    const now = new Date();
    
    const categorized = {
      upcoming: events.filter(event => 
        event.status === 'published' && isFuture(new Date(event.start_date))
      ).slice(0, 3),
      today: events.filter(event => 
        event.status === 'published' && isToday(new Date(event.start_date))
      ),
      past: events.filter(event => 
        event.status === 'completed' || isPast(new Date(event.start_date))
      ).slice(0, 2),
    };

    return categorized;
  }, [events]);

  const EventCard = ({ event, category }: { event: any, category: 'upcoming' | 'today' | 'past' }) => {
    const eventDate = new Date(event.start_date);
    const isCurrentEvent = category === 'today';
    
    return (
      <Card className={`hover:shadow-md transition-shadow ${isCurrentEvent ? 'border-primary bg-primary/5' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                {format(eventDate, 'dd MMM', { locale: fr })}
                <Clock className="h-3 w-3 ml-3 mr-1" />
                {format(eventDate, 'HH:mm')}
              </div>
            </div>
            <Badge 
              variant={isCurrentEvent ? 'default' : category === 'past' ? 'secondary' : 'outline'}
              className="ml-2"
            >
              {category === 'today' ? 'Aujourd\'hui' : 
               category === 'past' ? 'Passé' : 'À venir'}
            </Badge>
          </div>
          
          {event.location?.address && (
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{event.location.address}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Users className="h-3 w-3 mr-1" />
              <span>0 / {event.capacity || '∞'} invités</span>
            </div>
            <Link to={`/events/${event.id}`}>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Today's Events */}
      {categorizedEvents.today.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Événements d'aujourd'hui</h3>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="gap-2">
                Voir tout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {categorizedEvents.today.map(event => (
              <EventCard key={event.id} event={event} category="today" />
            ))}
          </div>
        </div>
      )}

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Événements à venir</CardTitle>
              <Link to="/events">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {categorizedEvents.upcoming.length > 0 ? (
              categorizedEvents.upcoming.map(event => (
                <EventCard key={event.id} event={event} category="upcoming" />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-3">Aucun événement prévu</p>
                <Link to="/events/create">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Créer un événement
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Statistics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total événements</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Publiés</span>
                <span className="font-semibold text-green-600">
                  {events.filter(e => e.status === 'published').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Brouillons</span>
                <span className="font-semibold text-yellow-600">
                  {events.filter(e => e.status === 'draft').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ce mois</span>
                <span className="font-semibold text-blue-600">
                  {events.filter(e => {
                    const eventDate = new Date(e.start_date);
                    const now = new Date();
                    return eventDate.getMonth() === now.getMonth() && 
                           eventDate.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Past Events */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Événements récents</CardTitle>
              <Link to="/events">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {categorizedEvents.past.length > 0 ? (
              categorizedEvents.past.map(event => (
                <EventCard key={event.id} event={event} category="past" />
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Aucun événement récent</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Actions rapides</h3>
              <p className="text-sm text-gray-600">Gérez vos événements efficacement</p>
            </div>
            <div className="flex gap-2">
              <Link to="/events/create">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvel événement
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Tous les événements
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPreviewSection;