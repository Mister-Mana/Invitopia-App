
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const PricingSection: React.FC = () => {
  const { tNested } = useLanguage();
  
  // Define features arrays separately to avoid type errors
  const freePlanFeatures = [
    'common.home.pricing.freePlanFeatures.0',
    'common.home.pricing.freePlanFeatures.1',
    'common.home.pricing.freePlanFeatures.2',
    'common.home.pricing.freePlanFeatures.3',
    'common.home.pricing.freePlanFeatures.4'
  ];
  
  const premiumPlanFeatures = [
    'common.home.pricing.premiumPlanFeatures.0',
    'common.home.pricing.premiumPlanFeatures.1',
    'common.home.pricing.premiumPlanFeatures.2',
    'common.home.pricing.premiumPlanFeatures.3',
    'common.home.pricing.premiumPlanFeatures.4',
    'common.home.pricing.premiumPlanFeatures.5',
    'common.home.pricing.premiumPlanFeatures.6'
  ];
  
  const businessPlanFeatures = [
    'common.home.pricing.businessPlanFeatures.0',
    'common.home.pricing.businessPlanFeatures.1',
    'common.home.pricing.businessPlanFeatures.2',
    'common.home.pricing.businessPlanFeatures.3',
    'common.home.pricing.businessPlanFeatures.4',
    'common.home.pricing.businessPlanFeatures.5',
    'common.home.pricing.businessPlanFeatures.6',
    'common.home.pricing.businessPlanFeatures.7'
  ];
  
  // Use translation keys for the pricing plans with $ and FC pricing
  const pricingPlans = [
    {
      name: tNested('common.home.pricing.freePlan', 'Free'),
      price: '$0',
      priceFC: '0 FC',
      description: tNested('common.home.pricing.freePlanDescription', 'For small personal events'),
      features: freePlanFeatures,
      buttonText: tNested('common.home.pricing.freeButton', 'Start for free'),
      buttonLink: '/signup',
      highlighted: false
    },
    {
      name: tNested('common.home.pricing.premiumPlan', 'Premium'),
      price: '$19',
      priceFC: '47,500 FC',
      description: tNested('common.home.pricing.premiumPlanDescription', 'For important events'),
      features: premiumPlanFeatures,
      buttonText: tNested('common.home.pricing.trialButton', '14-day free trial'),
      buttonLink: '/signup?plan=premium',
      highlighted: true
    },
    {
      name: tNested('common.home.pricing.businessPlan', 'Business'),
      price: '$49',
      priceFC: '122,500 FC',
      description: tNested('common.home.pricing.businessPlanDescription', 'For organizations and businesses'),
      features: businessPlanFeatures,
      buttonText: tNested('common.home.pricing.contactButton', 'Contact sales team'),
      buttonLink: '/contact',
      highlighted: false
    }
  ];
  
  return (
    <section className="py-24 bg-invitopia-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-100 text-invitopia-700 mb-4 inline-block">
            {tNested('common.home.pricing.label', 'Pricing')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-invitopia-900 mb-4">
            {tNested('common.home.pricing.title', 'Simple, transparent pricing')}
          </h2>
          <p className="text-invitopia-600">
            {tNested('common.home.pricing.subtitle', 'Choose the plan that fits your needs')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl overflow-hidden transition-all duration-300",
                plan.highlighted
                  ? "border-2 border-invitopia-500 shadow-xl scale-105 z-10"
                  : "border border-invitopia-100 shadow-sm"
              )}
            >
              {plan.highlighted && (
                <div className="bg-invitopia-500 text-white text-center text-sm font-medium py-1">
                  {tNested('common.home.pricing.recommended', 'Recommended')}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-invitopia-800 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-extrabold text-invitopia-900">
                    {plan.price}
                  </span>
                  <span className="text-invitopia-500 ml-1">
                    {tNested('common.home.pricing.monthly', '/month')}
                  </span>
                </div>
                <div className="flex items-baseline mb-4">
                  <span className="text-lg font-bold text-invitopia-700">
                    {plan.priceFC}
                  </span>
                  <span className="text-invitopia-500 ml-1 text-sm">
                    {tNested('common.home.pricing.monthly', '/month')}
                  </span>
                </div>
                <p className="text-invitopia-600 text-sm mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {Array.isArray(plan.features) && plan.features.map((featureKey, idx) => (
                    <li key={idx} className="flex items-center text-invitopia-700 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-invitopia-500" />
                      {tNested(featureKey, `Feature ${idx + 1}`)}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full",
                    plan.highlighted
                      ? "bg-invitopia-700 hover:bg-invitopia-600 text-white"
                      : "bg-white border border-invitopia-300 text-invitopia-700 hover:bg-invitopia-50"
                  )}
                  asChild
                >
                  <Link to={plan.buttonLink}>
                    {plan.buttonText}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
