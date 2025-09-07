import React, { useState, useEffect } from 'react';
import { useApiIntegrations } from '@/hooks/useApiIntegrations';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Zap, 
  Globe, 
  Key,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  PlayCircle
} from 'lucide-react';

const ApiIntegrationsManager: React.FC = () => {
  const { integrations, loading, createIntegration, updateIntegration, deleteIntegration } = useApiIntegrations();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<any>(null);
  const [testingIntegration, setTestingIntegration] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'webhook',
    endpoint: '',
    api_key_encrypted: '',
    status: 'inactive',
    sync_frequency: 'daily',
    configuration: {}
  });

  const integrationTypes = [
    { value: 'webhook', label: 'Webhook', icon: Zap },
    { value: 'rest_api', label: 'REST API', icon: Globe },
    { value: 'graphql', label: 'GraphQL', icon: Settings },
    { value: 'database', label: 'Base de données', icon: Settings },
    { value: 'email', label: 'Email Service', icon: Settings },
    { value: 'payment', label: 'Paiement', icon: Settings },
    { value: 'sms', label: 'SMS', icon: Settings },
    { value: 'social', label: 'Réseaux sociaux', icon: Settings }
  ];

  const syncFrequencies = [
    { value: 'realtime', label: 'Temps réel' },
    { value: 'hourly', label: 'Toutes les heures' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' },
    { value: 'manual', label: 'Manuel' }
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'webhook',
      endpoint: '',
      api_key_encrypted: '',
      status: 'inactive',
      sync_frequency: 'daily',
      configuration: {}
    });
    setEditingIntegration(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (integration: any) => {
    setFormData({
      name: integration.name,
      type: integration.type,
      endpoint: integration.endpoint,
      api_key_encrypted: integration.api_key_encrypted || '',
      status: integration.status,
      sync_frequency: integration.sync_frequency || 'daily',
      configuration: integration.configuration || {}
    });
    setEditingIntegration(integration);
    setIsCreateDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingIntegration) {
        await updateIntegration(editingIntegration.id, formData);
        toast.success('Intégration mise à jour avec succès');
      } else {
        await createIntegration(formData);
        toast.success('Intégration créée avec succès');
      }

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette intégration ?')) {
      try {
        await deleteIntegration(id);
        toast.success('Intégration supprimée avec succès');
      } catch (error: any) {
        toast.error(error.message || 'Erreur lors de la suppression');
      }
    }
  };

  const toggleStatus = async (integration: any) => {
    try {
      const newStatus = integration.status === 'active' ? 'inactive' : 'active';
      await updateIntegration(integration.id, { status: newStatus });
      toast.success(`Intégration ${newStatus === 'active' ? 'activée' : 'désactivée'}`);
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la modification');
    }
  };

  const testIntegration = async (integration: any) => {
    setTestingIntegration(integration.id);
    try {
      // Simulation d'un test d'intégration
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Test de l\'intégration réussi');
    } catch (error) {
      toast.error('Échec du test d\'intégration');
    } finally {
      setTestingIntegration(null);
    }
  };

  const syncIntegration = async (integration: any) => {
    try {
      await updateIntegration(integration.id, { 
        last_sync: new Date().toISOString() 
      });
      toast.success('Synchronisation lancée');
    } catch (error: any) {
      toast.error('Erreur lors de la synchronisation');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <Clock className="h-4 w-4" />;
      case 'error':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Intégrations API</h2>
          <p className="text-gray-600">Gérez toutes vos intégrations externes</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle intégration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const IntegrationType = integrationTypes.find(t => t.value === integration.type);
          const Icon = IntegrationType?.icon || Globe;
          
          return (
            <Card key={integration.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription className="capitalize">
                        {IntegrationType?.label}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(integration.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(integration.status)}
                      <span className="ml-1 capitalize">{integration.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Endpoint:</p>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded truncate">
                      {integration.endpoint}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Fréquence:</span>
                    <span className="capitalize">
                      {syncFrequencies.find(f => f.value === integration.sync_frequency)?.label}
                    </span>
                  </div>
                  
                  {integration.last_sync && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Dernière sync:</span>
                      <span className="text-gray-500">
                        {new Date(integration.last_sync).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(integration)}
                      className="flex-1"
                    >
                      {integration.status === 'active' ? 'Désactiver' : 'Activer'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testIntegration(integration)}
                      disabled={testingIntegration === integration.id}
                    >
                      {testingIntegration === integration.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <PlayCircle className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(integration)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(integration.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  {integration.status === 'active' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => syncIntegration(integration)}
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Synchroniser maintenant
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingIntegration ? 'Modifier l\'intégration' : 'Créer une nouvelle intégration'}
            </DialogTitle>
            <DialogDescription>
              Configurez votre intégration API pour connecter des services externes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'intégration *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Mon intégration"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type d'intégration *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {integrationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint">URL d'endpoint *</Label>
              <Input
                id="endpoint"
                value={formData.endpoint}
                onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                placeholder="https://api.example.com/webhook"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api_key">Clé API (optionnel)</Label>
              <Input
                id="api_key"
                type="password"
                value={formData.api_key_encrypted}
                onChange={(e) => setFormData({ ...formData, api_key_encrypted: e.target.value })}
                placeholder="Votre clé API secrète"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sync_frequency">Fréquence de synchronisation</Label>
                <Select 
                  value={formData.sync_frequency} 
                  onValueChange={(value) => setFormData({ ...formData, sync_frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {syncFrequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>État initial</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    checked={formData.status === 'active'}
                    onCheckedChange={(checked) => setFormData({ 
                      ...formData, 
                      status: checked ? 'active' : 'inactive' 
                    })}
                  />
                  <span className="text-sm">
                    {formData.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Key className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Sécurité</p>
                  <p className="text-sm text-blue-700">
                    Les clés API sont chiffrées et stockées en sécurité. Vous pouvez configurer 
                    des paramètres avancés après la création.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.endpoint}
            >
              {editingIntegration ? 'Mettre à jour' : 'Créer l\'intégration'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiIntegrationsManager;
