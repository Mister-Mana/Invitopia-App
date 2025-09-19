import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import VenueManagement from '@/components/admin/VenueManagement';

const VenuesManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <VenueManagement />
    </DashboardLayout>
  );
};

export default VenuesManagementPage;