
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { toast } from 'sonner';

// Import refactored components
import EditorTopBar from '@/components/templateEditor/EditorTopBar';
import TemplateCanvas from '@/components/templateEditor/TemplateCanvas';
import PropertiesPanel from '@/components/templateEditor/PropertiesPanel';
import ExportDrawer from '@/components/templateEditor/ExportDrawer';

const TemplateEditor: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  
  // Template state
  const [templateName, setTemplateName] = useState('Mon Template');
  const [selectedColor, setSelectedColor] = useState('#6E59A5');
  const [fontSize, setFontSize] = useState(16);
  
  const handleExport = () => {
    toast.success(t('export.title') + ' ' + t('common.success'));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-invitopia-50">
        <Navbar />
        
        <main className="container mx-auto pt-24 pb-12">
          {/* Top Bar with navigation and actions */}
          <EditorTopBar templateName={templateName} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-6">
            {/* Canvas for template preview */}
            <TemplateCanvas 
              selectedColor={selectedColor} 
              fontSize={fontSize} 
            />
            
            {/* Properties Panel with tabs */}
            <PropertiesPanel 
              templateName={templateName}
              setTemplateName={setTemplateName}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          </div>
          
          {/* Export functionality */}
          <div className="mt-8 px-6">
            <ExportDrawer onExport={handleExport} />
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default TemplateEditor;
