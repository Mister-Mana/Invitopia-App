import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  TrendingUp, 
  Plus, 
  Search, 
  Eye,
  Play,
  Pause,
  BarChart3,
  Target,
  Calendar,
  Euro,
  Users,
  MousePointer,
  Heart,
  Share2,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

interface Campaign {
  id: string;
  name: string;
  description: string;
  event_id?: string;
  event_name?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  target_audience: {
    age_range: [number, number];
    interests: string[];
    location: string[];
    gender: 'all' | 'male' | 'female';
  };
  ad_content: {
    title: string;
    description: string;
    image_url?: string;
    call_to_action: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cost_per_conversion: number;
  };
  start_date: string;
  end_date: string;
  created_at: string;
}

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Promotion Concert Jazz',
      description: 'Campagne de promotion pour le concert de jazz du 15 mars',
      event_id: 'event-1',
      event_name: 'Concert Jazz au Sunset',
      status: 'active',
      budget: 500,
      spent: 327.50,
      target_audience: {
        age_range: [25, 55],
        interests: ['jazz', 'musique', 'concerts', 'culture'],
        location: ['Paris', 'Île-de-France'],
        gender: 'all'
      },
      ad_content: {
        title: 'Concert Jazz Exceptionnel - 15 Mars',
        description: 'Découvrez une soirée jazz inoubliable avec les meilleurs artistes. Billets en vente limitée !',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
        call_to_action: 'Réserver maintenant'
      },
      metrics: {
        impressions: 15420,
        clicks: 892,
        conversions: 45,
        ctr: 5.8,
        cpc: 0.37,
        cost_per_conversion: 7.28
      },
      start_date: '2024-02-01',
      end_date: '2024-03-15',
      created_at: '2024-01-25'
    },
    {
      id: '2',
      name: 'Événement Corporate',
      description: 'Promotion pour l\'événement de networking professionnel',
      event_id: 'event-2',
      event_name: 'Networking Tech 2024',
      status: 'paused',
      budget: 800,
      spent: 234.80,
      target_audience: {
        age_range: [28, 45],
        interests: ['technologie', 'entrepreneuriat', 'networking', 'innovation'],
        location: ['Paris', 'Lyon', 'Marseille'],
        gender: 'all'
      },
      ad_content: {
        title: 'Networking Tech 2024 - Connectez-vous !',
        description: 'Rencontrez les leaders de la tech et développez votre réseau professionnel.',
        image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500',
        call_to_action: 'S\'inscrire'
      },
      metrics: {
        impressions: 8750,
        clicks: 456,
        conversions: 23,
        ctr: 5.2,
        cpc: 0.51,
        cost_per_conversion: 10.21
      },
      start_date: '2024-01-15',
      end_date: '2024-04-01',
      created_at: '2024-01-10'
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Form state for new campaign
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    budget: 200,
    target_audience: {
      age_range: [18, 65] as [number, number],
      interests: [] as string[],
      location: [] as string[],
      gender: 'all' as 'all' | 'male' | 'female'
    },
    ad_content: {
      title: '',
      description: '',
      call_to_action: 'En savoir plus'
    },
    start_date: '',
    end_date: ''
  });

  const handleCreateCampaign = async () => {
    if (!newCampaign.name.trim() || !newCampaign.ad_content.title.trim()) {
      toast.error('Le nom de la campagne et le titre de l\'annonce sont requis');
      return;
    }

    const campaign: Campaign = {
      id: `campaign-${Date.now()}`,
      name: newCampaign.name,
      description: newCampaign.description,
      status: 'draft',
      budget: newCampaign.budget,
      spent: 0,
      target_audience: newCampaign.target_audience,
      ad_content: newCampaign.ad_content,
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        cost_per_conversion: 0
      },
      start_date: newCampaign.start_date,
      end_date: newCampaign.end_date,
      created_at: new Date().toISOString()
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      name: '',
      description: '',
      budget: 200,
      target_audience: {
        age_range: [18, 65],
        interests: [],
        location: [],
        gender: 'all'
      },
      ad_content: {
        title: '',
        description: '',
        call_to_action: 'En savoir plus'
      },
      start_date: '',
      end_date: ''
    });
    setIsCreateOpen(false);
    toast.success('Campagne créée avec succès');
  };

  const handleToggleCampaign = (campaignId: string) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              status: campaign.status === 'active' ? 'paused' : 'active' as Campaign['status']
            }
          : campaign
      )
    );
    
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      toast.success(
        campaign.status === 'active' 
          ? 'Campagne mise en pause' 
          : 'Campagne activée'
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800">En pause</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Brouillon</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campagnes publicitaires</h1>
          <p className="text-gray-600 mt-1">Gérez vos campagnes Invitopia Ads</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Créer une campagne
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Campagnes actives</p>
                <p className="text-2xl font-bold text-gray-900">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget, 0))}
                </p>
              </div>
              <Euro className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dépenses totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.spent, 0))}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total conversions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0)}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une campagne..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList>
          <TabsTrigger value="campaigns">Toutes les campagnes</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {filteredCampaigns.length === 0 ? (
            <Card className="p-12 text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune campagne</h3>
              <p className="text-gray-500 mb-6">Créez votre première campagne publicitaire</p>
              <Button onClick={() => setIsCreateOpen(true)}>Créer une campagne</Button>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredCampaigns.map(campaign => (
                <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{campaign.name}</CardTitle>
                          {getStatusBadge(campaign.status)}
                        </div>
                        <CardDescription>{campaign.description}</CardDescription>
                        {campaign.event_name && (
                          <p className="text-sm text-blue-600 mt-1">
                            Événement: {campaign.event_name}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleCampaign(campaign.id)}
                          className={
                            campaign.status === 'active' 
                              ? 'text-yellow-600 hover:text-yellow-700' 
                              : 'text-green-600 hover:text-green-700'
                          }
                        >
                          {campaign.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Users className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                        <p className="text-sm text-gray-600">Impressions</p>
                        <p className="font-semibold">{campaign.metrics.impressions.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <MousePointer className="h-5 w-5 mx-auto text-green-600 mb-1" />
                        <p className="text-sm text-gray-600">Clics</p>
                        <p className="font-semibold">{campaign.metrics.clicks.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Heart className="h-5 w-5 mx-auto text-red-600 mb-1" />
                        <p className="text-sm text-gray-600">Conversions</p>
                        <p className="font-semibold">{campaign.metrics.conversions}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Euro className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                        <p className="text-sm text-gray-600">Dépensé</p>
                        <p className="font-semibold">{formatCurrency(campaign.spent)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Budget utilisé</span>
                          <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-4">
                        {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-8 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analyses détaillées</h3>
            <p className="text-gray-500">Les analyses avancées seront disponibles prochainement</p>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-8 text-center">
            <Settings className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Paramètres des campagnes</h3>
            <p className="text-gray-500">Configuration des paramètres globaux à venir</p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Campaign Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle campagne</DialogTitle>
            <DialogDescription>
              Configurez votre campagne publicitaire Invitopia
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nom de la campagne</label>
                <Input
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="Ex: Promotion Concert Jazz"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Budget (€)</label>
                <Input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                placeholder="Décrivez votre campagne..."
                className="mt-1"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Contenu publicitaire</h3>
              <div>
                <label className="text-sm font-medium">Titre de l'annonce</label>
                <Input
                  value={newCampaign.ad_content.title}
                  onChange={(e) => setNewCampaign({
                    ...newCampaign,
                    ad_content: { ...newCampaign.ad_content, title: e.target.value }
                  })}
                  placeholder="Titre accrocheur pour votre annonce"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description de l'annonce</label>
                <Textarea
                  value={newCampaign.ad_content.description}
                  onChange={(e) => setNewCampaign({
                    ...newCampaign,
                    ad_content: { ...newCampaign.ad_content, description: e.target.value }
                  })}
                  placeholder="Description de votre événement..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Appel à l'action</label>
                <Select
                  value={newCampaign.ad_content.call_to_action}
                  onValueChange={(value) => setNewCampaign({
                    ...newCampaign,
                    ad_content: { ...newCampaign.ad_content, call_to_action: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En savoir plus">En savoir plus</SelectItem>
                    <SelectItem value="Réserver maintenant">Réserver maintenant</SelectItem>
                    <SelectItem value="S'inscrire">S'inscrire</SelectItem>
                    <SelectItem value="Acheter des billets">Acheter des billets</SelectItem>
                    <SelectItem value="Rejoindre l'événement">Rejoindre l'événement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Audience cible</h3>
              <div>
                <label className="text-sm font-medium">Tranche d'âge: {newCampaign.target_audience.age_range[0]} - {newCampaign.target_audience.age_range[1]} ans</label>
                <Slider
                  value={newCampaign.target_audience.age_range}
                  onValueChange={(value) => setNewCampaign({
                    ...newCampaign,
                    target_audience: { ...newCampaign.target_audience, age_range: value as [number, number] }
                  })}
                  min={13}
                  max={80}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Genre</label>
                <Select
                  value={newCampaign.target_audience.gender}
                  onValueChange={(value: 'all' | 'male' | 'female') => setNewCampaign({
                    ...newCampaign,
                    target_audience: { ...newCampaign.target_audience, gender: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="male">Homme</SelectItem>
                    <SelectItem value="female">Femme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date de début</label>
                <Input
                  type="date"
                  value={newCampaign.start_date}
                  onChange={(e) => setNewCampaign({ ...newCampaign, start_date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date de fin</label>
                <Input
                  type="date"
                  value={newCampaign.end_date}
                  onChange={(e) => setNewCampaign({ ...newCampaign, end_date: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateCampaign}>Créer la campagne</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedCampaign?.name}</span>
              {selectedCampaign && getStatusBadge(selectedCampaign.status)}
            </DialogTitle>
            <DialogDescription>{selectedCampaign?.description}</DialogDescription>
          </DialogHeader>

          {selectedCampaign && (
            <div className="space-y-6">
              {/* Performance Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">Impressions</p>
                  <p className="text-xl font-bold">{selectedCampaign.metrics.impressions.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MousePointer className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">Clics</p>
                  <p className="text-xl font-bold">{selectedCampaign.metrics.clicks.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">CTR: {selectedCampaign.metrics.ctr}%</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Heart className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-xl font-bold">{selectedCampaign.metrics.conversions}</p>
                  <p className="text-xs text-gray-500">CPV: {formatCurrency(selectedCampaign.metrics.cost_per_conversion)}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Euro className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <p className="text-sm text-gray-600">Dépensé</p>
                  <p className="text-xl font-bold">{formatCurrency(selectedCampaign.spent)}</p>
                  <p className="text-xs text-gray-500">CPC: {formatCurrency(selectedCampaign.metrics.cpc)}</p>
                </div>
              </div>

              {/* Budget Progress */}
              <div>
                <h3 className="font-medium mb-3">Utilisation du budget</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Dépensé: {formatCurrency(selectedCampaign.spent)}</span>
                  <span>Budget: {formatCurrency(selectedCampaign.budget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((selectedCampaign.spent / selectedCampaign.budget) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {Math.round((selectedCampaign.spent / selectedCampaign.budget) * 100)}% utilisé
                </p>
              </div>

              {/* Campaign Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Contenu publicitaire</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Titre</p>
                      <p className="font-medium">{selectedCampaign.ad_content.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Description</p>
                      <p className="text-sm">{selectedCampaign.ad_content.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Appel à l'action</p>
                      <Badge variant="outline">{selectedCampaign.ad_content.call_to_action}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Audience cible</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Âge</p>
                      <p>{selectedCampaign.target_audience.age_range[0]} - {selectedCampaign.target_audience.age_range[1]} ans</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Genre</p>
                      <p className="capitalize">{selectedCampaign.target_audience.gender === 'all' ? 'Tous' : selectedCampaign.target_audience.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Centres d'intérêt</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCampaign.target_audience.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Localisation</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCampaign.target_audience.location.map((loc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {loc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignManagement;