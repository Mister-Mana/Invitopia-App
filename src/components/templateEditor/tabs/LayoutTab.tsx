
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from 'lucide-react';

export const LayoutTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Format</Label>
        <Select defaultValue="portrait">
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Choisir un format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portrait">Portrait (3:4)</SelectItem>
            <SelectItem value="landscape">Paysage (4:3)</SelectItem>
            <SelectItem value="square">Carré (1:1)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Arrière-plan</Label>
        <div className="mt-2 border-2 border-dashed border-invitopia-200 rounded-lg p-6 text-center hover:border-invitopia-400 transition-all cursor-pointer">
          <Image className="h-8 w-8 text-invitopia-500 mx-auto mb-2" />
          <p className="text-invitopia-600 text-sm">Cliquez pour ajouter une image de fond</p>
        </div>
      </div>
      
      <div>
        <Label>Alignement du texte</Label>
        <Select defaultValue="center">
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Alignement du texte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Gauche</SelectItem>
            <SelectItem value="center">Centre</SelectItem>
            <SelectItem value="right">Droite</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
