
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Star, 
  Download,
  Sparkles,
  Layout,
  Image as ImageIcon,
  Type,
  Palette
} from 'lucide-react';
import { TemplatePreviewDialog } from '../TemplatePreviewDialog';

interface Template {
  id: string;
  name: string;
  category: string;
  type: 'invitation' | 'ticket' | 'poster' | 'flyer';
  thumbnail: string;
  preview_images: string[];
  tags: string[];
  popularity: number;
  is_premium: boolean;
  created_at: string;
  canvas_data: any;
}

const CanvaTemplateLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'business', label: 'Professionnel' },
    { value: 'wedding', label: 'Mariage' },
    { value: 'birthday', label: 'Anniversaire' },
    { value: 'corporate', label: 'Entreprise' },
    { value: 'party', label: 'Fête' },
    { value: 'conference', label: 'Conférence' },
    { value: 'holiday', label: 'Vacances' },
    { value: 'graduation', label: 'Diplôme' }
  ];

  const types = [
    { value: 'all', label: 'Tous les types' },
    { value: 'invitation', label: 'Invitations' },
    { value: 'ticket', label: 'Billets' },
    { value: 'poster', label: 'Affiches' },
    { value: 'flyer', label: 'Flyers' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'name', label: 'Nom' }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      // Templates avec vraies images de couverture
      const mockTemplates: Template[] = [
        {
          id: '1',
          name: 'Invitation Moderne',
          category: 'wedding',
          type: 'invitation',
          thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=600&fit=crop&q=80',
          preview_images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop&q=80'],
          tags: ['moderne', 'élégant', 'mariage'],
          popularity: 95,
          is_premium: false,
          created_at: new Date().toISOString(),
          canvas_data: {
            layout: { width: 600, height: 800, background: { type: 'color', value: '#ffffff' } },
            elements: []
          }
        },
        {
          id: '2',
          name: 'Billet Événement Premium',
          category: 'business',
          type: 'ticket',
          thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80',
          preview_images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop&q=80'],
          tags: ['professionnel', 'premium', 'événement'],
          popularity: 88,
          is_premium: true,
          created_at: new Date().toISOString(),
          canvas_data: {
            layout: { width: 800, height: 300, background: { type: 'color', value: '#1a1a1a' } },
            elements: []
          }
        },
        {
          id: '3',
          name: 'Affiche Conférence',
          category: 'conference',
          type: 'poster',
          thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=600&fit=crop&q=80',
          preview_images: ['https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200&fit=crop&q=80'],
          tags: ['conférence', 'tech', 'minimal'],
          popularity: 76,
          is_premium: false,
          created_at: new Date().toISOString(),
          canvas_data: {
            layout: { width: 800, height: 1200, background: { type: 'color', value: '#f8f9fa' } },
            elements: []
          }
        },
        {
          id: '4',
          name: 'Invitation Anniversaire Festive',
          category: 'birthday',
          type: 'invitation',
          thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop&q=80',
          preview_images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1200&fit=crop&q=80'],
          tags: ['coloré', 'festif', 'anniversaire'],
          popularity: 89,
          is_premium: false,
          created_at: new Date().toISOString(),
          canvas_data: {
            layout: { width: 600, height: 800, background: { type: 'gradient', value: ['#FF6B6B', '#FFE66D'] } },
            elements: []
          }
        }
      ];
      
      setTemplates(mockTemplates);
    } catch (error) {
      toast.error('Erreur lors du chargement des templates');
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchTerm === '' || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'recent':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const useTemplate = (template: Template) => {
    const templateData = encodeURIComponent(JSON.stringify({
      ...template.canvas_data,
      name: `${template.name} (Copie)`,
      type: template.type,
      category: template.category,
      tags: template.tags
    }));
    navigate(`/template-editor/new?template=${templateData}&mode=create`);
    toast.success(`Template "${template.name}" chargé avec succès`);
  };

  const handlePreviewTemplate = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bibliothèque de templates</h1>
          <p className="text-gray-600">Créez des designs professionnels en quelques clics</p>
        </div>
        
        <Button 
          onClick={() => navigate('/templates/editor/new')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Créer depuis zéro
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher des templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
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
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="relative">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {template.is_premium && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewTemplate(template);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      useTemplate(template);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-3 w-3 mr-1" />
                  {template.popularity}
                </div>
              </div>
              <CardDescription className="capitalize">
                {categories.find(c => c.value === template.category)?.label} • {' '}
                {types.find(t => t.value === template.type)?.label}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handlePreviewTemplate(template)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Aperçu
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => useTemplate(template)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Utiliser
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun template trouvé</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {/* Preview Dialog */}
      <TemplatePreviewDialog
        template={previewTemplate}
        open={showPreview}
        onClose={() => setShowPreview(false)}
        onUse={useTemplate}
      />
    </div>
  );
};

export default CanvaTemplateLibrary;
