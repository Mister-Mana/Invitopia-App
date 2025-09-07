import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OrganizationManagement from '@/components/admin/OrganizationManagement';

const OrganizationsManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <OrganizationManagement />
    </DashboardLayout>
  );
};

export default OrganizationsManagementPage;