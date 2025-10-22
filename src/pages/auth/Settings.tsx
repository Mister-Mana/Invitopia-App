
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Globe, Bell, Shield, Palette, Award } from 'lucide-react';
import SettingsLayout from '@/components/settings/SettingsLayout';
import GeneralSettings from '@/components/settings/GeneralSettings';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import AdminSettings from '@/components/settings/AdminSettings';
import CertificationSettings from '@/components/settings/CertificationSettings';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/shared/AppSidebar';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Function to check if user has access to a specific setting section
  const hasAccess = (requiredRole: 'super_admin' | 'admin' | 'organizer') => {
    if (!user) return false;
    
    if (user.role === 'super_admin') return true;
    if (user.role === 'admin' && (requiredRole === 'admin' || requiredRole === 'organizer')) return true;
    if (user.role === 'organizer' && requiredRole === 'organizer') return true;
    
    return false;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-invitopia-50">
        <AppSidebar type="settings" />
        <SettingsLayout title={t('settings.title')}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-8 flex-wrap justify-start">
              <TabsTrigger value="general" className="flex-1">
                <Globe className="h-4 w-4 mr-2" />
                {t('settings.general')}
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex-1">
                {t('settings.profile')}
              </TabsTrigger>
              <TabsTrigger value="certification" className="flex-1">
                <Award className="h-4 w-4 mr-2" />
                {t('settings.certification')}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                {t('settings.notifications')}
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex-1">
                <Palette className="h-4 w-4 mr-2" />
                {t('settings.appearance')}
              </TabsTrigger>
              {hasAccess('admin') && (
                <TabsTrigger value="admin" className="flex-1">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('settings.admin')}
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="certification">
              <CertificationSettings />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
            
            {hasAccess('admin') && (
              <TabsContent value="admin">
                <AdminSettings hasAccess={hasAccess} />
              </TabsContent>
            )}
          </Tabs>
        </SettingsLayout>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
