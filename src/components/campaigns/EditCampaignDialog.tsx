import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  start_date?: string;
  end_date?: string;
}

interface EditCampaignDialogProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<Campaign>) => Promise<any>;
}

const EditCampaignDialog: React.FC<EditCampaignDialogProps> = ({
  campaign,
  open,
  onOpenChange,
  onSave
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'active' | 'paused' | 'completed'>('draft');
  const [budget, setBudget] = useState(100);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (campaign) {
      setName(campaign.name);
      setDescription(campaign.description || '');
      setStatus(campaign.status);
      setBudget(campaign.budget);
      setStartDate(campaign.start_date ? new Date(campaign.start_date).toISOString().split('T')[0] : '');
      setEndDate(campaign.end_date ? new Date(campaign.end_date).toISOString().split('T')[0] : '');
    }
  }, [campaign]);

  const handleSave = async () => {
    if (!campaign || !name) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSaving(true);
    try {
      await onSave(campaign.id, {
        name,
        description,
        status,
        budget,
        start_date: startDate ? new Date(startDate).toISOString() : undefined,
        end_date: endDate ? new Date(endDate).toISOString() : undefined
      });
      toast.success('Campagne mise à jour avec succès');
      onOpenChange(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier la campagne</DialogTitle>
          <DialogDescription>
            Modifiez les paramètres de votre campagne marketing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-campaign-name">Nom de la campagne</Label>
            <Input
              id="edit-campaign-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Promotion Mariages Été 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-campaign-description">Description</Label>
            <Textarea
              id="edit-campaign-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la campagne"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-campaign-status">Statut</Label>
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger id="edit-campaign-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">En pause</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-campaign-budget">Budget (€)</Label>
              <Input
                id="edit-campaign-budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-campaign-start">Date de début</Label>
              <Input
                id="edit-campaign-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-campaign-end">Date de fin</Label>
              <Input
                id="edit-campaign-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>Enregistrement...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaignDialog;
