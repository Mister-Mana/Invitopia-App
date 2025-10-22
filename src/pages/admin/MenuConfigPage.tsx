import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SuperAdminMenuConfig from '@/components/admin/SuperAdminMenuConfig';

const MenuConfigPage: React.FC = () => {
  return (
    <DashboardLayout>
      <SuperAdminMenuConfig />
    </DashboardLayout>
  );
};

export default MenuConfigPage;
