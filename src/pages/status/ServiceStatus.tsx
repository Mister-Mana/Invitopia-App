
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CheckCircle, AlertTriangle, AlertCircle, RefreshCcw, Clock } from 'lucide-react';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/Navbar';

const ServiceStatus: React.FC = () => {
  const { t } = useLanguage();

  // Exemple de statuts de services (dans une vraie application, ces données viendraient d'une API)
  const services = [
    {
      name: "API",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "Aucun incident récent"
    },
    {
      name: "Site Web",
      status: "operational",
      uptime: "99.8%",
      lastIncident: "Aucun incident récent"
    },
    {
      name: "Base de données",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "Aucun incident récent"
    },
    {
      name: "Système de paiement",
      status: "operational",
      uptime: "99.7%",
      lastIncident: "Aucun incident récent"
    },
    {
      name: "Notifications par e-mail",
      status: "operational",
      uptime: "99.6%",
      lastIncident: "17 avril 2023 - Retard de livraison"
    },
    {
      name: "Stockage des médias",
      status: "operational",
      uptime: "99.9%",
      lastIncident: "Aucun incident récent"
    }
  ];

  // Incidents récents (exemple)
  const incidents = [
    {
      date: "25 mars 2023",
      title: "Ralentissement des notifications par e-mail",
      status: "resolved",
      updates: [
        { time: "14:32", message: "Incident résolu. Tous les systèmes fonctionnent normalement." },
        { time: "13:45", message: "Nous avons identifié le problème et travaillons sur une solution." },
        { time: "13:15", message: "Nous enquêtons sur un ralentissement des envois d'e-mails." }
      ]
    }
  ];

  // Fonction pour rendre l'icône de statut
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "partial_outage":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "major_outage":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "maintenance":
        return <RefreshCcw className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.status.title')}</h1>
            <p className="text-invitopia-600 text-lg">{t('pages.status.description')}</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center justify-between mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h3 className="font-bold text-lg text-green-800">{t('pages.status.allOperational')}</h3>
                <p className="text-green-600">Tous nos systèmes fonctionnent normalement</p>
              </div>
            </div>
            <div className="flex items-center text-invitopia-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {t('pages.status.lastUpdated')}: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-4 rounded-lg border border-invitopia-100 hover:bg-invitopia-50 transition-colors"
                  >
                    <div className="flex items-center">
                      {renderStatusIcon(service.status)}
                      <span className="ml-3 font-medium">{service.name}</span>
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <div className="text-right">
                        <div className="text-invitopia-500">Disponibilité</div>
                        <div className="font-medium">{service.uptime}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-invitopia-500">Incident récent</div>
                        <div className="font-medium">{service.lastIncident}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Incidents récents</CardTitle>
            </CardHeader>
            <CardContent>
              {incidents.length > 0 ? (
                <div className="space-y-6">
                  {incidents.map((incident, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">{incident.title}</h3>
                        <div className="flex items-center">
                          <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1 uppercase font-medium">
                            Résolu
                          </span>
                          <span className="text-invitopia-500 text-sm ml-3">{incident.date}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {incident.updates.map((update, i) => (
                          <div key={i} className="flex text-sm">
                            <span className="text-invitopia-500 min-w-[50px]">{update.time}</span>
                            <span className="ml-4">{update.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-invitopia-500">
                  Aucun incident récent à signaler
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceStatus;
