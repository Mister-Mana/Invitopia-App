import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'notification' | 'reminder' | 'task';
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days';
  content: string;
}

interface Workflow {
  id: string;
  name: string;
  description?: string;
  event_type?: string;
  steps: WorkflowStep[];
  is_active: boolean;
}

interface EditWorkflowDialogProps {
  workflow: Workflow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<Workflow>) => Promise<any>;
}

const EditWorkflowDialog: React.FC<EditWorkflowDialogProps> = ({
  workflow,
  open,
  onOpenChange,
  onSave
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (workflow) {
      setName(workflow.name);
      setDescription(workflow.description || '');
      setEventType(workflow.event_type || '');
      setIsActive(workflow.is_active);
    }
  }, [workflow]);

  const handleSave = async () => {
    if (!workflow || !name) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSaving(true);
    try {
      await onSave(workflow.id, {
        name,
        description,
        event_type: eventType,
        is_active: isActive
      });
      toast.success('Workflow mis à jour avec succès');
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
          <DialogTitle>Modifier le workflow</DialogTitle>
          <DialogDescription>
            Modifiez les paramètres de votre workflow d'automatisation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nom du workflow</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Workflow Mariage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du workflow"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-eventType">Type d'événement</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger id="edit-eventType">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Mariage</SelectItem>
                <SelectItem value="birthday">Anniversaire</SelectItem>
                <SelectItem value="corporate">Événement d'entreprise</SelectItem>
                <SelectItem value="conference">Conférence</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="edit-isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="edit-isActive" className="cursor-pointer">
              Workflow actif
            </Label>
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

export default EditWorkflowDialog;
