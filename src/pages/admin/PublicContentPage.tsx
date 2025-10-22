import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PublicContentManager from '@/components/admin/PublicContentManager';

const PublicContentPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PublicContentManager />
    </DashboardLayout>
  );
};

export default PublicContentPage;