import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWorkflows } from '@/hooks/useWorkflows';
import PageTransition from '@/components/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EditWorkflowDialog from '@/components/workflow/EditWorkflowDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Workflow, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  Clock, 
  Mail, 
  MessageSquare,
  Calendar,
  Bell,
  Users,
  CheckCircle,
  ArrowRight,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'notification' | 'reminder' | 'task';
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days';
  content: string;
  conditions?: any[];
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  eventType: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: string;
}

const WorkflowBuilder: React.FC = () => {
  const { t } = useLanguage();
  const { workflows, createWorkflow, updateWorkflow, deleteWorkflow, loading } = useWorkflows();
  const [localWorkflows, setLocalWorkflows] = useState<WorkflowTemplate[]>([
    {
      id: '1',
      name: 'Workflow Mariage Standard',
      description: 'Séquence d\'automatisation complète pour les mariages',
      eventType: 'wedding',
      isActive: true,
      createdAt: '2024-01-15',
      steps: [
        {
          id: 'step1',
          name: 'Confirmation d\'inscription',
          type: 'email',
          delay: 0,
          delayUnit: 'minutes',
          content: 'Email de bienvenue et confirmation d\'inscription'
        },
        {
          id: 'step2',
          name: 'Rappel RSVP',
          type: 'reminder',
          delay: 7,
          delayUnit: 'days',
          content: 'Rappel pour confirmer sa présence'
        },
        {
          id: 'step3',
          name: 'Informations pratiques',
          type: 'email',
          delay: 3,
          delayUnit: 'days',
          content: 'Détails logistiques et plan d\'accès'
        }
      ]
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null);
  const [editingWorkflow, setEditingWorkflow] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState<Partial<WorkflowTemplate>>({
    name: '',
    description: '',
    eventType: '',
    steps: [],
    isActive: false
  });

  const stepTypeIcons = {
    email: Mail,
    sms: MessageSquare,
    notification: Bell,
    reminder: Clock,
    task: CheckCircle
  };

  const stepTypeLabels = {
    email: 'Email',
    sms: 'SMS',
    notification: 'Notification',
    reminder: 'Rappel',
    task: 'Tâche'
  };

  const handleCreateWorkflow = async () => {
    if (!newWorkflow.name || !newWorkflow.eventType) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await createWorkflow({
        name: newWorkflow.name!,
        description: newWorkflow.description,
        event_type: newWorkflow.eventType,
        steps: [],
        is_active: false
      });
      setNewWorkflow({ name: '', description: '', eventType: '', steps: [], isActive: false });
      setIsCreating(false);
      toast.success('Workflow créé avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la création du workflow');
    }
  };

  const toggleWorkflowStatus = async (id: string) => {
    try {
      const workflow = workflows.find(w => w.id === id);
      if (workflow) {
        await updateWorkflow(id, { is_active: !workflow.is_active });
        toast.success('Statut du workflow mis à jour');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    try {
      await deleteWorkflow(id);
      if (selectedWorkflow?.id === id) {
        setSelectedWorkflow(null);
      }
      toast.success('Workflow supprimé');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const addStep = async (workflowId: string) => {
    const newStep: WorkflowStep = {
      id: `step_${Date.now()}`,
      name: 'Nouvelle étape',
      type: 'email',
      delay: 1,
      delayUnit: 'days',
      content: ''
    };

    try {
      const workflow = workflows.find(w => w.id === workflowId);
      if (workflow) {
        await updateWorkflow(workflowId, {
          steps: [...workflow.steps, newStep]
        });
      }
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'étape');
    }
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Workflow className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Constructeur de Workflow
                  </h1>
                  <p className="text-muted-foreground">
                    Automatisez vos communications et tâches événementielles
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouveau Workflow
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Workflow List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Workflows</CardTitle>
                  <CardDescription>
                    Gérez vos automatisations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedWorkflow?.id === workflow.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedWorkflow(workflow as any)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{workflow.name}</h4>
                        <div className="flex items-center gap-1">
                          <Badge variant={workflow.is_active ? 'default' : 'secondary'}>
                            {workflow.is_active ? 'Actif' : 'Inactif'}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingWorkflow(workflow);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWorkflowStatus(workflow.id);
                            }}
                          >
                            {workflow.is_active ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Voulez-vous vraiment supprimer ce workflow ?')) {
                                handleDeleteWorkflow(workflow.id);
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {workflow.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{workflow.steps.length} étapes</span>
                        <span>{workflow.event_type}</span>
                      </div>
                    </div>
                  ))}

                  {isCreating && (
                    <Card className="border-dashed">
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <Label htmlFor="name">Nom du workflow</Label>
                          <Input
                            id="name"
                            value={newWorkflow.name}
                            onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Workflow Mariage"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newWorkflow.description}
                            onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Description du workflow"
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor="eventType">Type d'événement</Label>
                          <Select 
                            value={newWorkflow.eventType} 
                            onValueChange={(value) => setNewWorkflow(prev => ({ ...prev, eventType: value }))}
                          >
                            <SelectTrigger>
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
                        <div className="flex gap-2">
                          <Button onClick={handleCreateWorkflow} size="sm">Créer</Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsCreating(false)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Workflow Editor */}
            <div className="lg:col-span-2">
              {selectedWorkflow ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {selectedWorkflow.name}
                          <Badge variant={selectedWorkflow.isActive ? 'default' : 'secondary'}>
                            {selectedWorkflow.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{selectedWorkflow.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteWorkflow(selectedWorkflow.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="steps">
                      <TabsList>
                        <TabsTrigger value="steps">Étapes</TabsTrigger>
                        <TabsTrigger value="settings">Paramètres</TabsTrigger>
                        <TabsTrigger value="analytics">Statistiques</TabsTrigger>
                      </TabsList>

                      <TabsContent value="steps" className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Étapes du workflow</h4>
                          <Button 
                            size="sm" 
                            onClick={() => addStep(selectedWorkflow.id)}
                            className="flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Ajouter une étape
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {selectedWorkflow.steps.map((step, index) => {
                            const IconComponent = stepTypeIcons[step.type];
                            return (
                              <div key={step.id} className="relative">
                                <Card className="border-l-4 border-l-primary">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 rounded-full bg-primary/10">
                                        <IconComponent className="h-4 w-4 text-primary" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-medium">{step.name}</h5>
                                        <p className="text-sm text-muted-foreground">
                                          {stepTypeLabels[step.type]}
                                          {step.delay > 0 && ` • ${step.delay} ${step.delayUnit}`}
                                        </p>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {step.content}
                                    </p>
                                  </CardContent>
                                </Card>
                                {index < selectedWorkflow.steps.length - 1 && (
                                  <div className="flex justify-center my-2">
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {selectedWorkflow.steps.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                            <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h4 className="font-medium text-muted-foreground mb-2">
                              Aucune étape configurée
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Commencez par ajouter votre première étape au workflow
                            </p>
                            <Button onClick={() => addStep(selectedWorkflow.id)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Ajouter une étape
                            </Button>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="settings">
                        <div className="space-y-4">
                          <h4 className="font-medium">Paramètres du workflow</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Type d'événement</Label>
                              <Select value={selectedWorkflow.eventType}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="wedding">Mariage</SelectItem>
                                  <SelectItem value="birthday">Anniversaire</SelectItem>
                                  <SelectItem value="corporate">Événement d'entreprise</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Label>Workflow actif</Label>
                              <Button
                                variant={selectedWorkflow.isActive ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => toggleWorkflowStatus(selectedWorkflow.id)}
                              >
                                {selectedWorkflow.isActive ? 'Actif' : 'Inactif'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="analytics">
                        <div className="space-y-4">
                          <h4 className="font-medium">Statistiques de performance</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <Card>
                              <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">12</div>
                                <p className="text-sm text-muted-foreground">Exécutions</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">92%</div>
                                <p className="text-sm text-muted-foreground">Taux de succès</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">2.3s</div>
                                <p className="text-sm text-muted-foreground">Temps moyen</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Workflow className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Sélectionnez un workflow
                    </h3>
                    <p className="text-muted-foreground">
                      Choisissez un workflow dans la liste pour le modifier ou en créer un nouveau
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <EditWorkflowDialog
          workflow={editingWorkflow}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={updateWorkflow}
        />
      </PageTransition>
    </DashboardLayout>
  );
};

export default WorkflowBuilder;