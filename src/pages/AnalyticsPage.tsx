
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Analysez les performances de vos événements</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Les analyses détaillées seront bientôt disponibles.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
