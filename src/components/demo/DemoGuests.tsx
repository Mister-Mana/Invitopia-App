
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Plus, Edit, Mail, Trash2 } from 'lucide-react';
import { demoGuests } from './demoData';

const DemoGuests: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Invités</h2>
          <p className="text-gray-600">Gérez vos listes d'invités et suivez les réponses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter invité
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Invités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Confirmés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">198</div>
            <p className="text-sm text-gray-500">80% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">32</div>
            <p className="text-sm text-gray-500">13% du total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Invités</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Nom</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Statut</th>
                  <th className="text-left p-3">Table</th>
                  <th className="text-left p-3">Restrictions</th>
                  <th className="text-left p-3">+1</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoGuests.map((guest) => (
                  <tr key={guest.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{guest.name}</td>
                    <td className="p-3 text-gray-600">{guest.email}</td>
                    <td className="p-3">
                      <Badge 
                        variant={
                          guest.status === 'confirmed' ? 'default' :
                          guest.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {guest.status === 'confirmed' ? 'Confirmé' :
                         guest.status === 'pending' ? 'En attente' : 'Décliné'}
                      </Badge>
                    </td>
                    <td className="p-3">{guest.table}</td>
                    <td className="p-3 text-sm">{guest.dietaryRestrictions}</td>
                    <td className="p-3">
                      <Badge variant={guest.plusOne ? 'default' : 'outline'}>
                        {guest.plusOne ? 'Oui' : 'Non'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoGuests;
