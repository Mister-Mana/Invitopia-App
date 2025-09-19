import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { 
  Menu, 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus,
  Zap,
  DollarSign,
  HelpCircle,
  Mail,
  Info,
  UsersIcon 
} from 'lucide-react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const publicLinks = [
    { to: '/', icon: Home, label: t('navbar.home') },
    { to: '/features', icon: Zap, label: t('navbar.features') },
    { to: '/pricing', icon: DollarSign, label: t('navbar.pricing') },
    { to: '/about', icon: Info, label: t('navbar.about') },
    { to: '/team', icon: UsersIcon, label: t('navbar.team') },
    { to: '/contact', icon: Mail, label: t('navbar.contact') },
  ];

  const dashboardLinks = [
    { to: '/dashboard', icon: Home, label: 'Tableau de bord' },
    { to: '/events', icon: Calendar, label: 'Événements' },
    { to: '/contacts', icon: Users, label: 'Contacts' },
    { to: '/templates', icon: Zap, label: 'Modèles' },
    { to: '/analytics', icon: DollarSign, label: 'Analytiques' },
  ];

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <>
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1 p-4">
        {user ? (
          <>
            {/* Dashboard Links */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboard
              </h3>
              {dashboardLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  <link.icon className="mr-3 h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Public Links */}
            <div className="space-y-1">
              <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Site
              </h3>
              {publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  <link.icon className="mr-3 h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <Separator className="my-4" />

            {/* User Actions */}
            <div className="space-y-1">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <User className="mr-3 h-4 w-4" />
                {t('navbar.profile')}
              </Link>
              <Link
                to="/settings"
                onClick={onClose}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <Settings className="mr-3 h-4 w-4" />
                Paramètres
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:text-red-900 hover:bg-red-50 transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                {t('navbar.logout')}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Public Links for non-authenticated users */}
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <link.icon className="mr-3 h-4 w-4" />
                {link.label}
              </Link>
            ))}

            <Separator className="my-4" />

            {/* Auth Actions */}
            <div className="space-y-1">
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-primary hover:bg-primary/10 transition-colors"
              >
                <LogIn className="mr-3 h-4 w-4" />
                {t('navbar.login')}
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <UserPlus className="mr-3 h-4 w-4" />
                {t('navbar.signup')}
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default SidebarMenu;