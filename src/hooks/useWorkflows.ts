import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'notification' | 'reminder' | 'task';
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days';
  content: string;
  conditions?: any[];
}

export interface Workflow {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  event_type?: string;
  steps: WorkflowStep[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchWorkflows = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkflows((data || []).map(w => ({
        ...w,
        steps: Array.isArray(w.steps) ? w.steps as unknown as WorkflowStep[] : []
      })));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWorkflow = async (workflow: Omit<Workflow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('workflows')
      .insert({
        name: workflow.name,
        description: workflow.description,
        event_type: workflow.event_type,
        steps: workflow.steps as any,
        is_active: workflow.is_active,
        user_id: user?.id,
      })
      .select()
      .single();

    if (error) throw error;

    const mappedData = {
      ...data,
      steps: Array.isArray(data.steps) ? data.steps as unknown as WorkflowStep[] : []
    };
    setWorkflows(prev => [mappedData, ...prev]);
    return mappedData;
  };

  const updateWorkflow = async (id: string, updates: Partial<Workflow>) => {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.event_type !== undefined) updateData.event_type = updates.event_type;
    if (updates.is_active !== undefined) updateData.is_active = updates.is_active;
    if (updates.steps !== undefined) updateData.steps = updates.steps as any;

    const { data, error } = await supabase
      .from('workflows')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    const mappedData = {
      ...data,
      steps: Array.isArray(data.steps) ? data.steps as unknown as WorkflowStep[] : []
    };
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, ...mappedData } : w));
    return mappedData;
  };

  const deleteWorkflow = async (id: string) => {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setWorkflows(prev => prev.filter(w => w.id !== id));
  };

  useEffect(() => {
    fetchWorkflows();
  }, [user]);

  return {
    workflows,
    loading,
    error,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    refetch: fetchWorkflows
  };
};
