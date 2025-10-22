import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Settings, Users, Shield } from 'lucide-react';

interface MenuConfig {
  organizer_menu: Record<string, boolean>;
  admin_menu: Record<string, boolean>;
}

const SuperAdminMenuConfig: React.FC = () => {
  const [config, setConfig] = useState<MenuConfig>({
    organizer_menu: {
      dashboard: true,
      events: true,
      contacts: true,
      teams: true,
      mc: true,
      venues: true,
      workflow: true,
      marketing: true,
      analytics: true,
      templates: false,
    },
    admin_menu: {
      dashboard: true,
      users: true,
      events: true,
      venues: true,
      mc: true,
      payments: true,
      content: true,
      monitoring: true,
      teams: true,
    }
  });

  const [loading, setLoading] = useState(false);

  const organizerMenuItems = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { key: 'events', label: 'Événements', icon: '🎉' },
    { key: 'contacts', label: 'Contacts', icon: '👥' },
    { key: 'teams', label: 'Équipes', icon: '🤝' },
    { key: 'mc', label: 'Maîtres de cérémonie', icon: '🎤' },
    { key: 'venues', label: 'Lieux et salles', icon: '🏛️' },
    { key: 'workflow', label: 'Workflows', icon: '⚙️' },
    { key: 'marketing', label: 'Campagnes marketing', icon: '📢' },
    { key: 'analytics', label: 'Analytiques', icon: '📈' },
    { key: 'templates', label: 'Modèles (désactivé)', icon: '📄' },
  ];

  const adminMenuItems = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { key: 'users', label: 'Utilisateurs', icon: '👤' },
    { key: 'events', label: 'Événements', icon: '🎉' },
    { key: 'venues', label: 'Lieux', icon: '🏛️' },
    { key: 'mc', label: 'Maîtres de cérémonie', icon: '🎤' },
    { key: 'payments', label: 'Paiements', icon: '💳' },
    { key: 'content', label: 'Contenu', icon: '📝' },
    { key: 'monitoring', label: 'Monitoring', icon: '🔍' },
    { key: 'teams', label: 'Équipes', icon: '🤝' },
  ];

  const toggleMenuItem = (menuType: 'organizer_menu' | 'admin_menu', key: string) => {
    setConfig(prev => ({
      ...prev,
      [menuType]: {
        ...prev[menuType],
        [key]: !prev[menuType][key]
      }
    }));
  };

  const saveConfiguration = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('app_configuration')
        .upsert({
          id: 'menu-config',
          app_title: 'Invitopia',
          meta_description: JSON.stringify(config),
          is_active: true
        });

      if (error) throw error;
      toast.success('Configuration enregistrée avec succès');
    } catch (error: any) {
      toast.error('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration des menus
          </CardTitle>
          <CardDescription>
            Gérez l'affichage des options de menu pour les organisateurs et administrateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="organizer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="organizer" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Menu Organisateur
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Menu Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="organizer" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {organizerMenuItems.map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <Label htmlFor={`org-${item.key}`} className="flex items-center gap-3 cursor-pointer">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          Afficher dans le menu des organisateurs
                        </div>
                      </div>
                    </Label>
                    <Switch
                      id={`org-${item.key}`}
                      checked={config.organizer_menu[item.key]}
                      onCheckedChange={() => toggleMenuItem('organizer_menu', item.key)}
                      disabled={item.key === 'templates'}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="grid gap-4">
                {adminMenuItems.map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <Label htmlFor={`admin-${item.key}`} className="flex items-center gap-3 cursor-pointer">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          Afficher dans le menu des administrateurs
                        </div>
                      </div>
                    </Label>
                    <Switch
                      id={`admin-${item.key}`}
                      checked={config.admin_menu[item.key]}
                      onCheckedChange={() => toggleMenuItem('admin_menu', item.key)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={saveConfiguration} disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer la configuration'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminMenuConfig;
