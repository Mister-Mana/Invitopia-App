
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, Plus, Star } from 'lucide-react';
import { demoTemplates } from './demoData';

const DemoTemplates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Galerie de Templates</h2>
          <p className="text-gray-600">Découvrez nos modèles d'invitations professionnels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Catégorie
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Créer template
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={template.price === 'Gratuit' ? 'secondary' : 'default'}>
                  {template.price}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{template.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({template.downloads} téléchargements)</span>
                </div>
                <Button size="sm">
                  {template.price === 'Gratuit' ? 'Utiliser' : 'Acheter'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoTemplates;
