
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PricingFAQ: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-invitopia-900 mb-4">
          {t('pages.pricing.faq.title')}
        </h2>
        <p className="text-invitopia-600 max-w-2xl mx-auto">
          {t('pages.pricing.faq.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 border border-invitopia-100 shadow-sm">
            <h3 className="text-lg font-semibold text-invitopia-900 mb-3">
              {t(`pages.pricing.faq.q${i}`)}
            </h3>
            <p className="text-invitopia-600">
              {t(`pages.pricing.faq.a${i}`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingFAQ;
