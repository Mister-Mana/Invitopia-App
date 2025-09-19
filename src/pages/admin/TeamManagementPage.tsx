import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SuperAdminTeamManagement from '@/components/admin/SuperAdminTeamManagement';

const TeamManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <SuperAdminTeamManagement />
    </DashboardLayout>
  );
};

export default TeamManagementPage;