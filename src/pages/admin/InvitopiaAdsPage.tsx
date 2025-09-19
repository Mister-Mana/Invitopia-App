import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import InvitopiaAdsManagement from '@/components/admin/InvitopiaAdsManagement';

const InvitopiaAdsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <InvitopiaAdsManagement />
    </DashboardLayout>
  );
};

export default InvitopiaAdsPage;