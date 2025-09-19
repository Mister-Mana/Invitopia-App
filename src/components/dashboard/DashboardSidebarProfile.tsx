
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardSidebarProfileProps {
  user: any;
  handleLogout: () => void;
}

const DashboardSidebarProfile: React.FC<DashboardSidebarProfileProps> = ({ user, handleLogout }) => {
  const { t } = useLanguage();

  return (
    <div className="flex-shrink-0 p-4 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-invitopia-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-invitopia-600" />
          </div>
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name || user?.email}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user?.email}
          </p>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="w-full mt-3 text-xs"
      >
        {t('dashboard.sidebar.logout')}
      </Button>
    </div>
  );
};

export default DashboardSidebarProfile;
