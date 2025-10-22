import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SEO from '@/components/common/SEO';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/ui/BackToTop';
import PricingCard from '@/components/pricing/PricingCard';
import PricingFAQ from '@/components/pricing/PricingFAQ';

interface PricingFeature {
  title: string;
  free: boolean | string;
  premium: boolean | string;
  business: boolean | string;
  tooltip?: string;
}

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingFeatures: PricingFeature[] = [
    {
      title: t('pages.pricing.features.guests'),
      free: '50',
      premium: '200',
      business: t('pages.pricing.unlimited'),
      tooltip: t('pages.pricing.tooltips.guests')
    },
    {
      title: t('pages.pricing.features.invitationChannels'),
      free: t('pages.pricing.features.emailOnly'),
      premium: t('pages.pricing.features.emailAndSms'),
      business: t('pages.pricing.features.allChannels'),
      tooltip: t('pages.pricing.tooltips.channels')
    },
    {
      title: t('pages.pricing.features.templates'),
      free: '10',
      premium: '50+',
      business: t('pages.pricing.unlimited'),
      tooltip: t('pages.pricing.tooltips.templates')
    },
    {
      title: t('pages.pricing.features.rsvpTracking'),
      free: true,
      premium: true,
      business: true
    },
    {
      title: t('pages.pricing.features.customizableDesigns'),
      free: t('pages.pricing.features.basic'),
      premium: t('pages.pricing.features.advanced'),
      business: t('pages.pricing.features.complete'),
      tooltip: t('pages.pricing.tooltips.designs')
    },
    {
      title: t('pages.pricing.features.analytics'),
      free: t('pages.pricing.features.basic'),
      premium: t('pages.pricing.features.advanced'),
      business: t('pages.pricing.features.complete'),
      tooltip: t('pages.pricing.tooltips.analytics')
    },
    {
      title: t('pages.pricing.features.reminders'),
      free: false,
      premium: true,
      business: true
    },
    {
      title: t('pages.pricing.features.mobileApp'),
      free: t('pages.pricing.features.readOnly'),
      premium: t('pages.pricing.features.fullAccess'),
      business: t('pages.pricing.features.fullAccess')
    },
    {
      title: t('pages.pricing.features.support'),
      free: t('pages.pricing.features.emailSupport'),
      premium: t('pages.pricing.features.prioritySupport'),
      business: t('pages.pricing.features.dedicatedSupport'),
      tooltip: t('pages.pricing.tooltips.support')
    },
    {
      title: t('pages.pricing.features.apiAccess'),
      free: false,
      premium: false,
      business: true,
      tooltip: t('pages.pricing.tooltips.api')
    },
    {
      title: t('pages.pricing.features.customBranding'),
      free: false,
      premium: false,
      business: true
    },
    {
      title: t('pages.pricing.features.userRoles'),
      free: false,
      premium: '2',
      business: '5+',
      tooltip: t('pages.pricing.tooltips.roles')
    }
  ];

  return (
    <PageTransition>
      <SEO 
        title="Tarifs et Plans - Invitopia"
        description="Découvrez nos plans tarifaires adaptés à tous vos besoins : plan gratuit, premium et business. Créez et gérez vos événements avec Invitopia à partir de 0€."
        keywords="tarifs invitopia, prix événements, abonnement événements, plan gratuit, plan premium, plan business, pricing"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Header */}
          <div className="container mx-auto px-6 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-invitopia-900 mb-4">
              {t('pages.pricing.title')}
            </h1>
            <p className="text-xl text-invitopia-600 max-w-3xl mx-auto">
              {t('pages.pricing.subtitle')}
            </p>
            
            {/* Billing Toggle */}
            <div className="mt-8 flex justify-center">
              <Tabs
                value={billingCycle}
                onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
                className="w-auto"
              >
                <TabsList className="grid w-[400px] grid-cols-2">
                  <TabsTrigger value="monthly">{t('pages.pricing.monthly')}</TabsTrigger>
                  <TabsTrigger value="yearly">
                    <span>{t('pages.pricing.yearly')}</span>
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                      -20%
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                name={t('pages.pricing.plans.free.name')}
                description={t('pages.pricing.plans.free.description')}
                price={t('pages.pricing.plans.free.price')}
                priceFC="0 FC"
                billingCycle={billingCycle}
                features={pricingFeatures.map(f => ({
                  title: f.title,
                  value: f.free,
                  tooltip: f.tooltip
                }))}
                buttonText={t('pages.pricing.plans.free.cta')}
                buttonLink="/signup"
              />
              
              <PricingCard
                name={t('pages.pricing.plans.premium.name')}
                description={t('pages.pricing.plans.premium.description')}
                price={billingCycle === 'monthly' ? t('pages.pricing.plans.premium.price.monthly') : t('pages.pricing.plans.premium.price.yearly')}
                priceFC={billingCycle === 'monthly' ? '47,500 FC' : '38,000 FC'}
                billingCycle={billingCycle}
                features={pricingFeatures.map(f => ({
                  title: f.title,
                  value: f.premium,
                  tooltip: f.tooltip
                }))}
                buttonText={t('pages.pricing.plans.premium.cta')}
                buttonLink="/signup?plan=premium"
                isRecommended
              />
              
              <PricingCard
                name={t('pages.pricing.plans.business.name')}
                description={t('pages.pricing.plans.business.description')}
                price={billingCycle === 'monthly' ? t('pages.pricing.plans.business.price.monthly') : t('pages.pricing.plans.business.price.yearly')}
                priceFC={billingCycle === 'monthly' ? '122,500 FC' : '98,000 FC'}
                billingCycle={billingCycle}
                features={pricingFeatures.map(f => ({
                  title: f.title,
                  value: f.business,
                  tooltip: f.tooltip
                }))}
                buttonText={t('pages.pricing.plans.business.cta')}
                buttonLink="/contact"
              />
            </div>
          </div>

          <PricingFAQ />
          
          {/* CTA Section */}
          <div className="container mx-auto px-6 mt-20">
            <div className="rounded-lg bg-gradient-to-r from-invitopia-800 to-invitopia-700 py-12 px-8 md:py-16 md:px-12 text-white text-center shadow-xl">
              <h2 className="text-3xl font-bold mb-4">
                {t('pages.pricing.cta.title')}
              </h2>
              <p className="text-invitopia-100 mb-8 max-w-2xl mx-auto">
                {t('pages.pricing.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-invitopia-800 hover:bg-invitopia-50"
                  asChild
                >
                  <Link to="/signup">
                    {t('pages.pricing.cta.getStarted')}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/contact">
                    {t('pages.pricing.cta.contact')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Pricing;
