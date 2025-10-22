
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SEO from '@/components/common/SEO';
import EventManager from '@/components/events/EventManager';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarTrigger } from '@/components/ui/sidebar/sidebar-core';

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Connexion requise
            </h3>
            <p className="text-gray-500">
              Vous devez être connecté pour voir vos événements.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SEO 
        title="Mes Événements - Invitopia"
        description="Gérez tous vos événements : créez, modifiez et suivez vos invitations et confirmations de présence."
        keywords="gestion événements, mes événements, créer événement, invitations"
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('events.myEvents')}</h1>
            <p className="text-muted-foreground">{t('events.manageEvents')}</p>
          </div>
        </div>
        
        <EventManager />
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;
