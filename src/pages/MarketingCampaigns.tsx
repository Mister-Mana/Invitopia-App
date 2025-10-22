import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMarketingCampaigns } from '@/hooks/useMarketingCampaigns';
import PageTransition from '@/components/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EditCampaignDialog from '@/components/campaigns/EditCampaignDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Eye, 
  MousePointer, 
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate?: string;
  endDate?: string;
  start_date?: string;
  end_date?: string;
  targetAudience?: {
    ageRange?: string;
    location?: string;
    interests?: string[];
  };
  target_audience?: {
    ageRange?: string;
    location?: string;
    interests?: string[];
  };
  adContent?: {
    title?: string;
    description?: string;
    image?: string;
  };
  ad_content?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

const MarketingCampaigns: React.FC = () => {
  const { t } = useLanguage();
  const { campaigns, createCampaign, updateCampaign, deleteCampaign, loading } = useMarketingCampaigns();
  const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Promotion Mariages Été 2024',
      description: 'Campagne pour promouvoir nos services de mariage pendant la saison estivale',
      status: 'active',
      budget: 500,
      spent: 284,
      impressions: 12450,
      clicks: 324,
      conversions: 23,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      targetAudience: {
        ageRange: '25-35',
        location: 'France',
        interests: ['mariage', 'événements', 'organisation']
      },
      adContent: {
        title: 'Organisez le mariage de vos rêves',
        description: 'Découvrez notre plateforme complète pour organiser votre mariage parfait'
      }
    },
    {
      id: '2',
      name: 'Événements Corporatifs',
      description: 'Ciblage des entreprises pour les événements corporatifs',
      status: 'paused',
      budget: 800,
      spent: 156,
      impressions: 5230,
      clicks: 89,
      conversions: 7,
      startDate: '2024-02-15',
      endDate: '2024-12-31',
      targetAudience: {
        ageRange: '30-50',
        location: 'Paris, Lyon, Marseille',
        interests: ['business', 'corporate events', 'networking']
      },
      adContent: {
        title: 'Événements corporatifs sur mesure',
        description: 'Solutions professionnelles pour vos événements d\'entreprise'
      }
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    budget: 100,
    status: 'draft',
    targetAudience: {
      ageRange: '',
      location: '',
      interests: []
    },
    adContent: {
      title: '',
      description: '',
      image: undefined
    }
  });

  const statusColors = {
    draft: 'secondary',
    active: 'default',
    paused: 'destructive',
    completed: 'outline'
  } as const;

  const statusLabels = {
    draft: 'Brouillon',
    active: 'Active',
    paused: 'En pause',
    completed: 'Terminée'
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00';
  };

  const calculateConversionRate = (conversions: number, clicks: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00';
  };

  const calculateCPC = (spent: number, clicks: number) => {
    return clicks > 0 ? (spent / clicks).toFixed(2) : '0.00';
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await createCampaign({
        name: newCampaign.name,
        description: newCampaign.description,
        status: newCampaign.status || 'draft',
        budget: newCampaign.budget || 100,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        target_audience: newCampaign.targetAudience || { ageRange: '', location: '', interests: [] },
        ad_content: { 
          title: newCampaign.adContent?.title || '', 
          description: newCampaign.adContent?.description || '' 
        } as any
      });

      setNewCampaign({
        name: '',
        description: '',
        budget: 100,
        status: 'draft',
        targetAudience: { ageRange: '', location: '', interests: [] },
        adContent: { title: '', description: '', image: undefined }
      });
      setIsCreating(false);
      toast.success('Campagne créée avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la création de la campagne');
    }
  };

  const toggleCampaignStatus = async (id: string) => {
    try {
      const campaign = campaigns.find(c => c.id === id);
      if (campaign) {
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';
        await updateCampaign(id, { status: newStatus });
        toast.success('Statut de la campagne mis à jour');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const duplicateCampaign = async (campaign: any) => {
    try {
      await createCampaign({
        name: `${campaign.name} (Copie)`,
        description: campaign.description,
        status: 'draft',
        budget: campaign.budget,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        target_audience: campaign.target_audience || {},
        ad_content: { 
          title: campaign.ad_content?.title || '', 
          description: campaign.ad_content?.description || '' 
        } as any
      });
      toast.success('Campagne dupliquée');
    } catch (error) {
      toast.error('Erreur lors de la duplication');
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      await deleteCampaign(id);
      if (selectedCampaign?.id === id) {
        setSelectedCampaign(null);
      }
      toast.success('Campagne supprimée');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
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
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Campagnes Marketing
                  </h1>
                  <p className="text-muted-foreground">
                    Gérez et optimisez vos campagnes publicitaires
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouvelle Campagne
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget Total</p>
                    <p className="text-2xl font-bold">€{campaigns.reduce((sum, c) => sum + c.budget, 0)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Impressions</p>
                    <p className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Clics</p>
                    <p className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.clicks, 0)}</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                    <p className="text-2xl font-bold">{campaigns.reduce((sum, c) => sum + c.conversions, 0)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campaigns List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Campagnes</CardTitle>
                  <CardDescription>
                    Gérez vos campagnes publicitaires
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedCampaign?.id === campaign.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedCampaign(campaign as any)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{campaign.name}</h4>
                        <div className="flex items-center gap-1">
                          <Badge variant={statusColors[campaign.status]}>
                            {statusLabels[campaign.status]}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCampaign(campaign);
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
                              toggleCampaignStatus(campaign.id);
                            }}
                          >
                            {campaign.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateCampaign(campaign);
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Supprimer cette campagne ?')) {
                                handleDeleteCampaign(campaign.id);
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {campaign.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Budget: €{campaign.budget}</span>
                          <span>Dépensé: €{campaign.spent}</span>
                        </div>
                        <Progress 
                          value={(campaign.spent / campaign.budget) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>{campaign.impressions} vues</span>
                        <span>{campaign.clicks} clics</span>
                      </div>
                    </div>
                  ))}

                  {isCreating && (
                    <Card className="border-dashed">
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <Label htmlFor="campaignName">Nom de la campagne</Label>
                          <Input
                            id="campaignName"
                            value={newCampaign.name}
                            onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Promotion Mariages"
                          />
                        </div>
                        <div>
                          <Label htmlFor="campaignDescription">Description</Label>
                          <Textarea
                            id="campaignDescription"
                            value={newCampaign.description}
                            onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Description de la campagne"
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor="budget">Budget (€)</Label>
                          <Input
                            id="budget"
                            type="number"
                            value={newCampaign.budget}
                            onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                            placeholder="100"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleCreateCampaign} size="sm">Créer</Button>
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

            {/* Campaign Details */}
            <div className="lg:col-span-2">
              {selectedCampaign ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {selectedCampaign.name}
                          <Badge variant={statusColors[selectedCampaign.status]}>
                            {statusLabels[selectedCampaign.status]}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{selectedCampaign.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => duplicateCampaign(selectedCampaign)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleCampaignStatus(selectedCampaign.id)}
                        >
                          {selectedCampaign.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCampaign(selectedCampaign.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="performance">
                      <TabsList>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="audience">Audience</TabsTrigger>
                        <TabsTrigger value="creative">Créatif</TabsTrigger>
                        <TabsTrigger value="settings">Paramètres</TabsTrigger>
                      </TabsList>

                      <TabsContent value="performance" className="space-y-6">
                        {/* Budget Progress */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Budget</h4>
                            <span className="text-sm text-muted-foreground">
                              €{selectedCampaign.spent} / €{selectedCampaign.budget}
                            </span>
                          </div>
                          <Progress 
                            value={(selectedCampaign.spent / selectedCampaign.budget) * 100} 
                            className="h-3"
                          />
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                  {selectedCampaign.impressions.toLocaleString()}
                                </div>
                                <p className="text-sm text-muted-foreground">Impressions</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                  {selectedCampaign.clicks}
                                </div>
                                <p className="text-sm text-muted-foreground">Clics</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                  {calculateCTR(selectedCampaign.clicks, selectedCampaign.impressions)}%
                                </div>
                                <p className="text-sm text-muted-foreground">CTR</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                  €{calculateCPC(selectedCampaign.spent, selectedCampaign.clicks)}
                                </div>
                                <p className="text-sm text-muted-foreground">CPC</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Conversions */}
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium">Conversions</h5>
                                <p className="text-sm text-muted-foreground">
                                  Taux de conversion: {calculateConversionRate(selectedCampaign.conversions, selectedCampaign.clicks)}%
                                </p>
                              </div>
                              <div className="text-3xl font-bold text-green-600">
                                {selectedCampaign.conversions}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                       <TabsContent value="audience" className="space-y-4">
                        <h4 className="font-medium">Audience cible</h4>
                        <div className="space-y-4">
                          <div>
                            <Label>Tranche d'âge</Label>
                            <p className="text-sm text-muted-foreground">
                              {(selectedCampaign.targetAudience?.ageRange || selectedCampaign.target_audience?.ageRange) || 'Non défini'}
                            </p>
                          </div>
                          <div>
                            <Label>Localisation</Label>
                            <p className="text-sm text-muted-foreground">
                              {(selectedCampaign.targetAudience?.location || selectedCampaign.target_audience?.location) || 'Non définie'}
                            </p>
                          </div>
                          <div>
                            <Label>Centres d'intérêt</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {(selectedCampaign.targetAudience?.interests || selectedCampaign.target_audience?.interests || []).map((interest, index) => (
                                <Badge key={index} variant="outline">
                                  {interest}
                                </Badge>
                              ))}
                              {((selectedCampaign.targetAudience?.interests || selectedCampaign.target_audience?.interests || []).length === 0) && (
                                <p className="text-sm text-muted-foreground">Aucun centre d'intérêt défini</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                       <TabsContent value="creative" className="space-y-4">
                        <h4 className="font-medium">Contenu publicitaire</h4>
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <Label>Titre</Label>
                                <p className="text-sm font-medium">
                                  {(selectedCampaign.adContent?.title || selectedCampaign.ad_content?.title) || 'Titre non défini'}
                                </p>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <p className="text-sm text-muted-foreground">
                                  {(selectedCampaign.adContent?.description || selectedCampaign.ad_content?.description) || 'Description non définie'}
                                </p>
                              </div>
                              <div>
                                <Label>Image</Label>
                                {(selectedCampaign.adContent?.image || selectedCampaign.ad_content?.image) ? (
                                  <img 
                                    src={selectedCampaign.adContent?.image || selectedCampaign.ad_content?.image} 
                                    alt="Ad creative"
                                    className="w-full max-w-md rounded-lg border"
                                  />
                                ) : (
                                  <p className="text-sm text-muted-foreground">Aucune image</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                       <TabsContent value="settings" className="space-y-4">
                        <h4 className="font-medium">Paramètres de la campagne</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Date de début</Label>
                            <p className="text-sm text-muted-foreground">
                              {(selectedCampaign.startDate || selectedCampaign.start_date) 
                                ? new Date(selectedCampaign.startDate || selectedCampaign.start_date!).toLocaleDateString()
                                : 'Non définie'}
                            </p>
                          </div>
                          <div>
                            <Label>Date de fin</Label>
                            <p className="text-sm text-muted-foreground">
                              {(selectedCampaign.endDate || selectedCampaign.end_date)
                                ? new Date(selectedCampaign.endDate || selectedCampaign.end_date!).toLocaleDateString()
                                : 'Non définie'}
                            </p>
                          </div>
                          <div>
                            <Label>Budget total</Label>
                            <p className="text-sm text-muted-foreground">
                              €{selectedCampaign.budget}
                            </p>
                          </div>
                          <div>
                            <Label>Statut</Label>
                            <Badge variant={statusColors[selectedCampaign.status]}>
                              {statusLabels[selectedCampaign.status]}
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Sélectionnez une campagne
                    </h3>
                    <p className="text-muted-foreground">
                      Choisissez une campagne dans la liste pour voir ses détails ou créez-en une nouvelle
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <EditCampaignDialog
          campaign={editingCampaign}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={updateCampaign}
        />
      </PageTransition>
    </DashboardLayout>
  );
};

export default MarketingCampaigns;