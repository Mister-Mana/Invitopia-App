
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/EventCard';
import { usePublicEvents } from '@/hooks/usePublicEvents';
import { EVENT_CATEGORIES } from '@/types/events';

type EventCategory = 'all' | 'wedding' | 'corporate' | 'birthday' | 'social' | 'fundraiser' | 'conference' | 'party' | 'other';

const RecentEventsSection: React.FC = () => {
  const { t } = useLanguage();
  const { events, loading } = usePublicEvents();
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');

  // Filter events based on active category
  const filteredEvents = events
    .filter(event => activeCategory === 'all' || event.category === activeCategory)
    .slice(0, 6); // Limit to 6 events

  if (loading) {
    return (
      <section className="py-16 bg-invitopia-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-100 text-invitopia-700 mb-4 inline-block">
              {t('home.recentEvents.label')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-invitopia-900 mb-6">
              {t('home.recentEvents.title')}
            </h2>
            <p className="text-invitopia-600 max-w-2xl mx-auto">
              {t('home.recentEvents.subtitle')}
            </p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-invitopia-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-100 text-invitopia-700 mb-4 inline-block">
            {t('home.recentEvents.label')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-invitopia-900 mb-6">
            {t('home.recentEvents.title')}
          </h2>
          <p className="text-invitopia-600 max-w-2xl mx-auto">
            {t('home.recentEvents.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['all', ...Object.keys(EVENT_CATEGORIES)] as EventCategory[]).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              className={
                activeCategory === category
                  ? 'bg-invitopia-700 hover:bg-invitopia-600'
                  : 'border-invitopia-200'
              }
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' 
                ? 'Tous' 
                : EVENT_CATEGORIES[category]?.name || category
              }
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                id={event.id}
                title={event.title}
                date={event.date}
                location={typeof event.location === 'string' 
                  ? event.location 
                  : event.location?.address || 'Lieu à confirmer'
                }
                imageUrl={event.imageUrl}
                attendees={event.attendees}
                totalInvited={event.totalInvited}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg border border-invitopia-100">
            <p className="text-invitopia-600">
              {activeCategory === 'all' 
                ? 'Aucun événement public disponible pour le moment.'
                : `Aucun événement de type "${EVENT_CATEGORIES[activeCategory]?.name || activeCategory}" disponible.`
              }
            </p>
          </div>
        )}

        {/* View All Button */}
        {events.length > 6 && (
          <div className="text-center mt-10">
            <Button 
              className="bg-invitopia-700 hover:bg-invitopia-600"
              size="lg"
              onClick={() => setActiveCategory('all')}
            >
              Voir tous les événements
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentEventsSection;
