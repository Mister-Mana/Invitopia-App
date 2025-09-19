
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type TemplateInsert = Database['public']['Tables']['templates']['Insert'];
type TemplateUpdate = Database['public']['Tables']['templates']['Update'];
type TemplateRow = Database['public']['Tables']['templates']['Row'];

export interface Template {
  id: string;
  name: string;
  type: Database['public']['Enums']['template_type'];
  category?: string;
  thumbnail?: string;
  preview_images?: string[];
  is_system: boolean;
  is_public: boolean;
  owner_id?: string;
  layout?: any;
  elements?: any;
  default_data?: any;
  required_fields?: string[];
  popularity?: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const useTemplates = (filters?: { type?: string; category?: string; isPublic?: boolean }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      let query = supabase.from('templates').select('*');

      // Apply filters
      if (filters?.type) {
        // Cast the string to the proper enum type
        query = query.eq('type', filters.type as Database['public']['Enums']['template_type']);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.isPublic !== undefined) {
        query = query.eq('is_public', filters.isPublic);
      }

      // Order by popularity and creation date
      query = query.order('popularity', { ascending: false })
                  .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setTemplates(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (templateData: Partial<Template>) => {
    if (!user) throw new Error('User not authenticated');
    if (!templateData.name) throw new Error('Template name is required');

    const insertData: TemplateInsert = {
      name: templateData.name,
      type: templateData.type || 'invitation',
      owner_id: user.id,
      is_system: false,
      is_public: templateData.is_public || false,
      category: templateData.category,
      thumbnail: templateData.thumbnail,
      preview_images: templateData.preview_images,
      layout: templateData.layout,
      elements: templateData.elements,
      default_data: templateData.default_data,
      required_fields: templateData.required_fields,
      popularity: templateData.popularity,
      tags: templateData.tags
    };

    const { data, error } = await supabase
      .from('templates')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    setTemplates(prev => [data, ...prev]);
    return data;
  };

  const updateTemplate = async (id: string, templateData: Partial<Template>) => {
    const updateData: TemplateUpdate = {
      name: templateData.name,
      type: templateData.type,
      category: templateData.category,
      thumbnail: templateData.thumbnail,
      preview_images: templateData.preview_images,
      is_public: templateData.is_public,
      layout: templateData.layout,
      elements: templateData.elements,
      default_data: templateData.default_data,
      required_fields: templateData.required_fields,
      popularity: templateData.popularity,
      tags: templateData.tags
    };

    const { data, error } = await supabase
      .from('templates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, ...data } : template
    ));
    return data;
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  useEffect(() => {
    fetchTemplates();
  }, [filters, user]);

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    refetch: fetchTemplates
  };
};
