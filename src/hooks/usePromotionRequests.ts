
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface PromotionRequest {
  id: string;
  event_id?: string;
  organizer_id?: string;
  campaign_name: string;
  budget: number;
  target_audience?: any;
  ad_content: any;
  start_date: string;
  end_date: string;
  status: string;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  cost_per_click?: number;
  total_spent?: number;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export const usePromotionRequests = () => {
  const [promotions, setPromotions] = useState<PromotionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPromotions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('promotion_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPromotion = async (promotion: Omit<PromotionRequest, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('promotion_requests')
      .insert({
        ...promotion,
        organizer_id: user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    setPromotions(prev => [data, ...prev]);
    return data;
  };

  const updatePromotionStatus = async (id: string, status: string) => {
    const updates: any = { 
      status, 
      updated_at: new Date().toISOString() 
    };

    if (status === 'approved') {
      updates.approved_by = user?.id;
      updates.approved_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('promotion_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setPromotions(prev => prev.map(promotion => 
      promotion.id === id ? { ...promotion, ...data } : promotion
    ));
    return data;
  };

  useEffect(() => {
    fetchPromotions();
  }, [user]);

  return {
    promotions,
    loading,
    error,
    createPromotion,
    updatePromotionStatus,
    refetch: fetchPromotions
  };
};
