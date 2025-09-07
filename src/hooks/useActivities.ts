import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface Activity {
  id: string;
  user_id: string;
  action_type: string;
  resource_type: string;
  resource_id?: string;
  description: string;
  metadata: any;
  created_at: string;
}

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchActivities = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setActivities(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (
    actionType: string,
    resourceType: string,
    resourceId?: string,
    description?: string,
    metadata?: any
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('log_activity', {
        p_action_type: actionType,
        p_resource_type: resourceType,
        p_resource_id: resourceId,
        p_description: description,
        p_metadata: metadata || {}
      });

      if (error) throw error;

      // Refresh activities
      fetchActivities();
      return data;
    } catch (err: any) {
      console.error('Error logging activity:', err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return {
    activities,
    loading,
    error,
    logActivity,
    refetch: fetchActivities
  };
};