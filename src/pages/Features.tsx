
import React from 'react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/common/SEO';
import {
  Calendar, Mail, BarChart3, Users, FileText, Bell, 
  CheckCircle2, Shield, Smartphone, Zap, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/ui/BackToTop';
import FeaturesHero from '@/components/features/FeaturesHero';
import FeatureCard from '@/components/features/FeatureCard';
import FeaturesTestimonial from '@/components/features/FeaturesTestimonial';
import FeaturesCTA from '@/components/features/FeaturesCTA';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const { t } = useLanguage();

  const mainFeatures: FeatureItem[] = [
    {
      icon: <Calendar className="h-10 w-10 text-invitopia-500" />,
      title: t('pages.features.eventManagement.title'),
      description: t('pages.features.eventManagement.description')
    },
    {
      icon: <Mail className="h-10 w-10 text-invitopia-500" />,
      title: t('pages.features.invitations.title'),
      description: t('pages.features.invitations.description')
    },
    {
      icon: <FileText className="h-10 w-10 text-invitopia-500" />,
      title: t('pages.features.templates.title'),
      description: t('pages.features.templates.description')
    },
    {
      icon: <Users className="h-10 w-10 text-invitopia-500" />,
      title: t('pages.features.guestManagement.title'),
      description: t('pages.features.guestManagement.description')
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-invitopia-500" />,
      title: t('pages.features.analytics.title'),
      description: t('pages.features.analytics.description')
    },
    {
      icon: <Bell className="h-10 w-10 text-invitopia-500" />,
      title: t('pages.features.reminders.title'),
      description: t('pages.features.reminders.description')
    }
  ];

  const additionalFeatures: FeatureItem[] = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-invitopia-500" />,
      title: t('pages.features.rsvp.title'),
      description: t('pages.features.rsvp.description')
    },
    {
      icon: <Shield className="h-6 w-6 text-invitopia-500" />,
      title: t('pages.features.security.title'),
      description: t('pages.features.security.description')
    },
    {
      icon: <Smartphone className="h-6 w-6 text-invitopia-500" />,
      title: t('pages.features.mobileApp.title'),
      description: t('pages.features.mobileApp.description')
    },
    {
      icon: <Zap className="h-6 w-6 text-invitopia-500" />,
      title: t('pages.features.integration.title'),
      description: t('pages.features.integration.description')
    }
  ];

  return (
    <PageTransition>
      <SEO 
        title="Fonctionnalités - Invitopia"
        description="Découvrez toutes les fonctionnalités d'Invitopia : gestion d'événements, invitations digitales, RSVP en ligne, statistiques, QR codes, et bien plus encore."
        keywords="fonctionnalités invitopia, gestion événements, invitations digitales, RSVP, QR codes, statistiques événements, calendrier événements"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <FeaturesHero />
          
          {/* Main Features */}
          <div className="container mx-auto px-6 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-invitopia-900 mb-4">
                {t('pages.features.main.title')}
              </h2>
              <p className="text-invitopia-600 max-w-2xl mx-auto">
                {t('pages.features.main.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          
          {/* Showcase Section */}
          <div className="bg-invitopia-50 py-20 mb-20">
            <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-invitopia-900 mb-6">
                    {t('pages.features.showcase.title')}
                  </h2>
                  <p className="text-invitopia-600 mb-8">
                    {t('pages.features.showcase.description')}
                  </p>
                  
                  <div className="space-y-6">
                    {additionalFeatures.map((feature, index) => (
                      <div key={index} className="flex">
                        <div className="mt-1 mr-4">{feature.icon}</div>
                        <div>
                          <h3 className="font-semibold text-invitopia-800 mb-1">{feature.title}</h3>
                          <p className="text-invitopia-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className="mt-10 bg-invitopia-700 hover:bg-invitopia-600 text-white group"
                    asChild
                  >
                    <Link to="/signup">
                      {t('pages.features.showcase.cta')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                      alt="Invitopia Dashboard" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Use Cases */}
          <div className="container mx-auto px-6 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-invitopia-900 mb-4">
                {t('pages.features.useCases.title')}
              </h2>
              <p className="text-invitopia-600 max-w-2xl mx-auto">
                {t('pages.features.useCases.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['wedding', 'corporate', 'birthday', 'conference', 'fundraiser', 'reunion'].map((useCase) => (
                <div key={useCase} className="bg-invitopia-50 rounded-lg p-6 border border-invitopia-100">
                  <h3 className="text-xl font-semibold text-invitopia-900 mb-3">
                    {t(`pages.features.useCases.${useCase}.title`)}
                  </h3>
                  <p className="text-invitopia-600 mb-4">
                    {t(`pages.features.useCases.${useCase}.description`)}
                  </p>
                  <Button 
                    variant="link" 
                    className="text-invitopia-700 hover:text-invitopia-600 p-0 h-auto font-medium"
                    asChild
                  >
                    <Link to={`/templates?category=${useCase}`}>
                      {t('pages.features.useCases.viewTemplates')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <FeaturesTestimonial />
          <FeaturesCTA />
        </main>

        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Features;
