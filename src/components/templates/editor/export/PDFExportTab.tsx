
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface PDFExportTabProps {
  fileName: string;
  setFileName: (name: string) => void;
}

const PDFExportTab: React.FC<PDFExportTabProps> = ({
  fileName,
  setFileName
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pdf-filename">{t('common.filename')}</Label>
        <Input 
          id="pdf-filename"
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>{t('export.pdfOptions')}</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            A4 (210 × 297 mm)
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            A5 (148 × 210 mm)
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            US Letter (8.5 × 11")
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="h-4 w-4 mr-2" />
            {t('templates.editor.custom')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFExportTab;
