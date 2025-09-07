
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Eye, Download, Crown, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllPremiumTemplates } from '@/lib/templates/premium-templates';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const PremiumTemplateGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const templates = getAllPremiumTemplates();

  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesType = selectedType === 'all' || template.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.name.localeCompare(a.name); // Simulated newest
        default:
          return 0;
      }
    });

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'wedding', label: 'Mariage' },
    { value: 'birthday', label: 'Anniversaire' },
    { value: 'corporate', label: 'Entreprise' },
    { value: 'music', label: 'Musique' }
  ];

  const types = [
    { value: 'all', label: 'Tous les types' },
    { value: 'invitation', label: 'Invitations' },
    { value: 'ticket', label: 'Billets' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Crown className="h-8 w-8 text-yellow-300" />
          <h1 className="text-3xl font-bold">Templates Premium</h1>
        </div>
        <p className="text-xl opacity-90">
          Des designs exceptionnels pour vos événements les plus importants
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher des templates..."
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
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularité</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="newest">Plus récent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
            {/* Premium Badge */}
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>

            {/* Template Preview */}
            <div className="relative h-64 overflow-hidden">
              <div 
                className="w-full h-full bg-gray-100 flex items-center justify-center text-white relative group-hover:scale-105 transition-transform duration-300"
                style={{
                  background: template.layout.background.type === 'gradient' && template.layout.background.gradient
                    ? `linear-gradient(${template.layout.background.gradient.angle}deg, ${template.layout.background.gradient.colors.join(', ')})`
                    : template.layout.background.value || '#f3f4f6'
                }}
              >
                {/* Template Elements Preview */}
                {template.elements.slice(0, 3).map((element, index) => (
                  <div
                    key={element.id}
                    className="absolute"
                    style={{
                      left: `${(element.position.x / template.layout.width) * 100}%`,
                      top: `${(element.position.y / template.layout.height) * 100}%`,
                      transform: 'translate(-50%, -50%) scale(0.3)',
                      opacity: 0.8
                    }}
                  >
                    {element.type === 'text' && (
                      <div
                        style={{
                          fontSize: element.fontSize || 16,
                          fontWeight: element.fontWeight || 'normal',
                          color: element.color || '#000000',
                          fontFamily: element.fontFamily || 'Inter'
                        }}
                      >
                        {element.content}
                      </div>
                    )}
                    {element.type === 'shape' && (
                      <div
                        style={{
                          width: element.size.width,
                          height: element.size.height,
                          backgroundColor: element.backgroundColor || '#3B82F6',
                          borderRadius: element.shape === 'ellipse' ? '50%' : element.borderRadius || 0
                        }}
                      />
                    )}
                  </div>
                ))}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                    <Button size="sm" variant="secondary" asChild>
                      <Link to={`/templates/editor/${template.id}?preview=true`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Aperçu
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Link to={`/templates/advanced-editor/${template.id}`}>
                        <Download className="h-4 w-4 mr-1" />
                        Utiliser
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                {template.popularity}%
              </div>
            </div>
            
            {/* Template Info */}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-start justify-between">
                <span className="flex-1">{template.name}</span>
              </CardTitle>
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
            
            {/* Actions */}
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1" 
                  asChild
                >
                  <Link to={`/templates/editor/${template.id}?preview=true`}>
                    <Eye className="h-4 w-4 mr-1" />
                    Aperçu
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                  asChild
                >
                  <Link to={`/templates/advanced-editor/${template.id}`}>
                    <Crown className="h-4 w-4 mr-1" />
                    Utiliser
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun template trouvé</h3>
          <p className="text-gray-500 mb-6">
            Aucun template ne correspond à vos critères de recherche.
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-purple-600">{templates.length}+</div>
            <div className="text-sm text-gray-600">Templates Premium</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">15+</div>
            <div className="text-sm text-gray-600">Catégories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">4K+</div>
            <div className="text-sm text-gray-600">Téléchargements</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTemplateGallery;
