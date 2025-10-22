import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SystemMonitoring from '@/components/admin/SystemMonitoring';

const MonitoringPage: React.FC = () => {
  return (
    <DashboardLayout>
      <SystemMonitoring />
    </DashboardLayout>
  );
};

export default MonitoringPage;