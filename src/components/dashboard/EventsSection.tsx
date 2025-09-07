
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import EventCard from '@/components/EventCard';
import { Event } from '@/hooks/useEvents';

interface EventsSectionProps {
  title: string;
  events: Event[];
  layout?: 'grid' | 'list';
}

const EventsSection: React.FC<EventsSectionProps> = ({
  title,
  events,
  layout = 'list'
}) => {
  const { t } = useLanguage();
  
  if (events.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-invitopia-800 mb-4">{title}</h2>
        <div className="bg-white rounded-xl border border-invitopia-100 p-8 text-center">
          <p className="text-invitopia-600">
            {t('dashboard.noEvents')}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-invitopia-800 mb-4">{title}</h2>
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              id={event.id}
              title={event.title}
              date={event.start_date}
              location={event.location?.address || 'Lieu à définir'}
              imageUrl={event.primary_cover_image}
              attendees={0}
              totalInvited={event.capacity || 0}
              viewPath={`/events/${event.id}`}
              creationDate={event.created_at}
            />
          ))}
        </div>
      ) : (
        <>
          {events.map(event => (
            <EventCard 
              key={event.id} 
              id={event.id}
              title={event.title}
              date={event.start_date}
              location={event.location?.address || 'Lieu à définir'}
              imageUrl={event.primary_cover_image}
              attendees={0}
              totalInvited={event.capacity || 0}
              viewPath={`/events/${event.id}`}
              creationDate={event.created_at}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default EventsSection;
