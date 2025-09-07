import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ApiIntegrationsManagement from '@/components/admin/ApiIntegrationsManagement';

const ApiIntegrationsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ApiIntegrationsManagement />
    </DashboardLayout>
  );
};

export default ApiIntegrationsPage;