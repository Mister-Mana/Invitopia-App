
import React from 'react';
import { Calendar, Mail, Users, BarChart4, BellRing, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Gestion des événements',
    description: 'Créez et personnalisez vos événements avec des thèmes élégants, synchronisez avec vos calendriers externes.'
  },
  {
    icon: Users,
    title: 'Gestion des invités',
    description: 'Centralisez vos listes d\'invités, importez vos contacts et organisez-les par groupes (famille, amis, collègues).'
  },
  {
    icon: Mail,
    title: 'Invitations numériques',
    description: 'Envoyez des invitations par email ou SMS avec des liens RSVP intégrés et personnalisés.'
  },
  {
    icon: MessageSquare,
    title: 'Gestion des RSVP',
    description: 'Formulaires interactifs pour les confirmations, commentaires et préférences alimentaires.'
  },
  {
    icon: BellRing,
    title: 'Notifications en temps réel',
    description: 'Restez informé des mises à jour et des nouvelles réponses avec des notifications personnalisables.'
  },
  {
    icon: BarChart4,
    title: 'Statistiques et rapports',
    description: 'Analysez le succès de vos événements avec des tableaux de bord intuitifs et des rapports détaillés.'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-invitopia-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-invitopia-100 text-invitopia-700 mb-4 inline-block">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-invitopia-900 mb-4">
            Tout ce dont vous avez besoin pour des événements réussis
          </h2>
          <p className="text-invitopia-600">
            Invitopia regroupe toutes les fonctionnalités essentielles pour simplifier l'organisation de vos événements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-invitopia-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="feature-icon-bg mb-4">
                <feature.icon className="feature-icon h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-invitopia-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-invitopia-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
