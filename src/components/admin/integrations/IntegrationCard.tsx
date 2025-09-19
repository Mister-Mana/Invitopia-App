
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Trash2, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { ApiIntegration } from '@/hooks/useApiIntegrations';

interface IntegrationCardProps {
  integration: ApiIntegration;
  onStatusToggle: (id: string, currentStatus: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  integration, 
  onStatusToggle, 
  onDelete 
}) => {
  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return '💳';
      case 'email':
        return '📧';
      case 'sms':
        return '📱';
      case 'analytics':
        return '📊';
      default:
        return '🔌';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intégration ?')) {
      try {
        await onDelete(integration.id);
      } catch (error: any) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTypeIcon(integration.type)}</span>
            <CardTitle className="text-lg">{integration.name}</CardTitle>
          </div>
          <Badge className={getStatusBadge(integration.status)}>
            {integration.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Type: {integration.type}</p>
            <p className="text-sm text-gray-600">Endpoint: {integration.endpoint}</p>
            <p className="text-sm text-gray-600">
              Sync: {integration.sync_frequency}
            </p>
            {integration.last_sync && (
              <p className="text-sm text-gray-600">
                Dernière sync: {new Date(integration.last_sync).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={integration.status === 'active' ? 'destructive' : 'default'}
              onClick={() => onStatusToggle(integration.id, integration.status)}
            >
              <Activity className="h-4 w-4 mr-1" />
              {integration.status === 'active' ? 'Désactiver' : 'Activer'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info('Configuration en cours de développement')}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
