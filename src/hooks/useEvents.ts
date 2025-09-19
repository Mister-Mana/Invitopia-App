
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];
type EventRow = Database['public']['Tables']['events']['Row'];

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: Database['public']['Enums']['event_type'];
  location?: any;
  start_date: string;
  end_date?: string;
  organizer_id: string;
  status: Database['public']['Enums']['event_status'];
  visibility: Database['public']['Enums']['event_visibility'];
  capacity?: number;
  registration_deadline?: string;
  custom_fields?: any;
  settings?: any;
  design?: any;
  cover_images?: string[];
  primary_cover_image?: string;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEvents(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<Event>) => {
    if (!user) throw new Error('User not authenticated');

    if (!eventData.title || !eventData.start_date) {
      throw new Error('Title and start date are required');
    }

    const insertData: EventInsert = {
      title: eventData.title,
      start_date: eventData.start_date,
      organizer_id: user.id,
      description: eventData.description,
      type: eventData.type || 'other',
      location: eventData.location,
      end_date: eventData.end_date,
      status: eventData.status || 'draft',
      visibility: eventData.visibility || 'private',
      capacity: eventData.capacity,
      registration_deadline: eventData.registration_deadline,
      custom_fields: eventData.custom_fields,
      settings: eventData.settings,
      design: eventData.design,
      cover_images: eventData.cover_images || [],
      primary_cover_image: eventData.primary_cover_image
    };

    const { data, error } = await supabase
      .from('events')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    try {
      await supabase.rpc('log_activity', {
        p_action_type: 'created',
        p_resource_type: 'event',
        p_resource_id: data.id,
        p_description: `Événement "${data.title}" créé`,
        p_metadata: { title: data.title, type: data.type }
      });
    } catch (logError) {
      console.warn('Failed to log activity:', logError);
    }

    setEvents(prev => [data, ...prev]);
    return data;
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    const updateData: EventUpdate = {
      title: eventData.title,
      description: eventData.description,
      type: eventData.type,
      location: eventData.location,
      start_date: eventData.start_date,
      end_date: eventData.end_date,
      status: eventData.status,
      visibility: eventData.visibility,
      capacity: eventData.capacity,
      registration_deadline: eventData.registration_deadline,
      custom_fields: eventData.custom_fields,
      settings: eventData.settings,
      design: eventData.design,
      cover_images: eventData.cover_images,
      primary_cover_image: eventData.primary_cover_image
    };

    const { data, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...data } : event
    ));
    return data;
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEventById = (id: string): Event | null => {
    return events.find(event => event.id === id) || null;
  };

  const getPublicEventById = async (id: string): Promise<Event | null> => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .eq('visibility', 'public')
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data as Event;
    } catch (err) {
      console.error('Error fetching public event:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getPublicEventById,
    refetch: fetchEvents
  };
};
