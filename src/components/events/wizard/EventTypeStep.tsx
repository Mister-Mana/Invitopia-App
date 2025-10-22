import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EventTypeStepProps {
  data: any;
  onChange: (data: any) => void;
}

const eventTypes = [
  {
    id: 'wedding',
    name: 'Mariage',
    description: 'Cérémonie de mariage et célébrations',
    icon: '💒',
    color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
  },
  {
    id: 'birthday',
    name: 'Anniversaire',
    description: 'Fêtes d\'anniversaire et célébrations',
    icon: '🎂',
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
  },
  {
    id: 'corporate',
    name: 'Entreprise',
    description: 'Événements professionnels et d\'entreprise',
    icon: '🏢',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  },
  {
    id: 'conference',
    name: 'Conférence',
    description: 'Conférences et événements éducatifs',
    icon: '📊',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
  },
  {
    id: 'party',
    name: 'Fête',
    description: 'Fêtes et célébrations sociales',
    icon: '🎉',
    color: 'bg-green-50 border-green-200 hover:bg-green-100'
  },
  {
    id: 'fundraiser',
    name: 'Collecte de fonds',
    description: 'Événements caritatifs et collectes',
    icon: '💝',
    color: 'bg-red-50 border-red-200 hover:bg-red-100'
  },
  {
    id: 'concert',
    name: 'Concert',
    description: 'Concerts et événements musicaux',
    icon: '🎵',
    color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
  },
  {
    id: 'other',
    name: 'Autre',
    description: 'Événement personnalisé',
    icon: '📅',
    color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
  }
];

const EventTypeStep: React.FC<EventTypeStepProps> = ({ data, onChange }) => {
  const handleTypeSelect = (typeId: string) => {
    onChange({ type: typeId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Quel type d'événement souhaitez-vous créer ?
        </h2>
        <p className="text-muted-foreground">
          Choisissez le type qui correspond le mieux à votre événement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventTypes.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              type.color,
              data.type === type.id && "ring-2 ring-primary shadow-lg"
            )}
            onClick={() => handleTypeSelect(type.id)}
          >
            <CardHeader className="text-center pb-3">
              <div className="text-3xl mb-2">{type.icon}</div>
              <CardTitle className="text-lg">{type.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                {type.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.type && (
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Type sélectionné: <span className="font-medium">
              {eventTypes.find(t => t.id === data.type)?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypeStep;