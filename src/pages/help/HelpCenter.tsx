
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HeadphonesIcon, BookOpen, MessageSquare, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const HelpCenter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.help.title')}</h1>
          <p className="text-invitopia-600 text-lg">{t('pages.help.description')}</p>
          
          <div className="mt-8 relative">
            <Input 
              placeholder={t('pages.help.searchPlaceholder')} 
              className="pl-10 h-12 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-invitopia-400 h-5 w-5" />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('pages.help.popularTopics')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <BookOpen className="h-8 w-8 text-invitopia-500" />, 
                title: "Créer mon premier événement",
                links: ["Comment créer un événement ?", "Types d'événements disponibles", "Inviter des participants"]
              },
              { 
                icon: <Tag className="h-8 w-8 text-invitopia-500" />, 
                title: "Plans et tarification",
                links: ["Tarifs et abonnements", "Méthodes de paiement", "Facturation"]
              },
              { 
                icon: <MessageSquare className="h-8 w-8 text-invitopia-500" />, 
                title: "Gestion des invités",
                links: ["Suivi des RSVP", "Messages aux invités", "Rappels automatiques"]
              },
              { 
                icon: <HeadphonesIcon className="h-8 w-8 text-invitopia-500" />, 
                title: "Support technique",
                links: ["Problèmes de connexion", "Erreurs fréquentes", "Bugs connus"]
              },
            ].map((topic, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm border border-invitopia-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {topic.icon}
                  <h3 className="font-semibold text-lg ml-3">{topic.title}</h3>
                </div>
                <ul className="space-y-2">
                  {topic.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-invitopia-600 hover:text-invitopia-800 text-sm">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé de réponse?</h2>
          <p className="text-invitopia-600 mb-6">Notre équipe d'assistance est prête à vous aider</p>
          <Button asChild>
            <Link to="/contact">
              {t('pages.help.contactSupport')}
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenter;
