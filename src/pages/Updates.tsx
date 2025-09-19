
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Calendar } from 'lucide-react';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Updates: React.FC = () => {
  const { t } = useLanguage();
  
  const updates = [
    {
      title: "Nouvelle fonctionnalité : Mode hors ligne et synchronisation",
      date: "15 mai 2023",
      excerpt: "Nous sommes ravis de vous annoncer que vous pouvez désormais gérer vos événements même sans connexion internet. Toutes vos modifications seront synchronisées automatiquement dès que vous serez à nouveau en ligne.",
      image: "/placeholder.svg",
      category: "features",
      url: "#"
    },
    {
      title: "Amélioration des performances pour les grands événements",
      date: "28 avril 2023",
      excerpt: "Nous avons entièrement restructuré notre système de base de données pour améliorer les performances lors de la gestion d'événements avec plus de 1000 invités. Vos événements importants se chargent désormais 3 fois plus vite !",
      image: "/placeholder.svg",
      category: "improvements",
      url: "#"
    },
    {
      title: "Nouveau modèle de paiement pour les organisations à but non lucratif",
      date: "10 avril 2023",
      excerpt: "Les organisations à but non lucratif peuvent désormais bénéficier d'une réduction de 50% sur tous nos plans. Contactez notre équipe commerciale pour vérifier votre éligibilité.",
      image: "/placeholder.svg",
      category: "features",
      url: "#"
    },
    {
      title: "Correction du bug d'envoi de rappels multiples",
      date: "2 avril 2023",
      excerpt: "Nous avons résolu un problème qui pouvait entraîner l'envoi de plusieurs rappels identiques à certains invités. Nous nous excusons pour la gêne occasionnée.",
      image: "/placeholder.svg",
      category: "fixes",
      url: "#"
    },
    {
      title: "Nouveau dashboard pour les organisateurs d'événements",
      date: "15 mars 2023",
      excerpt: "Notre nouveau tableau de bord offre une vision complète et en temps réel de tous vos événements. Consultez les statistiques, gérez les invités et suivez les paiements, tout à partir d'une seule interface.",
      image: "/placeholder.svg",
      category: "features",
      url: "#"
    },
    {
      title: "Intégration avec Google Calendar et Outlook",
      date: "28 février 2023",
      excerpt: "Vous pouvez maintenant synchroniser automatiquement vos événements Invitopia avec Google Calendar et Outlook. Une fonctionnalité très demandée par nos utilisateurs !",
      image: "/placeholder.svg",
      category: "features",
      url: "#"
    },
    {
      title: "Optimisation de l'application mobile",
      date: "10 février 2023",
      excerpt: "Notre application mobile a été entièrement repensée pour offrir une meilleure expérience utilisateur. Elle consomme maintenant 40% moins de batterie et 30% moins de données mobiles.",
      image: "/placeholder.svg",
      category: "improvements",
      url: "#"
    },
    {
      title: "Correction des problèmes d'affichage sur certains navigateurs",
      date: "2 février 2023",
      excerpt: "Nous avons résolu plusieurs problèmes d'affichage qui affectaient les utilisateurs d'Internet Explorer et de certaines versions d'Opera.",
      image: "/placeholder.svg",
      category: "fixes",
      url: "#"
    }
  ];
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'features':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Nouvelle fonctionnalité</Badge>;
      case 'improvements':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Amélioration</Badge>;
      case 'fixes':
        return <Badge className="bg-green-500 hover:bg-green-600">Correction</Badge>;
      default:
        return <Badge>Mise à jour</Badge>;
    }
  };

  const [activeFilter, setActiveFilter] = React.useState('all');
  
  const filteredUpdates = activeFilter === 'all' 
    ? updates 
    : updates.filter(update => update.category === activeFilter);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.updates.title')}</h1>
            <p className="text-invitopia-600 text-lg">
              {t('pages.updates.description')}
            </p>
          </div>
          
          <div className="flex justify-center mb-10 overflow-x-auto">
            <div className="inline-flex bg-invitopia-100 rounded-lg p-1">
              {[
                { id: 'all', label: t('pages.updates.categories.all') },
                { id: 'features', label: t('pages.updates.categories.features') },
                { id: 'improvements', label: t('pages.updates.categories.improvements') },
                { id: 'fixes', label: t('pages.updates.categories.fixes') }
              ].map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === category.id
                      ? 'bg-white text-invitopia-800 shadow-sm'
                      : 'text-invitopia-600 hover:text-invitopia-900'
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            {filteredUpdates.map((update, index) => (
              <div key={index} className="border border-invitopia-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-invitopia-100">
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-full object-cover object-center"
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center space-x-2 mb-3">
                      {getCategoryBadge(update.category)}
                      <div className="flex items-center text-invitopia-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{update.date}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3">{update.title}</h2>
                    <p className="text-invitopia-600 mb-4">{update.excerpt}</p>
                    
                    <Button variant="ghost" asChild className="text-invitopia-600 hover:text-invitopia-800 p-0 h-auto font-medium">
                      <a href={update.url}>
                        {t('pages.updates.readMore')}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Updates;
