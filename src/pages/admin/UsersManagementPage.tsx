import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UserManagement from '@/components/admin/UserManagement';

const UsersManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  );
};

export default UsersManagementPage;