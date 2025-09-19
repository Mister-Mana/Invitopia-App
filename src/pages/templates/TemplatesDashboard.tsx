import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Pencil, 
  MoreHorizontal,
  Trash2,
  Copy,
  Share
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getTemplatesByType, getTemplatesByCategory, searchTemplates } from '@/lib/templates';

const TemplatesDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'invitation' | 'ticket'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateType, setNewTemplateType] = useState<'invitation' | 'ticket'>('invitation');

  // Fetch templates based on active tab
  const getTemplates = () => {
    if (searchQuery) {
      return searchTemplates(searchQuery);
    }
    
    if (activeTab === 'all') {
      return [...getTemplatesByType('invitation'), ...getTemplatesByType('ticket')];
    }
    
    return getTemplatesByType(activeTab);
  };

  const templates = getTemplates();

  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error(t('common.required'));
      return;
    }

    // In a real app, this would create a new template in the backend
    toast.success(t('templates.createSuccess'));
    setShowCreateDialog(false);
    
    // Navigate to template editor with a new template ID
    const newId = `new-${Date.now()}`;
    navigate(`/template-editor/${newId}?type=${newTemplateType}&name=${encodeURIComponent(newTemplateName)}`);
  };

  const handleDuplicateTemplate = (id: string, name: string) => {
    toast.success(t('common.duplicated'));
    // Navigate to template editor with duplicated template
    navigate(`/template-editor/${id}-copy?name=${encodeURIComponent(`${name} (${t('common.copy')})`)}`);
  };

  const handleDeleteTemplate = (id: string) => {
    // In a real app, this would delete the template from the backend
    toast.success(t('common.deleted'));
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-invitopia-900">{t('templates.myTemplates')}</h1>
              <p className="text-invitopia-600 mt-1">{t('templates.gallery')}</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/template-gallery">
                  <Eye className="h-4 w-4 mr-2" />
                  {t('templates.gallery')}
                </Link>
              </Button>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('templates.createTemplate')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('templates.createTemplate')}</DialogTitle>
                    <DialogDescription>
                      {t('templates.chooseTemplate')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">{t('templates.templateName')}</label>
                      <Input
                        id="name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="type">{t('templates.templateType')}</label>
                      <Tabs defaultValue="invitation" onValueChange={(v) => setNewTemplateType(v as 'invitation' | 'ticket')}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="invitation">{t('templates.invitation')}</TabsTrigger>
                          <TabsTrigger value="ticket">{t('templates.ticket')}</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      {t('common.cancel')}
                    </Button>
                    <Button onClick={handleCreateTemplate}>
                      {t('common.create')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as 'all' | 'invitation' | 'ticket')}>
                <TabsList>
                  <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
                  <TabsTrigger value="invitation">{t('templates.invitation')}</TabsTrigger>
                  <TabsTrigger value="ticket">{t('templates.ticket')}</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-invitopia-500" />
                  <Input
                    placeholder={t('common.search')}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex justify-between items-center">
                        <Button variant="default" size="sm" asChild>
                          <Link to={`/template-editor/${template.id}`}>
                            <Pencil className="h-4 w-4 mr-1" />
                            {t('templates.editTemplate')}
                          </Link>
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="bg-white/20 hover:bg-white/30">
                            <Eye className="h-4 w-4 text-white" />
                          </Button>
                          <Button variant="outline" size="icon" className="bg-white/20 hover:bg-white/30">
                            <Download className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-invitopia-800">{template.name}</h3>
                        <div className="text-xs text-invitopia-500 mt-1 capitalize">
                          {template.category} · {template.type}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/template-editor/${template.id}`)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            {t('templates.editTemplate')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/template-editor/${template.id}?preview=true`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            {t('templates.previewTemplate')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateTemplate(template.id, template.name)}>
                            <Copy className="h-4 w-4 mr-2" />
                            {t('common.duplicate')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            {t('export.title')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            {t('common.share')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteTemplate(template.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default TemplatesDashboard;
