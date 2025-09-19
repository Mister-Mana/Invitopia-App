import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PaymentValidation from '@/components/admin/PaymentValidation';

const PaymentsManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PaymentValidation />
    </DashboardLayout>
  );
};

export default PaymentsManagementPage;