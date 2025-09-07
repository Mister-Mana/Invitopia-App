
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CreateIntegrationDialogProps {
  onCreateIntegration: (integration: any) => Promise<void>;
}

const CreateIntegrationDialog: React.FC<CreateIntegrationDialogProps> = ({ onCreateIntegration }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: '',
    endpoint: '',
    api_key_encrypted: '',
    status: 'inactive',
    sync_frequency: 'daily',
    configuration: {}
  });

  const handleCreate = async () => {
    try {
      await onCreateIntegration(newIntegration);
      setIsCreateDialogOpen(false);
      setNewIntegration({
        name: '',
        type: '',
        endpoint: '',
        api_key_encrypted: '',
        status: 'inactive',
        sync_frequency: 'daily',
        configuration: {}
      });
      toast.success('Intégration créée avec succès');
    } catch (error: any) {
      toast.error('Erreur lors de la création de l\'intégration');
    }
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle intégration
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle intégration</DialogTitle>
          <DialogDescription>
            Configurez une nouvelle intégration API
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={newIntegration.name}
              onChange={(e) => setNewIntegration({...newIntegration, name: e.target.value})}
              placeholder="ex: Stripe, SendGrid..."
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select 
              value={newIntegration.type} 
              onValueChange={(value) => setNewIntegration({...newIntegration, type: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Paiement</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="endpoint">Endpoint</Label>
            <Input
              id="endpoint"
              value={newIntegration.endpoint}
              onChange={(e) => setNewIntegration({...newIntegration, endpoint: e.target.value})}
              placeholder="https://api.example.com/v1/"
            />
          </div>
          <div>
            <Label htmlFor="apiKey">Clé API</Label>
            <Input
              id="apiKey"
              type="password"
              value={newIntegration.api_key_encrypted}
              onChange={(e) => setNewIntegration({...newIntegration, api_key_encrypted: e.target.value})}
              placeholder="Votre clé API"
            />
          </div>
          <div>
            <Label htmlFor="frequency">Fréquence de synchronisation</Label>
            <Select 
              value={newIntegration.sync_frequency} 
              onValueChange={(value) => setNewIntegration({...newIntegration, sync_frequency: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Chaque heure</SelectItem>
                <SelectItem value="daily">Quotidienne</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="manual">Manuelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreate} className="w-full">
            Créer l'intégration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIntegrationDialog;
