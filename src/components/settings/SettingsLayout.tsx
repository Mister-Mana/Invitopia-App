import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

interface SettingsLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      {/* Mobile header with hamburger menu */}
      <div className="flex items-center gap-4 md:hidden mb-4">
        <SidebarTrigger className="flex items-center justify-center">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Gérez vos préférences et paramètres
        </p>
      </div>
      {children}
    </div>
  );
};

export default SettingsLayout;