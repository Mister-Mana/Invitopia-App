import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
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