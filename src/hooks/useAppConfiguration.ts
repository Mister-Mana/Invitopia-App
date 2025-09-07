import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AppConfiguration {
  id: string;
  app_title: string;
  app_icon_url?: string;
  favicon_url?: string;
  meta_description?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export const useAppConfiguration = () => {
  const [config, setConfig] = useState<AppConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppConfiguration = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('app_configuration')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setConfig(data || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAppConfiguration = async (updates: Partial<AppConfiguration>) => {
    try {
      if (!config) {
        // Create new configuration
        const { data, error } = await supabase
          .from('app_configuration')
          .insert({
            app_title: updates.app_title || 'Invitopia',
            app_icon_url: updates.app_icon_url,
            favicon_url: updates.favicon_url,
            meta_description: updates.meta_description,
            is_active: true
          })
          .select()
          .single();

        if (error) throw error;
        setConfig(data);
        return data;
      } else {
        // Update existing configuration
        const { data, error } = await supabase
          .from('app_configuration')
          .update({
            app_title: updates.app_title,
            app_icon_url: updates.app_icon_url,
            favicon_url: updates.favicon_url,
            meta_description: updates.meta_description,
            updated_at: new Date().toISOString()
          })
          .eq('id', config.id)
          .select()
          .single();

        if (error) throw error;
        setConfig(data);
        return data;
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const uploadAppAsset = async (file: File, type: 'icon' | 'favicon'): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('app-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('app-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAppConfiguration();
  }, []);

  // Update document title when config changes
  useEffect(() => {
    if (config?.app_title) {
      document.title = config.app_title;
    }
  }, [config?.app_title]);

  // Update favicon when config changes
  useEffect(() => {
    if (config?.favicon_url) {
      const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = config.favicon_url;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = config.favicon_url;
        document.head.appendChild(newFavicon);
      }
    }
  }, [config?.favicon_url]);

  return {
    config,
    loading,
    error,
    updateAppConfiguration,
    uploadAppAsset,
    refetch: fetchAppConfiguration
  };
};