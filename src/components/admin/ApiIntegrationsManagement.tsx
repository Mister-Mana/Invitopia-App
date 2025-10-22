
import React, { useState } from 'react';
import { useApiIntegrations } from '@/hooks/useApiIntegrations';
import { toast } from 'sonner';
import CreateIntegrationDialog from './integrations/CreateIntegrationDialog';
import IntegrationCard from './integrations/IntegrationCard';
import EmptyState from './integrations/EmptyState';

const ApiIntegrationsManagement: React.FC = () => {
  const { integrations, loading, error, createIntegration, updateIntegration, deleteIntegration } = useApiIntegrations();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreate = async (integration: any) => {
    await createIntegration(integration);
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateIntegration(id, { status: newStatus });
      toast.success(`Intégration ${newStatus === 'active' ? 'activée' : 'désactivée'}`);
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteIntegration(id);
      toast.success('Intégration supprimée avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) return <div>Chargement des intégrations...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Intégrations API</h2>
          <p className="text-gray-600">Gérez les intégrations avec les services externes</p>
        </div>
        <CreateIntegrationDialog onCreateIntegration={handleCreate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onStatusToggle={handleStatusToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
      
      {integrations.length === 0 && (
        <EmptyState onCreateClick={() => setIsCreateDialogOpen(true)} />
      )}
    </div>
  );
};

export default ApiIntegrationsManagement;
