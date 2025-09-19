import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SuperAdminTeamManagement from '@/components/admin/SuperAdminTeamManagement';

const SuperAdminTeamPage: React.FC = () => {
  return (
    <DashboardLayout>
      <SuperAdminTeamManagement />
    </DashboardLayout>
  );
};

export default SuperAdminTeamPage;