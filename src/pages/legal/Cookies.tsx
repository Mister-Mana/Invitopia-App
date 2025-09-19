
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const Cookies: React.FC = () => {
  const { t } = useLanguage();
  const [preferences, setPreferences] = useState({
    necessary: true,
    preferences: true,
    statistics: false,
    marketing: false
  });

  const handleToggle = (key: string) => {
    if (key === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true
    });
  };

  const handleDeclineAll = () => {
    setPreferences({
      necessary: true, // Les cookies nécessaires sont toujours activés
      preferences: false,
      statistics: false,
      marketing: false
    });
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: t('pages.cookies.necessary'),
      description: 'Ces cookies sont indispensables au fonctionnement du site web et ne peuvent pas être désactivés.',
      examples: ['Session de connexion', 'Panier d\'achat', 'Sécurité']
    },
    {
      id: 'preferences',
      title: t('pages.cookies.preferences'),
      description: 'Ces cookies permettent au site web de se souvenir de vos préférences afin de vous offrir une expérience personnalisée.',
      examples: ['Langue préférée', 'Région', 'Paramètres de thème']
    },
    {
      id: 'statistics',
      title: t('pages.cookies.statistics'),
      description: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site web en collectant des informations anonymes.',
      examples: ['Google Analytics', 'Nombre de visiteurs', 'Pages les plus populaires']
    },
    {
      id: 'marketing',
      title: t('pages.cookies.marketing'),
      description: 'Ces cookies sont utilisés pour suivre les visiteurs sur les sites web afin d\'afficher des publicités pertinentes et engageantes.',
      examples: ['Publicités ciblées', 'Réseaux sociaux', 'Remarketing']
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.cookies.title')}</h1>
            <p className="text-invitopia-600 text-lg mb-6">
              {t('pages.cookies.description')}
            </p>
          </div>
          
          <Tabs defaultValue="policy" className="mb-10">
            <TabsList className="mb-6">
              <TabsTrigger value="policy">Politique</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="policy" className="prose prose-invitopia max-w-none">
              <p>
                Les cookies sont de petits fichiers texte stockés sur votre ordinateur ou votre appareil mobile lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web ou les faire fonctionner plus efficacement, ainsi que pour fournir des informations aux propriétaires du site.
              </p>
              
              <h2>Comment utilisons-nous les cookies ?</h2>
              <p>
                Nous utilisons différents types de cookies pour plusieurs raisons. Certains cookies sont nécessaires pour des raisons techniques, nous les appelons "cookies essentiels" ou "cookies nécessaires". D'autres cookies nous permettent de suivre et de cibler les intérêts des utilisateurs pour améliorer l'expérience sur notre site. Des tiers servent des cookies via notre site à des fins d'analyse et de marketing.
              </p>
              
              <h2>Types de cookies que nous utilisons</h2>
              <ul>
                <li>
                  <strong>Cookies nécessaires</strong> : Ces cookies sont indispensables pour vous permettre de naviguer sur le site et d'utiliser ses fonctionnalités, comme l'accès aux zones sécurisées du site.
                </li>
                <li>
                  <strong>Cookies de préférences</strong> : Ces cookies permettent à un site web de se souvenir des informations qui changent la façon dont le site se comporte ou se présente, comme votre langue préférée ou la région dans laquelle vous vous trouvez.
                </li>
                <li>
                  <strong>Cookies statistiques</strong> : Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en rapportant des informations de manière anonyme.
                </li>
                <li>
                  <strong>Cookies marketing</strong> : Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L'intention est d'afficher des publicités pertinentes et engageantes pour l'utilisateur individuel et ainsi plus précieuses pour les éditeurs et les annonceurs tiers.
                </li>
              </ul>
              
              <h2>Comment contrôler les cookies</h2>
              <p>
                Vous pouvez définir ou ajuster vos contrôles de cookies à tout moment dans l'onglet "Préférences". Vous pouvez également configurer votre navigateur pour qu'il refuse tous les cookies ou vous indique quand un cookie est envoyé. Cependant, si vous désactivez ou refusez les cookies, certaines parties de notre site peuvent devenir inaccessibles ou ne pas fonctionner correctement.
              </p>
              
              <h2>Politique de cookies et vie privée</h2>
              <p>
                Pour en savoir plus sur la façon dont nous protégeons vos données personnelles, veuillez consulter notre <a href="/privacy">Politique de confidentialité</a>.
              </p>
              
              <h2>Contactez-nous</h2>
              <p>
                Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à <a href="mailto:privacy@invitopia.com">privacy@invitopia.com</a>.
              </p>
            </TabsContent>
            
            <TabsContent value="preferences">
              <div className="bg-invitopia-50 p-6 rounded-lg mb-8">
                <h2 className="font-bold text-xl mb-4">Paramètres des cookies</h2>
                <p className="text-invitopia-600 mb-6">
                  Vous pouvez choisir quels types de cookies vous souhaitez activer. Les cookies nécessaires sont toujours activés car ils sont essentiels au fonctionnement du site.
                </p>
                
                <div className="space-y-4">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="flex items-start justify-between pb-4 border-b border-invitopia-200 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-lg">{type.title}</h3>
                          {type.id === 'necessary' && (
                            <span className="ml-2 text-xs bg-invitopia-100 text-invitopia-600 py-1 px-2 rounded-full">
                              Requis
                            </span>
                          )}
                        </div>
                        <p className="text-invitopia-600 text-sm mb-2">{type.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {type.examples.map((example, i) => (
                            <span key={i} className="text-xs bg-invitopia-100 text-invitopia-600 py-1 px-2 rounded-full">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4 pt-1">
                        <Switch 
                          checked={preferences[type.id as keyof typeof preferences]} 
                          onCheckedChange={() => handleToggle(type.id)}
                          disabled={type.id === 'necessary'}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button 
                    variant="default" 
                    className="flex-1" 
                    onClick={handleAcceptAll}
                  >
                    {t('pages.cookies.accept')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={handleDeclineAll}
                  >
                    {t('pages.cookies.decline')}
                  </Button>
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

export default Cookies;
