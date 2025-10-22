import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PaymentsOverview from '@/components/admin/PaymentsOverview';
import SEO from '@/components/common/SEO';
import PageTransition from '@/components/PageTransition';

const PaymentsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <SEO 
        title="Gestion des Paiements - Admin"
        description="Vue d'ensemble et gestion de tous les paiements et transactions"
      />
      <PageTransition>
        <PaymentsOverview />
      </PageTransition>
    </DashboardLayout>
  );
};

export default PaymentsPage;
