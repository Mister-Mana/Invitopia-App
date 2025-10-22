
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type GuestInsert = Database['public']['Tables']['guests']['Insert'];
type GuestUpdate = Database['public']['Tables']['guests']['Update'];
type GuestRow = Database['public']['Tables']['guests']['Row'];

export interface Guest {
  id: string;
  event_id: string;
  name: string;
  email?: string;
  phone?: string;
  rsvp_status: Database['public']['Enums']['rsvp_status'];
  checked_in: boolean;
  check_in_time?: string;
  invitation_sent: boolean;
  invitation_sent_date?: string;
  response_date?: string;
  plus_ones?: number;
  plus_one_details?: any;
  group_id?: string;
  table_assignment?: string;
  custom_responses?: any;
  notes?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const useGuests = (eventId?: string) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchGuests = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('guests')
        .select(`
          *,
          events!inner(organizer_id)
        `)
        .eq('events.organizer_id', user.id);

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setGuests(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createGuest = async (guestData: Partial<Guest>) => {
    if (!user) throw new Error('User not authenticated');
    if (!guestData.name || !guestData.event_id) throw new Error('Name and event ID are required');

    const insertData: GuestInsert = {
      event_id: guestData.event_id,
      name: guestData.name,
      email: guestData.email,
      phone: guestData.phone,
      rsvp_status: guestData.rsvp_status || 'pending',
      checked_in: guestData.checked_in || false,
      check_in_time: guestData.check_in_time,
      invitation_sent: guestData.invitation_sent || false,
      invitation_sent_date: guestData.invitation_sent_date,
      response_date: guestData.response_date,
      plus_ones: guestData.plus_ones,
      plus_one_details: guestData.plus_one_details,
      group_id: guestData.group_id,
      table_assignment: guestData.table_assignment,
      custom_responses: guestData.custom_responses,
      notes: guestData.notes,
      tags: guestData.tags
    };

    const { data, error } = await supabase
      .from('guests')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    try {
      await supabase.rpc('log_activity', {
        p_action_type: 'created',
        p_resource_type: 'guest',
        p_resource_id: data.id,
        p_description: `Invité "${data.name}" ajouté`,
        p_metadata: { name: data.name, event_id: data.event_id }
      });
    } catch (logError) {
      console.warn('Failed to log activity:', logError);
    }

    setGuests(prev => [data, ...prev]);
    return data;
  };

  const updateGuest = async (id: string, guestData: Partial<Guest>) => {
    const updateData: GuestUpdate = {
      name: guestData.name,
      email: guestData.email,
      phone: guestData.phone,
      rsvp_status: guestData.rsvp_status,
      checked_in: guestData.checked_in,
      check_in_time: guestData.check_in_time,
      invitation_sent: guestData.invitation_sent,
      invitation_sent_date: guestData.invitation_sent_date,
      response_date: guestData.response_date,
      plus_ones: guestData.plus_ones,
      plus_one_details: guestData.plus_one_details,
      group_id: guestData.group_id,
      table_assignment: guestData.table_assignment,
      custom_responses: guestData.custom_responses,
      notes: guestData.notes,
      tags: guestData.tags
    };

    const { data, error } = await supabase
      .from('guests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setGuests(prev => prev.map(guest => 
      guest.id === id ? { ...guest, ...data } : guest
    ));
    return data;
  };

  const deleteGuest = async (id: string) => {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setGuests(prev => prev.filter(guest => guest.id !== id));
  };

  const bulkUpdateGuests = async (guestIds: string[], updates: Partial<Guest>) => {
    const updateData: GuestUpdate = {
      name: updates.name,
      email: updates.email,
      phone: updates.phone,
      rsvp_status: updates.rsvp_status,
      checked_in: updates.checked_in,
      check_in_time: updates.check_in_time,
      invitation_sent: updates.invitation_sent,
      invitation_sent_date: updates.invitation_sent_date,
      response_date: updates.response_date,
      plus_ones: updates.plus_ones,
      plus_one_details: updates.plus_one_details,
      group_id: updates.group_id,
      table_assignment: updates.table_assignment,
      custom_responses: updates.custom_responses,
      notes: updates.notes,
      tags: updates.tags
    };

    const { data, error } = await supabase
      .from('guests')
      .update(updateData)
      .in('id', guestIds)
      .select();

    if (error) throw error;

    setGuests(prev => prev.map(guest => 
      guestIds.includes(guest.id) ? { ...guest, ...updateData } : guest
    ));
    return data;
  };

  useEffect(() => {
    fetchGuests();
  }, [user, eventId]);

  const getGuestStats = () => {
    const total = guests.length;
    const confirmed = guests.filter(g => g.rsvp_status === 'confirmed').length;
    const pending = guests.filter(g => g.rsvp_status === 'pending').length;
    const declined = guests.filter(g => g.rsvp_status === 'declined').length;
    const maybe = guests.filter(g => g.rsvp_status === 'maybe').length;
    const checkedIn = guests.filter(g => g.checked_in).length;

    return {
      total,
      confirmed,
      pending,
      declined,
      maybe,
      checkedIn
    };
  };

  const getEventGuests = async (eventId: string): Promise<Guest[]> => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching event guests:', err);
      return [];
    }
  };

  return {
    guests,
    loading,
    error,
    createGuest,
    updateGuest,
    deleteGuest,
    bulkUpdateGuests,
    getGuestStats,
    getEventGuests,
    refetch: fetchGuests
  };
};
