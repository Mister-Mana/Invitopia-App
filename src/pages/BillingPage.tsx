
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const BillingPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Facturation</h1>
          <p className="text-gray-600">Gérez votre abonnement et vos paiements</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">La page de facturation sera bientôt disponible.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
