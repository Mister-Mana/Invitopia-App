import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Shield, Sparkles, Globe2, UserCog, CalendarDays, Mic } from 'lucide-react';
import DashboardSidebarNavigation from './DashboardSidebarNavigation';
import DashboardSidebarAdmin, { AdminItem } from './DashboardSidebarAdmin';
import DashboardSidebarProfile from './DashboardSidebarProfile';

const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Gestion des liens d'admin en fonction du rôle utilisateur
  const adminItems: AdminItem[] = [];
  if (user?.role === 'admin' || user?.role === 'super_admin') {
    adminItems.push(
      {
        name: 'Administration',
        href: '/admin/content',
        icon: Shield,
        current: isActive('/admin/content')
      },
      {
        name: 'Gestion des MC',
        href: '/admin/mc-management',
        icon: Mic,
        current: isActive('/admin/mc-management')
      }
    );
  }
  if (user?.role === 'super_admin') {
    adminItems.push(
      {
        name: 'Contenu Public',
        href: '/admin/public-content',
        icon: Globe2,
        current: isActive('/admin/public-content')
      },
      {
        name: 'Super Admin',
        href: '/admin/super',
        icon: Sparkles,
        current: isActive('/admin/super')
      }
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-invitopia-600" />
          <span className="text-xl font-bold text-invitopia-900">Invitopia</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <DashboardSidebarNavigation isActive={isActive} userRole={user?.role} />
        <DashboardSidebarAdmin adminItems={adminItems} />
      </nav>

      {/* User Profile + Logout */}
      <DashboardSidebarProfile user={user} handleLogout={handleLogout} />
    </div>
  );
};

export default DashboardSidebar;
