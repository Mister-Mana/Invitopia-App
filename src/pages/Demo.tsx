
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Mail, BarChart, Bell, MessageSquare, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import DemoCTA from '@/components/demo/DemoCTA';

const demoFeatures = [
  {
    id: 'events',
    title: 'Gestion des événements',
    description: 'Créez et gérez vos événements facilement',
    icon: Calendar,
    color: 'bg-blue-500'
  },
  {
    id: 'guests',
    title: 'Liste des invités',
    description: 'Gérez vos invités et leurs réponses',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    id: 'invitations',
    title: 'Invitations',
    description: 'Envoyez des invitations personnalisées',
    icon: Mail,
    color: 'bg-purple-500'
  },
  {
    id: 'analytics',
    title: 'Analyses',
    description: 'Suivez les performances de vos événements',
    icon: BarChart,
    color: 'bg-orange-500'
  }
];

const Demo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto pt-24 pb-12 px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Démonstration d'Invitopia
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment Invitopia simplifie la gestion de vos événements avec des outils intuitifs et puissants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {demoFeatures.map((feature) => (
              <Card key={feature.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Interface de démonstration</CardTitle>
              <CardDescription>
                Explorez les différentes fonctionnalités d'Invitopia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="events">Événements</TabsTrigger>
                  <TabsTrigger value="guests">Invités</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="events" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Gestion des événements</h3>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Mariage de Sarah & Pierre</h4>
                            <p className="text-sm text-gray-500">15 juin 2024 • 150 invités</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Confirmé</span>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Anniversaire entreprise</h4>
                            <p className="text-sm text-gray-500">20 juillet 2024 • 80 invités</p>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">En cours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="guests" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Liste des invités</h3>
                    <div className="grid gap-2">
                      {['Marie Dupont', 'Jean Martin', 'Sophie Bernard', 'Lucas Petit'].map((name, index) => (
                        <div key={name} className="flex items-center justify-between p-3 border rounded bg-white">
                          <span className="font-medium">{name}</span>
                          <span className={`px-2 py-1 rounded text-sm ${
                            index % 3 === 0 ? 'bg-green-100 text-green-800' : 
                            index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {index % 3 === 0 ? 'Confirmé' : index % 3 === 1 ? 'En attente' : 'Pas de réponse'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="templates" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Templates d'invitation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Élégant', 'Moderne', 'Classique'].map((style) => (
                        <div key={style} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                          <div className="h-32 bg-gradient-to-br from-invitopia-100 to-invitopia-200 rounded mb-3"></div>
                          <h4 className="font-medium">{style}</h4>
                          <p className="text-sm text-gray-500">Template {style.toLowerCase()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Analyses et statistiques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-invitopia-600">85%</div>
                          <p className="text-sm text-gray-500">Taux de réponse</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">127</div>
                          <p className="text-sm text-gray-500">Confirmations</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600">23</div>
                          <p className="text-sm text-gray-500">En attente</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <DemoCTA />
        </main>
      </div>
    </PageTransition>
  );
};

export default Demo;
