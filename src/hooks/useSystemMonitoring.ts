
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface SystemMetric {
  id: string;
  metric_type: string;
  metric_name: string;
  value: any;
  severity: string;
  source: string;
  timestamp: string;
  metadata?: any;
}

export const useSystemMonitoring = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchMetrics = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_monitoring')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;
      setMetrics(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMetric = async (metric: Omit<SystemMetric, 'id' | 'timestamp'>) => {
    const { data, error } = await supabase
      .from('system_monitoring')
      .insert({
        ...metric,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    setMetrics(prev => [data, ...prev]);
    return data;
  };

  useEffect(() => {
    fetchMetrics();
  }, [user]);

  return {
    metrics,
    loading,
    error,
    addMetric,
    refetch: fetchMetrics
  };
};
