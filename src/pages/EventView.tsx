
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import EventLoader from '@/components/events/EventLoader';
import EventNotFound from '@/components/events/EventNotFound';
import EventDetails from '@/components/events/EventDetails';
import { usePublicEvents, PublicEvent } from '@/hooks/usePublicEvents';

const EventView: React.FC = () => {
  const { t } = useLanguage();
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById } = usePublicEvents();
  const [event, setEvent] = useState<PublicEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await getEventById(eventId);
        
        if (eventData) {
          setEvent(eventData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, getEventById]);

  if (loading) {
    return (
      <PageTransition>
        <Navbar />
        <EventLoader />
      </PageTransition>
    );
  }

  if (notFound || !event) {
    return (
      <PageTransition>
        <Navbar />
        <EventNotFound />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        <Navbar />
        
        <EventDetails event={event} />

        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            className="text-invitopia-600 hover:text-invitopia-800 mb-4"
            asChild
          >
            <Link to="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('common.back')}
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default EventView;
