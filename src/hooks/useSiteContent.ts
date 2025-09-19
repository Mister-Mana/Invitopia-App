
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type SiteContentRow = Database['public']['Tables']['site_content']['Row'];
type SiteContentInsert = Database['public']['Tables']['site_content']['Insert'];
type SiteContentUpdate = Database['public']['Tables']['site_content']['Update'];

export interface SiteContent extends SiteContentRow {}

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Omit<SiteContentInsert, 'created_by'>) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent créer du contenu');
    }

    const { data, error } = await supabase
      .from('site_content')
      .insert({ ...contentData, created_by: user.id })
      .select()
      .single();

    if (error) throw error;

    setContent(prev => [...prev, data]);
    return data;
  };

  const updateContent = async (id: string, updates: SiteContentUpdate) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent modifier le contenu');
    }

    const { data, error } = await supabase
      .from('site_content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    return data;
  };

  const deleteContent = async (id: string) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent supprimer le contenu');
    }

    const { error } = await supabase
      .from('site_content')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setContent(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    createContent,
    updateContent,
    deleteContent,
    refetch: fetchContent
  };
};
