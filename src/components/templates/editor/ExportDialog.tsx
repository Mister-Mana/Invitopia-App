
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { toast } from 'sonner';

// Import our new components
import ImageExportTab from './export/ImageExportTab';
import PDFExportTab from './export/PDFExportTab';
import PrintExportTab from './export/PrintExportTab';
import ExportDialogActions from './export/ExportDialogActions';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ 
  isOpen, 
  onClose,
  template
}) => {
  const { t } = useLanguage();
  const [fileName, setFileName] = useState(template?.name || 'template');
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState('high');
  
  const handleExport = () => {
    toast.success(t('export.success'));
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('export.title')}</DialogTitle>
          <DialogDescription>
            {t('export.description')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="image" className="mt-4">
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger value="image">{t('common.image')}</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="print">{t('common.print')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="image" className="mt-0">
            <ImageExportTab
              fileName={fileName}
              setFileName={setFileName}
              exportFormat={exportFormat}
              setExportFormat={setExportFormat}
              exportQuality={exportQuality}
              setExportQuality={setExportQuality}
            />
          </TabsContent>
          
          <TabsContent value="pdf" className="mt-0">
            <PDFExportTab
              fileName={fileName}
              setFileName={setFileName}
            />
          </TabsContent>
          
          <TabsContent value="print" className="mt-0">
            <PrintExportTab />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <ExportDialogActions 
            exportFormat={exportFormat}
            onExport={handleExport}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
