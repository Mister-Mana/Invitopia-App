
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface Payment {
  id: string;
  user_id?: string;
  event_id?: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  stripe_payment_id?: string;
  transaction_fee?: number;
  net_amount?: number;
  metadata?: any;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPayments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
      .from('payments')
      .update({ 
        status, 
        processed_at: status === 'completed' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setPayments(prev => prev.map(payment => 
      payment.id === id ? { ...payment, ...data } : payment
    ));
    return data;
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  return {
    payments,
    loading,
    error,
    updatePaymentStatus,
    refetch: fetchPayments
  };
};
