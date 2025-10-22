
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PageTransition from '@/components/PageTransition';
import RecentEventsSection from '@/components/events/RecentEventsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';
import MCCarousel from '@/components/mc/MCCarousel';
import BackToTop from '@/components/ui/BackToTop';
import SEO from '@/components/common/SEO';

const Index: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <PageTransition>
      <SEO 
        title="Invitopia - Plateforme de gestion d'événements professionnelle"
        description="Créez et gérez vos événements facilement avec Invitopia. Invitations digitales, gestion des invités, RSVP en ligne, maîtres de cérémonie certifiés. Solution tout-en-un pour mariages, conférences, anniversaires et événements d'entreprise."
        keywords="invitopia, événements, invitations, gestion événements, RSVP, invitations digitales, organisateur événements, mariage, anniversaire, conférence, maîtres de cérémonie, MC, événementiel, plateforme événements"
      />
      <div className="min-h-screen">
        <Navbar transparent />
        
        <main>
          <Hero />
          <Features />
          
          {/* Recent Public Events Section */}
          <RecentEventsSection />

          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Section Maîtres de Cérémonie */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Nos Maîtres de Cérémonie
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Découvrez nos professionnels expérimentés pour animer vos événements avec style et expertise
                </p>
              </div>
              <MCCarousel />
            </div>
          </section>

          {/* Pricing Section */}
          <PricingSection />

          {/* CTA Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />
        
        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Index;
