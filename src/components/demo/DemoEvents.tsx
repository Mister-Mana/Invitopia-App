
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Plus, Eye, Edit, Share2 } from 'lucide-react';
import { demoEvents } from './demoData';

interface DemoEventsProps {
  onEventSelect: (eventId: string) => void;
}

const DemoEvents: React.FC<DemoEventsProps> = ({ onEventSelect }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Mes Événements</h2>
          <p className="text-gray-600">Gérez tous vos événements depuis cette interface</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onEventSelect(event.id)}>
            <div className="relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                  {event.status === 'published' ? 'Publié' : 'Brouillon'}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="outline" className="bg-white/80">
                  {event.type}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Date:</span>
                  <span>{event.date} à {event.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Invités:</span>
                  <span>{event.guests} personnes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Confirmés:</span>
                  <span className="text-green-600">{event.confirmed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Budget:</span>
                  <span>{event.spent}€ / {event.budget}€</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(event.spent / event.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoEvents;
