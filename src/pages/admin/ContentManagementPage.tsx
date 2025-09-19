import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ContentManagement from '@/components/admin/ContentManagement';

const ContentManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ContentManagement />
    </DashboardLayout>
  );
};

export default ContentManagementPage;