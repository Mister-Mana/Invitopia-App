
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-invitopia-900 mb-6">
        {t('pages.features.hero.title')}
      </h1>
      <p className="text-xl text-invitopia-600 max-w-3xl mx-auto mb-10">
        {t('pages.features.hero.subtitle')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-invitopia-700 hover:bg-invitopia-600 text-white"
          asChild
        >
          <Link to="/create-event">
            {t('pages.features.hero.cta')}
          </Link>
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-invitopia-200"
          asChild
        >
          <Link to="/demo">
            {t('pages.features.hero.demo')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturesHero;
