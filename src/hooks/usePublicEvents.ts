
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PublicEvent {
  id: string;
  title: string;
  description?: string;
  type: string;
  location?: any;
  start_date: string;
  end_date?: string;
  organizer_id: string;
  status: string;
  visibility: string;
  capacity?: number;
  registration_deadline?: string;
  custom_fields?: any;
  settings?: any;
  design?: any;
  cover_images?: string[];
  primary_cover_image?: string;
  created_at: string;
  updated_at: string;
  // Computed fields for compatibility
  date: string;
  attendees: number;
  totalInvited: number;
  imageUrl?: string;
  category: string;
  isPublic: boolean;
  creationDate: string;
  organizer?: string;
  // New fields from the view
  attendees_count?: number;
  total_capacity?: number;
}

export const usePublicEvents = () => {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('public_events_view')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match the PublicEvent interface
      const transformedEvents: PublicEvent[] = (data || []).map(event => {
        const design = event.design as any;
        const settings = event.settings as any;
        
        // Get the best available image
        let imageUrl = event.primary_cover_image;
        if (!imageUrl && event.cover_images && event.cover_images.length > 0) {
          imageUrl = event.cover_images[0];
        }
        if (!imageUrl) {
          imageUrl = design?.coverImage || settings?.imageUrl;
        }
        
        return {
          ...event,
          date: event.start_date,
          attendees: event.attendees_count || 0,
          totalInvited: event.total_capacity || event.capacity || 0,
          imageUrl,
          category: event.type,
          isPublic: event.visibility === 'public',
          creationDate: event.created_at
        };
      });

      setEvents(transformedEvents);
    } catch (err: any) {
      console.error('Error fetching public events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getEventById = async (eventId: string): Promise<PublicEvent | null> => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          profiles!events_organizer_id_fkey(name)
        `)
        .eq('id', eventId)
        .eq('visibility', 'public')
        .single();

      if (error) throw error;
      if (!data) return null;

      // Get guest count separately
      const { count: guestCount } = await supabase
        .from('guests')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId)
        .eq('rsvp_status', 'confirmed');

      const design = data.design as any;
      const settings = data.settings as any;
      const profiles = data.profiles as any;

      // Get the best available image
      let imageUrl = data.primary_cover_image;
      if (!imageUrl && data.cover_images && data.cover_images.length > 0) {
        imageUrl = data.cover_images[0];
      }
      if (!imageUrl) {
        imageUrl = design?.coverImage || settings?.imageUrl;
      }

      return {
        ...data,
        date: data.start_date,
        attendees: guestCount || 0,
        totalInvited: data.capacity || 0,
        imageUrl,
        category: data.type,
        isPublic: data.visibility === 'public',
        creationDate: data.created_at,
        organizer: profiles?.name || 'Organisateur inconnu',
        attendees_count: guestCount || 0,
        total_capacity: data.capacity || 0
      };
    } catch (err: any) {
      console.error('Error fetching event by ID:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPublicEvents();
  }, []);

  return {
    events,
    loading,
    error,
    refetch: fetchPublicEvents,
    getEventById
  };
};
