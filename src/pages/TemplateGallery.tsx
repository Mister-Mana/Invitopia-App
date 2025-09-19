import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, Eye, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Template {
  id: string;
  name: string;
  category: string;
  type: 'invitation' | 'ticket';
  thumbnail: string;
  popularity: number;
  tags: string[];
  isPremium: boolean;
}

const TemplateGallery: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Sample templates data
  const templates: Template[] = [
    {
      id: '1',
      name: 'Mariage Élégant',
      category: 'wedding',
      type: 'invitation',
      thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=400&fit=crop',
      popularity: 95,
      tags: ['Élégant', 'Floral', 'Classique'],
      isPremium: false
    },
    {
      id: '2',
      name: 'Anniversaire Festif',
      category: 'birthday',
      type: 'invitation',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=400&fit=crop',
      popularity: 87,
      tags: ['Coloré', 'Festif', 'Moderne'],
      isPremium: true
    },
    {
      id: '3',
      name: 'Conférence Pro',
      category: 'corporate',
      type: 'ticket',
      thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=400&fit=crop',
      popularity: 92,
      tags: ['Professionnel', 'Minimaliste'],
      isPremium: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-invitopia-800 mb-2">{t('templates.gallery')}</h1>
            <p className="text-invitopia-600">{t('templates.browseTemplates')}</p>
          </div>
          
          <Button asChild className="bg-invitopia-600 hover:bg-invitopia-700">
            <Link to="/template-editor/new">
              <Plus className="h-4 w-4 mr-2" />
              {t('templates.createTemplate')}
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-invitopia-400" />
                <Input
                  type="text"
                  placeholder={t('common.search')}
                  className="pl-9 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="wedding">Mariage</SelectItem>
                  <SelectItem value="birthday">Anniversaire</SelectItem>
                  <SelectItem value="corporate">Entreprise</SelectItem>
                  <SelectItem value="conference">Conférence</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="invitation">Invitations</SelectItem>
                  <SelectItem value="ticket">Billets</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <Link to={`/template-editor/${template.id}?preview=true`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <Link to={`/template-editor/${template.id}`}>
                        <Download className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {template.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                    Premium
                  </Badge>
                )}
                
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {template.popularity}%
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {template.type === 'invitation' ? 'Invitation' : 'Billet'}
                  </Badge>
                  <div className="flex gap-1">
                    {template.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/template-editor/${template.id}?preview=true`}>
                      Aperçu
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-invitopia-600 hover:bg-invitopia-700" asChild>
                    <Link to={`/template-editor/${template.id}`}>
                      Utiliser
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun template trouvé</h3>
            <p className="text-gray-500 mb-6">
              Aucun template ne correspond à vos critères de recherche.
            </p>
            <Button asChild className="bg-invitopia-600 hover:bg-invitopia-700">
              <Link to="/template-editor/new">
                Créer un nouveau template
              </Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TemplateGallery;
