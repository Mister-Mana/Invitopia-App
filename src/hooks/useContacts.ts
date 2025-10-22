
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Contact, ContactGroup } from '@/types/contacts';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchContacts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (error) throw error;
      setContacts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactGroups = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('contact_groups')
        .select(`
          *,
          contact_group_members(count)
        `)
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (error) throw error;
      
      const groupsWithCount = data?.map(group => ({
        ...group,
        count: group.contact_group_members?.length || 0
      })) || [];
      
      setContactGroups(groupsWithCount);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContacts();
      fetchContactGroups();
    }
  }, [user]);

  return {
    contacts,
    contactGroups,
    loading,
    error,
    refetch: () => {
      fetchContacts();
      fetchContactGroups();
    }
  };
};
