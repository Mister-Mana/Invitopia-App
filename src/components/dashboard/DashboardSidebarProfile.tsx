
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
        className="w-full mt-3 text-xs flex items-center justify-center gap-2"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {t('auth.logout')}
      </Button>
    </div>
  );
};

export default DashboardSidebarProfile;
