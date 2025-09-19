
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search,
  BookOpen,
  Code,
  VideoIcon,
  HelpCircle
} from 'lucide-react';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Documentation: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.documentation.title')}</h1>
            <p className="text-invitopia-600 text-lg">{t('pages.documentation.description')}</p>
            
            <div className="mt-8 relative">
              <Input 
                placeholder="Rechercher dans la documentation..." 
                className="pl-10 h-12 text-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-invitopia-400 h-5 w-5" />
            </div>
          </div>
          
          <Tabs defaultValue="getting-started" className="mt-12">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="getting-started" className="flex items-center justify-center py-3">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>{t('pages.documentation.gettingStarted')}</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center justify-center py-3">
                <Code className="h-4 w-4 mr-2" />
                <span>{t('pages.documentation.api')}</span>
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center justify-center py-3">
                <VideoIcon className="h-4 w-4 mr-2" />
                <span>{t('pages.documentation.tutorials')}</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center justify-center py-3">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>{t('pages.documentation.faq')}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Introduction à Invitopia",
                    description: "Découvrez les fonctionnalités de base et comment naviguer dans l'application.",
                    time: "5 min"
                  },
                  {
                    title: "Créer votre premier événement",
                    description: "Un guide étape par étape pour créer et personnaliser votre premier événement.",
                    time: "10 min"
                  },
                  {
                    title: "Gestion des invités",
                    description: "Apprenez à gérer votre liste d'invités et à suivre les réponses.",
                    time: "8 min"
                  },
                  {
                    title: "Personnalisation des invitations",
                    description: "Personnalisez vos invitations avec notre éditeur de modèles.",
                    time: "12 min"
                  }
                ].map((item, index) => (
                  <div key={index} className="border border-invitopia-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-invitopia-600 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <a href="#" className="text-invitopia-500 hover:text-invitopia-700 font-medium text-sm">Lire la suite</a>
                      <span className="text-xs text-invitopia-500">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-8">
              <div className="border border-invitopia-100 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">API Documentation</h3>
                <p className="text-invitopia-600 mb-6">
                  Invitopia offre une API RESTful complète qui vous permet d'intégrer nos fonctionnalités dans vos applications.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-invitopia-50 rounded-lg">
                    <h4 className="font-medium mb-2">Authentification</h4>
                    <p className="text-sm text-invitopia-600">
                      Toutes les requêtes API nécessitent un jeton d'authentification que vous pouvez générer dans votre tableau de bord.
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-white rounded text-xs overflow-x-auto">
                      <code>
                        {`curl -X POST https://api.invitopia.com/auth/token \\
  -d '{"email": "user@example.com", "password": "your_password"}' \\
  -H "Content-Type: application/json"`}
                      </code>
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-invitopia-50 rounded-lg">
                    <h4 className="font-medium mb-2">Événements</h4>
                    <p className="text-sm text-invitopia-600">
                      Gérez vos événements via notre API Events.
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-white rounded text-xs overflow-x-auto">
                      <code>
                        {`// Créer un événement
curl -X POST https://api.invitopia.com/events \\
  -d '{"title": "Mon Événement", "date": "2023-12-01T18:00:00Z"}' \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN"`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Configuration des rappels automatiques",
                    duration: "4:32",
                    thumbnail: "placeholder.svg"
                  },
                  {
                    title: "Personnalisation des modèles d'invitation",
                    duration: "8:15",
                    thumbnail: "placeholder.svg"
                  },
                  {
                    title: "Automatisation du suivi des réponses",
                    duration: "6:48",
                    thumbnail: "placeholder.svg"
                  },
                  {
                    title: "Intégration avec Google Calendar",
                    duration: "5:21",
                    thumbnail: "placeholder.svg"
                  }
                ].map((item, index) => (
                  <div key={index} className="border border-invitopia-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-invitopia-100 relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 rounded-full p-3">
                          <VideoIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <a href="#" className="text-invitopia-500 hover:text-invitopia-700 text-sm">Regarder</a>
                        <span className="text-xs text-invitopia-500">{item.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-8">
              <div className="border border-invitopia-100 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-6">Questions fréquemment posées</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      question: "Comment puis-je annuler un événement ?",
                      answer: "Pour annuler un événement, allez dans votre tableau de bord, sélectionnez l'événement concerné, puis cliquez sur 'Paramètres' et 'Annuler l'événement'. Vous aurez la possibilité d'envoyer une notification à tous les invités."
                    },
                    {
                      question: "Puis-je personnaliser les e-mails de rappel ?",
                      answer: "Oui, vous pouvez personnaliser tous les e-mails de rappel. Allez dans les paramètres de votre événement, puis dans la section 'Communications'. Vous pourrez y modifier le contenu, le timing et l'aspect visuel des rappels."
                    },
                    {
                      question: "Comment exporter ma liste d'invités ?",
                      answer: "Pour exporter votre liste d'invités, accédez à votre événement, puis à l'onglet 'Invités'. Cliquez sur le bouton 'Exporter' en haut à droite pour télécharger un fichier CSV ou Excel avec toutes les informations."
                    },
                    {
                      question: "Quelles sont les méthodes de paiement acceptées ?",
                      answer: "Nous acceptons les cartes de crédit (Visa, Mastercard), les paiements mobiles (M-Pesa, Orange Money, Airtel Money) et les transferts bancaires pour nos abonnements."
                    }
                  ].map((item, index) => (
                    <div key={index} className="border-b border-invitopia-100 pb-6 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-lg mb-2">{item.question}</h4>
                      <p className="text-invitopia-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Documentation;
