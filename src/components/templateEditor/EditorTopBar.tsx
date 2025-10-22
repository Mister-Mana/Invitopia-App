
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Download } from 'lucide-react';
import { toast } from 'sonner';

interface EditorTopBarProps {
  templateName: string;
}

const EditorTopBar: React.FC<EditorTopBarProps> = ({ templateName }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success(t('common.success'));
  };
  
  const handleExport = () => {
    toast.success(t('export.title') + ' ' + t('common.success'));
  };

  return (
    <div className="flex items-center justify-between mb-6 px-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="text-invitopia-600 hover:text-invitopia-800 mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('common.back')}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-invitopia-900">{templateName}</h1>
          <p className="text-invitopia-600">{t('templates.customize')}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleSave} variant="outline">
          <Save className="h-4 w-4 mr-1" />
          {t('common.save')}
        </Button>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-1" />
          {t('export.title')}
        </Button>
      </div>
    </div>
  );
};

export default EditorTopBar;
