import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EventBasicsStepProps {
  data: any;
  onChange: (data: any) => void;
}

const categories = [
  { id: 'wedding', name: 'Mariage' },
  { id: 'birthday', name: 'Anniversaire' },
  { id: 'corporate', name: 'Entreprise' },
  { id: 'party', name: 'Fête' },
  { id: 'charity', name: 'Charité' },
  { id: 'conference', name: 'Conférence' },
  { id: 'concert', name: 'Concert' },
  { id: 'sports', name: 'Sports' },
  { id: 'education', name: 'Éducation' },
  { id: 'graduation', name: 'Remise de diplômes' },
  { id: 'baby-shower', name: 'Baby Shower' },
  { id: 'housewarming', name: 'Pendaison de crémaillère' },
  { id: 'theater', name: 'Théâtre' },
  { id: 'other', name: 'Autre' }
];

const EventBasicsStep: React.FC<EventBasicsStepProps> = ({ data, onChange }) => {
  const handleInputChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Informations de base
        </h2>
        <p className="text-muted-foreground">
          Ajoutez les détails essentiels de votre événement
        </p>
      </div>

      <div className="grid gap-6">
        {/* Nom de l'événement */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Nom de l'événement <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Ex: Conférence Tech 2024, Mariage de Marie & Paul..."
            value={data.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="text-lg"
          />
          <p className="text-sm text-muted-foreground">
            Choisissez un nom accrocheur et descriptif
          </p>
        </div>

        {/* Type/Catégorie */}
        <div className="space-y-2">
          <Label htmlFor="type">
            Type d'événement <span className="text-red-500">*</span>
          </Label>
          <Select
            value={data.type || ''}
            onValueChange={(value) => handleInputChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Décrivez votre événement, son objectif, le programme..."
            value={data.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
          />
          <p className="text-sm text-muted-foreground">
            Une description claire aidera vos invités à comprendre l'événement
          </p>
        </div>

        {/* Aperçu */}
        {(data.title || data.description) && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Aperçu</CardTitle>
            </CardHeader>
            <CardContent>
              {data.title && (
                <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
              )}
              {data.type && (
                <p className="text-sm text-muted-foreground mb-2">
                  Type: {categories.find(c => c.id === data.type)?.name}
                </p>
              )}
              {data.description && (
                <p className="text-sm">{data.description}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventBasicsStep;