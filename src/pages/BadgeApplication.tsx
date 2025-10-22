import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import BadgeApplicationForm from '@/components/badges/BadgeApplicationForm';
import CheckoutForm from '@/components/badges/CheckoutForm';
import SEO from '@/components/common/SEO';
import { Award } from 'lucide-react';

const BadgeApplication: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState({ name: '', price: 0 });

  const handleProceedToCheckout = (badgeName: string, price: number) => {
    setSelectedBadge({ name: badgeName, price });
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    // Redirect to dashboard or show success message
  };

  return (
    <DashboardLayout>
      <SEO 
        title="Demande de Certification Invitopia"
        description="Obtenez votre badge de certification officiel Invitopia et bénéficiez d'avantages exclusifs"
      />
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Demande de Certification Invitopia
            </h1>
            <p className="text-muted-foreground mt-1">
              Obtenez votre badge de certification officiel et bénéficiez d'avantages exclusifs
            </p>
          </div>
        </div>

        {showCheckout ? (
          <CheckoutForm
            badgeName={selectedBadge.name}
            price={selectedBadge.price}
            onSuccess={handleCheckoutSuccess}
            onCancel={() => setShowCheckout(false)}
          />
        ) : (
          <BadgeApplicationForm onProceedToCheckout={handleProceedToCheckout} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default BadgeApplication;
