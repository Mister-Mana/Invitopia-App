
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  UserCog,
  CalendarDays,
  UsersIcon
} from 'lucide-react';

interface DashboardSidebarNavigationProps {
  isActive: (path: string) => boolean;
  userRole?: string;
}

const DashboardSidebarNavigation: React.FC<DashboardSidebarNavigationProps> = ({ isActive, userRole }) => {
  const { t } = useLanguage();

  const navigationItems = [
    {
      name: t('dashboard.sidebar.dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
      current: isActive('/dashboard')
    },
    {
      name: t('dashboard.sidebar.createEvent'),
      href: '/create-event',
      icon: Calendar,
      current: isActive('/create-event')
    },
    {
      name: "Mes événements",
      href: '/events',
      icon: CalendarDays,
      current: isActive('/events')
    },
    {
      name: t('dashboard.sidebar.contacts'),
      href: '/contacts',
      icon: Users,
      current: isActive('/contacts')
    },
    {
      name: t('dashboard.sidebar.templates'),
      href: '/templates',
      icon: FileText,
      current: isActive('/templates')
    },
    {
      name: 'Mon Profil',
      href: '/profile-new',
      icon: UserCog,
      current: isActive('/profile-new')
    },
    {
      name: t('dashboard.sidebar.settings'),
      href: '/settings',
      icon: Settings,
      current: isActive('/settings')
    }
  ];

  // Ajouter la gestion d'équipe pour les rôles appropriés
  if (userRole === 'organizer' || userRole === 'admin' || userRole === 'super_admin') {
    navigationItems.splice(5, 0, {
      name: 'Gestion d\'équipe',
      href: '/teams',
      icon: UsersIcon,
      current: isActive('/teams')
    });
  }

  return (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            item.current
              ? 'bg-invitopia-100 text-invitopia-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200'
          )}
        >
          <item.icon
            className={cn(
              item.current ? 'text-invitopia-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 flex-shrink-0 h-5 w-5'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardSidebarNavigation;
