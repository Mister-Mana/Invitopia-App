
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const AdminPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Administration</h1>
          <p className="text-gray-600">Panneau d'administration</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Le panneau d'administration sera bientôt disponible.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
