import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  User,
  Plus,
  Settings,
  BarChart3,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileBottomNavbarProps {
  className?: string;
}

const MobileBottomNavbar: React.FC<MobileBottomNavbarProps> = ({ className }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Accueil',
      icon: Home,
      path: '/dashboard',
      color: 'text-blue-600'
    },
    {
      id: 'events',
      label: 'Événements',
      icon: Calendar,
      path: '/events',
      color: 'text-purple-600'
    },
    {
      id: 'create',
      label: 'Créer',
      icon: PlusCircle,
      path: '/events/create',
      color: 'text-green-600',
      isSpecial: true
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users,
      path: '/contacts',
      color: 'text-orange-600'
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      path: '/profile',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-1 safe-area-bottom",
      "md:hidden", // Hide on desktop
      className
    )}>
      <nav className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          if (item.isSpecial) {
            return (
              <Link key={item.id} to={item.path} className="p-2">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                    "bg-gradient-to-br from-primary to-primary-foreground shadow-lg",
                    "hover:shadow-xl transform hover:scale-105"
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-primary mt-1">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          }

          return (
            <Link key={item.id} to={item.path} className="p-2">
              <div className="flex flex-col items-center min-w-0">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                  active 
                    ? "bg-primary/10 shadow-sm" 
                    : "hover:bg-gray-100"
                )}>
                  <Icon className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    active 
                      ? "text-primary" 
                      : "text-gray-500"
                  )} />
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200 mt-1 truncate",
                  active 
                    ? "text-primary" 
                    : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNavbar;