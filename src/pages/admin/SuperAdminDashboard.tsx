
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useUsers } from '@/hooks/useUsers';
import { useBadges } from '@/hooks/useBadges';
import { usePayments } from '@/hooks/usePayments';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Sparkles, 
  Settings, 
  Database, 
  Shield, 
  CreditCard, 
  AlertTriangle,
  Zap,
  Brain,
  Cpu,
  Globe,
  Wifi,
  Eye,
  Timer,
  Layers,
  Activity,
  BarChart3,
  Users,
  Building2,
  Globe2,
  FileText,
  Award,
  Palette
} from 'lucide-react';
import { toast } from 'sonner';
import ContentManagement from '@/components/admin/ContentManagement';
import BadgeManagement from '@/components/admin/BadgeManagement';
import ApiIntegrationsManager from '@/components/admin/ApiIntegrationsManager';

const SuperAdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { users } = useUsers();
  const { badges } = useBadges();
  const { payments } = usePayments();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEvents: 0,
    totalBadges: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer le nombre d'événements actifs
        const { count: eventsCount } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published');

        // Calculer les revenus du mois en cours
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const monthlyPayments = payments.filter(p => 
          p.status === 'completed' && 
          new Date(p.created_at) >= startOfMonth
        );

        const revenue = monthlyPayments.reduce((sum, p) => sum + (p.net_amount || p.amount), 0);

        setStats({
          totalUsers: users.length,
          activeEvents: eventsCount || 0,
          totalBadges: badges.filter(b => b.status === 'approved').length,
          monthlyRevenue: revenue
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (users.length > 0 || payments.length > 0) {
      fetchStats();
    }
  }, [users, payments, badges]);
  
  const [features, setFeatures] = useState({
    aiIntegration: false,
    smartRecommendations: false,
    predictiveAnalytics: false,
    automatedWorkflows: false,
    blockchainIntegration: false,
    iotConnectivity: false,
    augmentedReality: false,
    virtualEvents: false,
    quantumSecurity: false,
    neuralNetworkOptimization: false,
    holographicDisplay: false,
    mindControlInterface: false,
    timeDistortionEvents: false,
    multidimensionalPlanning: false,
    cosmicEventSynchronization: false
  });

  if (user?.role !== 'super_admin') {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Accès Interdit</h3>
              <p className="text-gray-500">Seuls les super administrateurs peuvent accéder à cette section.</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: enabled }));
    toast.success(enabled ? t('superAdmin.featureActivated') : t('superAdmin.featureDeactivated'));
  };

  const handleSystemAction = (action: string) => {
    toast.success(`${action} ${t('superAdmin.configurationSaved')}`);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-invitopia-800 mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6" />
          {t('superAdmin.sectionTitle')}
        </h1>
        <p className="text-invitopia-600">
          Contrôlez tous les aspects du système et activez des fonctionnalités avancées
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-8 grid grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            Contenu Public
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Intégrations API
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Avancé
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Utilisateurs Totaux</p>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Événements Actifs</p>
                    <p className="text-2xl font-bold">{stats.activeEvents.toLocaleString()}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Badges Attribués</p>
                    <p className="text-2xl font-bold">{stats.totalBadges.toLocaleString()}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenus du Mois</p>
                    <p className="text-2xl font-bold">€{stats.monthlyRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/admin/badges">
                  <Button className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Gérer les badges
                  </Button>
                </Link>
                <Link to="/admin/content">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Gérer le contenu
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button className="w-full justify-start" variant="outline">
                    <Palette className="h-4 w-4 mr-2" />
                    Bibliothèque de templates
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm">Nouveau badge attribué à John Doe</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm">Contenu publié: Nouvelle fonctionnalité</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-sm">API intégration activée</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Management */}
        <TabsContent value="content">
          <ContentManagement />
        </TabsContent>

        {/* Badge Management */}
        <TabsContent value="badges">
          <BadgeManagement />
        </TabsContent>

        {/* API Integrations */}
        <TabsContent value="integrations">
          <ApiIntegrationsManager />
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Gestion des Templates</h2>
              <p className="text-gray-600">Gérez la bibliothèque de templates Canva</p>
            </div>
            <Link to="/templates">
              <Button>
                <Palette className="h-4 w-4 mr-2" />
                Ouvrir la bibliothèque
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Templates Actifs</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <Layers className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Templates Utilisés</p>
                    <p className="text-2xl font-bold">2,456</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Templates Premium</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Features */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités Révolutionnaires</CardTitle>
              <CardDescription>
                Activez les technologies de pointe pour Invitopia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(features).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => handleFeatureToggle(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
