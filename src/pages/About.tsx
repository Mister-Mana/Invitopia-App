
import React from 'react';
import Navbar from '@/components/Navbar';
import SEO from '@/components/common/SEO';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/ui/BackToTop';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <PageTransition>
      <SEO 
        title="À propos - Invitopia"
        description="Découvrez Invitopia, la plateforme révolutionnaire de gestion d'événements. Notre mission est de rendre chaque célébration mémorable et sans stress."
        keywords="à propos invitopia, qui sommes-nous, mission invitopia, plateforme événements, histoire invitopia"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-6 text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-invitopia-900 mb-6">
              À propos d'Invitopia
            </h1>
            <p className="text-xl text-invitopia-600 max-w-3xl mx-auto mb-10">
              Nous révolutionnons la façon dont vous organisez et gérez vos événements, 
              en rendant chaque célébration mémorable et sans stress.
            </p>
          </div>

          {/* Mission Section */}
          <div className="container mx-auto px-6 mb-20">
            <div className="bg-invitopia-50 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-invitopia-900 mb-6">Notre Mission</h2>
                <p className="text-lg text-invitopia-600 mb-8">
                  Chez Invitopia, nous croyons que chaque événement mérite d'être parfait. 
                  Notre mission est de fournir aux organisateurs d'événements les outils les plus 
                  intuitifs et puissants pour créer des expériences inoubliables, qu'il s'agisse 
                  d'un mariage intime ou d'une conférence internationale.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-invitopia-900 mb-2">Excellence</h3>
                    <p className="text-sm text-invitopia-600">
                      Nous visons l'excellence dans chaque fonctionnalité
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-invitopia-900 mb-2">Innovation</h3>
                    <p className="text-sm text-invitopia-600">
                      Nous innovons constamment pour améliorer l'expérience
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-invitopia-900 mb-2">Communauté</h3>
                    <p className="text-sm text-invitopia-600">
                      Nous bâtissons une communauté d'organisateurs passionnés
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-invitopia-900 mb-2">Passion</h3>
                    <p className="text-sm text-invitopia-600">
                      Notre passion guide chaque décision que nous prenons
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="container mx-auto px-6 mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-invitopia-900 mb-8 text-center">Notre Histoire</h2>
              <div className="prose prose-lg mx-auto text-invitopia-600">
                <p className="mb-6">
                  Invitopia est née d'une frustration partagée par de nombreux organisateurs d'événements : 
                  la complexité des outils existants et le manque d'intégration entre les différentes étapes 
                  de l'organisation d'un événement.
                </p>
                <p className="mb-6">
                  En 2024, notre équipe a décidé de révolutionner ce secteur en créant une plateforme 
                  tout-en-un qui simplifie chaque aspect de l'organisation d'événements, de la conception 
                  des invitations à l'analyse post-événement.
                </p>
                <p className="mb-6">
                  Aujourd'hui, Invitopia est utilisée par des milliers d'organisateurs dans le monde entier, 
                  des particuliers organisant des fêtes d'anniversaire aux entreprises gérant des conférences 
                  internationales.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-gradient-to-r from-invitopia-800 to-invitopia-700 py-16 mb-20 text-white">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Invitopia en chiffres</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">10K+</div>
                  <div className="text-invitopia-200">Événements créés</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50K+</div>
                  <div className="text-invitopia-200">Utilisateurs actifs</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1M+</div>
                  <div className="text-invitopia-200">Invitations envoyées</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">99%</div>
                  <div className="text-invitopia-200">Satisfaction client</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-invitopia-900 mb-6">
                Rejoignez la révolution des événements
              </h2>
              <p className="text-invitopia-600 mb-10 text-lg">
                Découvrez pourquoi des milliers d'organisateurs font confiance à Invitopia 
                pour leurs événements les plus importants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-invitopia-700 hover:bg-invitopia-600 text-white group"
                  asChild
                >
                  <Link to="/signup">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-invitopia-200"
                  asChild
                >
                  <Link to="/team">
                    Rencontrer l'équipe
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

export default About;
