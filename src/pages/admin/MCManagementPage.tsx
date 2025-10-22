import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MCManagement } from '@/components/admin/MCManagement';
import PageTransition from '@/components/PageTransition';

const MCManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-6">
          <MCManagement />
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default MCManagementPage;
