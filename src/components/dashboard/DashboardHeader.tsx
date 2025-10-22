
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';

const DashboardHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-invitopia-900">{t('dashboard.title')}</h1>
        <p className="text-invitopia-600 mt-1">{t('dashboard.subtitle')}</p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <NotificationsPanel />
        <Button 
          className="bg-invitopia-700 hover:bg-invitopia-600" 
          asChild
        >
          <Link to="/create-event">
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.newEvent')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
