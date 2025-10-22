import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  rating?: number;
  price: number;
  amenities: string[];
  images: string[];
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  status?: string;
  contact_info?: any;
  availability?: any;
}

export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchVenues = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVenues(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching venues:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [user]);

  const createVenue = async (venueData: Partial<Venue>) => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .insert({
          name: venueData.name,
          location: venueData.location,
          capacity: venueData.capacity || 0,
          price: venueData.price || 0,
          rating: venueData.rating || 0,
          amenities: venueData.amenities || [],
          images: venueData.images || [],
          description: venueData.description || '',
          created_by: user?.id || ''
        })
        .select()
        .single();

      if (error) throw error;

      setVenues(prev => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateVenue = async (id: string, updates: Partial<Venue>) => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setVenues(prev => prev.map(venue => 
        venue.id === id ? { ...venue, ...data } : venue
      ));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteVenue = async (id: string) => {
    try {
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVenues(prev => prev.filter(venue => venue.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    venues,
    loading,
    error,
    createVenue,
    updateVenue,
    deleteVenue,
    refetch: fetchVenues
  };
};