
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Eye, 
  Share, 
  Undo, 
  Redo,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface EditorTopBarProps {
  templateName: string;
  onSave: () => void;
  onExport: () => void;
  onBack: () => void;
  isPreviewMode: boolean;
}

const EditorTopBar: React.FC<EditorTopBarProps> = ({ 
  templateName, 
  onSave, 
  onExport, 
  onBack,
  isPreviewMode
}) => {
  const { t } = useLanguage();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(templateName);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  const handleNameBlur = () => {
    setEditingName(false);
    // In a real app, this would update the template name
    toast.success(t('common.updated'));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditingName(false);
      // In a real app, this would update the template name
      toast.success(t('common.updated'));
    }
  };
  
  const handleShare = () => {
    // This would open a share dialog in a real app
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('common.copied'));
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        {editingName ? (
          <Input
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleKeyDown}
            className="max-w-[200px] h-8"
            autoFocus
          />
        ) : (
          <div 
            className="font-medium cursor-pointer hover:underline"
            onClick={() => setEditingName(true)}
          >
            {name}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => toast.info(t('common.undo'))}
        >
          <Undo className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => toast.info(t('common.redo'))}
        >
          <Redo className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              {t('common.save')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'preview=true'}>
              <Eye className="h-4 w-4 mr-2" />
              {t('templates.previewTemplate')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              {t('common.share')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSave}
        >
          <Save className="h-4 w-4 mr-1" />
          {t('common.save')}
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-1" />
          {t('export.title')}
        </Button>
      </div>
    </div>
  );
};

export default EditorTopBar;
