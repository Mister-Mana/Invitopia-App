import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface MasterOfCeremony {
  id: string;
  user_id: string;
  business_name: string;
  bio?: string;
  specialties: string[];
  pricing_info: any;
  social_media: any;
  cover_image?: string;
  profile_image?: string;
  gallery_images: string[];
  experience_years: number;
  is_verified: boolean;
  badge_category?: 'verified' | 'premium' | 'featured' | null;
  badge_expires_at?: string | null;
  rating: number;
  total_reviews: number;
  available_dates: any;
  location?: string;
  contact_info: any;
  services: any[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface MCConversation {
  id: string;
  mc_id: string;
  client_id: string;
  last_message?: string;
  last_message_at: string;
  is_read_by_mc: boolean;
  is_read_by_client: boolean;
  created_at: string;
  master_of_ceremonies?: MasterOfCeremony;
}

export interface MCMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  created_at: string;
}

export const useMasterOfCeremonies = () => {
  const [mcs, setMcs] = useState<MasterOfCeremony[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchMCs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('master_of_ceremonies')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setMcs(data as MasterOfCeremony[] || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erreur lors du chargement des maîtres de cérémonie');
    } finally {
      setLoading(false);
    }
  };

  const createMCProfile = async (mcData: Partial<MasterOfCeremony>) => {
    try {
      if (!user?.id) throw new Error('Utilisateur non connecté');

      const { data, error } = await supabase
        .from('master_of_ceremonies')
        .insert([{ 
          ...mcData, 
          user_id: user.id,
          business_name: mcData.business_name || 'Nouveau MC'
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success('Profil MC créé avec succès !');
      fetchMCs();
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création du profil');
      throw err;
    }
  };

  const updateMCProfile = async (id: string, updates: Partial<MasterOfCeremony>) => {
    try {
      const { data, error } = await supabase
        .from('master_of_ceremonies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast.success('Profil mis à jour avec succès !');
      fetchMCs();
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la mise à jour');
      throw err;
    }
  };

  const getMCById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('master_of_ceremonies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    fetchMCs();
  }, []);

  return {
    mcs,
    loading,
    error,
    createMCProfile,
    updateMCProfile,
    getMCById,
    refetch: fetchMCs
  };
};

export const useMCChat = () => {
  const [conversations, setConversations] = useState<MCConversation[]>([]);
  const [messages, setMessages] = useState<MCMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mc_conversations')
        .select(`
          *,
          master_of_ceremonies(*)
        `)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      setConversations(data as MCConversation[] || []);
    } catch (err: any) {
      toast.error('Erreur lors du chargement des conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('mc_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      toast.error('Erreur lors du chargement des messages');
    }
  };

  const startConversation = async (mcId: string) => {
    try {
      if (!user?.id) throw new Error('Utilisateur non connecté');

      // Vérifier si une conversation existe déjà
      const { data: existing } = await supabase
        .from('mc_conversations')
        .select('*')
        .eq('mc_id', mcId)
        .eq('client_id', user.id)
        .single();

      if (existing) {
        return existing;
      }

      const { data, error } = await supabase
        .from('mc_conversations')
        .insert([{
          mc_id: mcId,
          client_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      fetchConversations();
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création de la conversation');
      throw err;
    }
  };

  const sendMessage = async (conversationId: string, message: string) => {
    try {
      if (!user?.id) throw new Error('Utilisateur non connecté');

      const { data, error } = await supabase
        .from('mc_messages')
        .insert([{
          conversation_id: conversationId,
          sender_id: user.id,
          message
        }])
        .select()
        .single();

      if (error) throw error;

      // Mettre à jour la conversation
      await supabase
        .from('mc_conversations')
        .update({
          last_message: message,
          last_message_at: new Date().toISOString()
        })
        .eq('id', conversationId);

      fetchMessages(conversationId);
      fetchConversations();
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de l\'envoi du message');
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  return {
    conversations,
    messages,
    loading,
    fetchConversations,
    fetchMessages,
    startConversation,
    sendMessage
  };
};