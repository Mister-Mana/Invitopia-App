import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface MarketingCampaign {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  start_date?: string;
  end_date?: string;
  target_audience: {
    ageRange?: string;
    location?: string;
    interests?: string[];
  };
  ad_content: {
    title: string;
    description: string;
    image?: string;
  };
  created_at: string;
  updated_at: string;
}

export const useMarketingCampaigns = () => {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCampaigns = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns((data || []).map(c => ({
        ...c,
        status: c.status as 'draft' | 'active' | 'paused' | 'completed',
        target_audience: typeof c.target_audience === 'object' && c.target_audience !== null ? c.target_audience as any : {},
        ad_content: typeof c.ad_content === 'object' && c.ad_content !== null ? c.ad_content as any : { title: '', description: '' }
      })));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaign: Omit<MarketingCampaign, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .insert({
        name: campaign.name,
        description: campaign.description,
        status: campaign.status,
        budget: campaign.budget,
        spent: campaign.spent,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        conversions: campaign.conversions,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        target_audience: campaign.target_audience as any,
        ad_content: campaign.ad_content as any,
        user_id: user?.id,
      })
      .select()
      .single();

    if (error) throw error;

    const mappedData = {
      ...data,
      status: data.status as 'draft' | 'active' | 'paused' | 'completed',
      target_audience: typeof data.target_audience === 'object' && data.target_audience !== null ? data.target_audience as any : {},
      ad_content: typeof data.ad_content === 'object' && data.ad_content !== null ? data.ad_content as any : { title: '', description: '' }
    };
    setCampaigns(prev => [mappedData, ...prev]);
    return mappedData;
  };

  const updateCampaign = async (id: string, updates: Partial<MarketingCampaign>) => {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.budget !== undefined) updateData.budget = updates.budget;
    if (updates.spent !== undefined) updateData.spent = updates.spent;
    if (updates.impressions !== undefined) updateData.impressions = updates.impressions;
    if (updates.clicks !== undefined) updateData.clicks = updates.clicks;
    if (updates.conversions !== undefined) updateData.conversions = updates.conversions;
    if (updates.start_date !== undefined) updateData.start_date = updates.start_date;
    if (updates.end_date !== undefined) updateData.end_date = updates.end_date;
    if (updates.target_audience !== undefined) updateData.target_audience = updates.target_audience as any;
    if (updates.ad_content !== undefined) updateData.ad_content = updates.ad_content as any;

    const { data, error } = await supabase
      .from('marketing_campaigns')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    const mappedData = {
      ...data,
      status: data.status as 'draft' | 'active' | 'paused' | 'completed',
      target_audience: typeof data.target_audience === 'object' && data.target_audience !== null ? data.target_audience as any : {},
      ad_content: typeof data.ad_content === 'object' && data.ad_content !== null ? data.ad_content as any : { title: '', description: '' }
    };
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...mappedData } : c));
    return mappedData;
  };

  const deleteCampaign = async (id: string) => {
    const { error } = await supabase
      .from('marketing_campaigns')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: fetchCampaigns
  };
};
