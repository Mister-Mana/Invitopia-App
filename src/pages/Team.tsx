
import React from 'react';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/ui/BackToTop';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Manassé Kikaya',
      role: 'CEO & Founder',
      bio: 'Visionnaire et entrepreneur passionné, Manassé a fondé Invitopia avec la mission de révolutionner l\'industrie de l\'événementiel. Fort de plusieurs années d\'expérience dans le développement de solutions technologiques innovantes, il dirige l\'équipe vers l\'excellence et l\'innovation continue.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/manasse-kikaya',
      email: 'manasse@invitopia.com'
    },
    {
      name: 'Sarah Martinez',
      role: 'CTO',
      bio: 'Sarah dirige notre équipe technique avec une expertise en architecture logicielle et en développement d\'applications scalables. Elle s\'assure que notre plateforme reste à la pointe de la technologie.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/sarah-martinez',
      email: 'sarah@invitopia.com'
    },
    {
      name: 'David Chen',
      role: 'Lead Designer',
      bio: 'David est responsable de l\'expérience utilisateur et du design de notre plateforme. Il veille à ce que chaque interaction soit intuitive et agréable pour nos utilisateurs.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/david-chen',
      email: 'david@invitopia.com'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Marketing',
      bio: 'Emily développe notre stratégie marketing et s\'assure que notre message atteint les bonnes personnes au bon moment. Elle est passionnée par la création de communautés.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/emily-johnson',
      email: 'emily@invitopia.com'
    },
    {
      name: 'Alex Thompson',
      role: 'Customer Success Manager',
      bio: 'Alex s\'assure que nos clients tirent le maximum de valeur de notre plateforme. Il travaille étroitement avec nos utilisateurs pour comprendre leurs besoins et améliorer leur expérience.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/alex-thompson',
      email: 'alex@invitopia.com'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Lead Developer',
      bio: 'Maria dirige notre équipe de développement et s\'assure que notre code est robuste, maintenable et performant. Elle est experte en technologies web modernes.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      linkedin: 'https://linkedin.com/in/maria-rodriguez',
      email: 'maria@invitopia.com'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-6 text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-invitopia-900 mb-6">
              Rencontrez l'équipe Invitopia
            </h1>
            <p className="text-xl text-invitopia-600 max-w-3xl mx-auto mb-10">
              Une équipe passionnée et talentueuse dédiée à révolutionner 
              l'industrie de l'événementiel à travers l'innovation et l'excellence.
            </p>
          </div>

          {/* Founder Spotlight */}
          <div className="container mx-auto px-6 mb-20">
            <div className="bg-gradient-to-r from-invitopia-50 to-invitopia-100 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/3">
                  <img
                    src={teamMembers[0].image}
                    alt={teamMembers[0].name}
                    className="w-64 h-64 rounded-full object-cover mx-auto shadow-xl"
                  />
                </div>
                <div className="lg:w-2/3 text-center lg:text-left">
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-500 text-white">
                      Fondateur
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-invitopia-900 mb-2">
                    {teamMembers[0].name}
                  </h2>
                  <p className="text-xl text-invitopia-600 mb-6">{teamMembers[0].role}</p>
                  <p className="text-invitopia-700 mb-8 leading-relaxed">
                    {teamMembers[0].bio}
                  </p>
                  <div className="flex gap-4 justify-center lg:justify-start">
                    <Button variant="outline" size="sm" asChild>
                      <a href={teamMembers[0].linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${teamMembers[0].email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="container mx-auto px-6 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-invitopia-900 mb-4">
                L'équipe dirigeante
              </h2>
              <p className="text-invitopia-600 max-w-2xl mx-auto">
                Des experts passionnés qui travaillent ensemble pour créer 
                la meilleure plateforme d'événementiel au monde.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.slice(1).map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-invitopia-100 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-invitopia-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-invitopia-600 font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-invitopia-700 mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-invitopia-50 py-20 mb-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-invitopia-900 mb-4">
                  Nos valeurs
                </h2>
                <p className="text-invitopia-600 max-w-2xl mx-auto">
                  Ces valeurs guident chaque décision que nous prenons et 
                  chaque produit que nous créons.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-invitopia-900 mb-4">Innovation</h3>
                  <p className="text-invitopia-600">
                    Nous repoussons constamment les limites de ce qui est possible 
                    dans l'industrie de l'événementiel.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-invitopia-900 mb-4">Collaboration</h3>
                  <p className="text-invitopia-600">
                    Nous croyons en la puissance du travail d'équipe et de la 
                    collaboration pour atteindre l'excellence.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-invitopia-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">💖</span>
                  </div>
                  <h3 className="text-xl font-semibold text-invitopia-900 mb-4">Passion</h3>
                  <p className="text-invitopia-600">
                    Notre passion pour les événements parfaits se reflète dans 
                    chaque fonctionnalité que nous développons.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Careers CTA */}
          <div className="container mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-invitopia-800 to-invitopia-700 rounded-2xl py-12 px-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Rejoignez notre équipe
              </h2>
              <p className="text-invitopia-100 mb-8 max-w-2xl mx-auto">
                Vous partagez notre passion pour l'innovation et l'excellence ? 
                Nous sommes toujours à la recherche de talents exceptionnels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-invitopia-800 hover:bg-invitopia-50 group"
                  asChild
                >
                  <Link to="/careers">
                    Voir les offres d'emploi
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/contact">
                    Nous contacter
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

export default Team;
