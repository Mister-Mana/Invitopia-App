
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export interface AdminItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

interface DashboardSidebarAdminProps {
  adminItems: AdminItem[];
}

const DashboardSidebarAdmin: React.FC<DashboardSidebarAdminProps> = ({ adminItems }) => {
  const { t } = useLanguage();
  
  if (adminItems.length === 0) return null;
  return (
    <>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="px-2 py-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {t('admin.title') || 'Administration'}
        </h3>
      </div>
      {adminItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            item.current
              ? 'bg-red-100 text-red-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200'
          )}
        >
          <item.icon
            className={cn(
              item.current ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 flex-shrink-0 h-5 w-5'
            )}
            aria-hidden={true}
          />
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
};

export default DashboardSidebarAdmin;
