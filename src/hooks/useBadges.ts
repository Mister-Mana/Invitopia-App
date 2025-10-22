
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Database } from '@/integrations/supabase/types';

type BadgeRow = Database['public']['Tables']['badges']['Row'];
type BadgeInsert = Database['public']['Tables']['badges']['Insert'];
type BadgeUpdate = Database['public']['Tables']['badges']['Update'];

export interface Badge extends BadgeRow {
  profiles?: {
    name: string;
    email: string | null;
  } | null;
  reviewer?: {
    name: string;
  } | null;
}

export const useBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('badges')
        .select(`
          *,
          profiles!badges_user_id_fkey(name, email),
          reviewer:profiles!badges_reviewed_by_fkey(name)
        `)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setBadges(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reviewBadge = async (
    badgeId: string, 
    status: Database['public']['Enums']['badge_status'],
    expiresAt?: string
  ) => {
    if (!user || user.role !== 'super_admin') {
      throw new Error('Seuls les super administrateurs peuvent examiner les badges');
    }

    const updates: BadgeUpdate = {
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id
    };

    if (expiresAt) {
      updates.expires_at = expiresAt;
    }

    const { data, error } = await supabase
      .from('badges')
      .update(updates)
      .eq('id', badgeId)
      .select()
      .single();

    if (error) throw error;

    setBadges(prev => prev.map(badge => 
      badge.id === badgeId ? { ...badge, ...data } : badge
    ));
    return data;
  };

  const applyForBadge = async (
    badgeType: Database['public']['Enums']['badge_type'],
    applicationReason: string,
    price: number = 0
  ) => {
    if (!user) {
      throw new Error('Vous devez être connecté pour postuler à un badge');
    }

    const { data, error } = await supabase
      .from('badges')
      .insert({
        user_id: user.id,
        badge_type: badgeType,
        application_reason: applicationReason,
        price,
        status: 'pending',
        payment_status: price > 0 ? 'pending' : 'completed'
      })
      .select()
      .single();

    if (error) throw error;

    setBadges(prev => [data, ...prev]);
    return data;
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  return {
    badges,
    loading,
    error,
    reviewBadge,
    applyForBadge,
    refetch: fetchBadges
  };
};
