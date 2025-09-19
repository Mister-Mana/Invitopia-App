
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const InvitationsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invitations</h1>
          <p className="text-gray-600">Gérer et envoyer vos invitations</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">La page des invitations sera bientôt disponible.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvitationsPage;
