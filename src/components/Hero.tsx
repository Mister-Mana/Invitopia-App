
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '@/hooks/useSiteContent';

const HeroImageSection: React.FC = () => {
  const { content } = useSiteContent();
  const [heroImageUrl, setHeroImageUrl] = useState<string>('');

  useEffect(() => {
    // Rechercher l'image hero dans le contenu du site
    const heroContent = content.find(
      item => item.content_type === 'home_hero' && item.is_active
    );
    
    if (heroContent?.image_url) {
      setHeroImageUrl(heroContent.image_url);
    } else {
      // Image par défaut si aucune image n'est configurée
      setHeroImageUrl('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80');
    }
  }, [content]);

  return (
    <div className="relative z-10 glass-morphism rounded-2xl overflow-hidden shadow-xl">
      <img 
        src={heroImageUrl} 
        alt="Event Management Dashboard" 
        className="w-full h-auto object-cover" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-invitopia-900/40 to-transparent"></div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-invitopia-100 rounded-full blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 space-y-6 mb-12 md:mb-0">
            <div className="inline-block">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-50 text-invitopia-700 mb-4 animate-fade-in">
                Simplifiez l'organisation de vos événements
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-invitopia-900 leading-tight tracking-tight animate-slide-up [animation-delay:0.1s]">
              Créez des événements mémorables en toute simplicité
            </h1>
            
            <p className="text-lg text-invitopia-600 max-w-xl animate-slide-up [animation-delay:0.2s]">
              Invitopia vous permet de gérer vos invitations, suivre les réponses et organiser vos événements avec élégance et efficacité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-slide-up [animation-delay:0.3s]">
              <Button 
                size="lg" 
                className="bg-invitopia-700 hover:bg-invitopia-600 text-white shadow-lg hover:shadow-xl transition-all group"
                asChild
              >
                <Link to="/create-event">
                  Créer un événement
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-invitopia-200 hover:border-invitopia-300 text-invitopia-700"
                asChild
              >
                <Link to="/demo">
                  Voir une démo
                </Link>
              </Button>
            </div>
            
            <div className="pt-6 flex items-center text-sm text-invitopia-500 animate-fade-in [animation-delay:0.4s]">
              <span className="flex items-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 mr-1 text-invitopia-400">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10 17l6-5-6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                Déjà utilisé par plus de 1 000 organisations
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative animate-blur-in [animation-delay:0.3s]">
            <HeroImageSection />
            
            {/* Floating elements */}
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 glass-card rounded-xl p-4 animate-float shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-invitopia-800">RSVP Confirmé</p>
                  <p className="text-xs text-invitopia-500">Marie a accepté l'invitation</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 -right-4 glass-card rounded-xl p-4 max-w-[180px] animate-float [animation-delay:2s] shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-invitopia-800">86%</div>
                <p className="text-xs text-invitopia-500">Taux de réponse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
