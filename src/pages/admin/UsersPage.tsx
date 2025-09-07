
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { UserCheck, AlertTriangle } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';

const UsersPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const hasAccess = user?.role === 'admin' || user?.role === 'super_admin';

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Accès non autorisé</h3>
              <p className="text-gray-500">Vous n'avez pas l'autorisation d'accéder à cette section.</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-invitopia-800 mb-2 flex items-center gap-2">
          <UserCheck className="h-6 w-6" />
          Gestion des utilisateurs
        </h1>
        <p className="text-invitopia-600">
          Gérez les comptes utilisateurs et leurs permissions
        </p>
      </div>

      <UserManagement />
    </DashboardLayout>
  );
};

export default UsersPage;
