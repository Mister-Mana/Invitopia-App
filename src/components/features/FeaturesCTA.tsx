
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-invitopia-900 mb-6">
          {t('pages.features.cta.title')}
        </h2>
        <p className="text-invitopia-600 mb-10 text-lg">
          {t('pages.features.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-invitopia-700 hover:bg-invitopia-600 text-white"
            asChild
          >
            <Link to="/signup">
              {t('pages.features.cta.signUp')}
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-invitopia-200"
            asChild
          >
            <Link to="/pricing">
              {t('pages.features.cta.viewPricing')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCTA;
