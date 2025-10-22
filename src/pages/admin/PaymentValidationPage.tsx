import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { EnhancedPaymentManagement } from '@/components/admin/EnhancedPaymentManagement';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/common/SEO';

const PaymentValidationPage: React.FC = () => {
  return (
    <DashboardLayout>
      <SEO
        title="Gestion des Paiements - Admin"
        description="Tableau de bord avancé pour gérer et valider les paiements"
      />
      <PageTransition>
        <div className="container mx-auto px-4 py-6">
          <EnhancedPaymentManagement />
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default PaymentValidationPage;
