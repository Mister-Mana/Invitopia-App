import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import BadgeManagement from '@/components/admin/BadgeManagement';

const BadgeManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <BadgeManagement />
    </DashboardLayout>
  );
};

export default BadgeManagementPage;