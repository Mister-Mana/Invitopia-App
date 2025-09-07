
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface ApiIntegration {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  api_key_encrypted?: string;
  status: string;
  configuration?: any;
  last_sync?: string;
  sync_frequency?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useApiIntegrations = () => {
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchIntegrations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createIntegration = async (integration: Omit<ApiIntegration, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('api_integrations')
      .insert({
        ...integration,
        created_by: user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    setIntegrations(prev => [data, ...prev]);
    return data;
  };

  const updateIntegration = async (id: string, updates: Partial<ApiIntegration>) => {
    const { data, error } = await supabase
      .from('api_integrations')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setIntegrations(prev => prev.map(integration => 
      integration.id === id ? { ...integration, ...data } : integration
    ));
    return data;
  };

  const deleteIntegration = async (id: string) => {
    const { error } = await supabase
      .from('api_integrations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setIntegrations(prev => prev.filter(integration => integration.id !== id));
  };

  useEffect(() => {
    fetchIntegrations();
  }, [user]);

  return {
    integrations,
    loading,
    error,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    refetch: fetchIntegrations
  };
};
