
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageExportTabProps {
  fileName: string;
  setFileName: (name: string) => void;
  exportFormat: string;
  setExportFormat: (format: string) => void;
  exportQuality: string;
  setExportQuality: (quality: string) => void;
}

const ImageExportTab: React.FC<ImageExportTabProps> = ({
  fileName,
  setFileName,
  exportFormat,
  setExportFormat,
  exportQuality,
  setExportQuality
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="filename">{t('common.filename')}</Label>
        <Input 
          id="filename"
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="format">{t('common.format')}</Label>
        <div className="flex space-x-2">
          <Button 
            variant={exportFormat === 'png' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => setExportFormat('png')}
          >
            PNG
          </Button>
          <Button 
            variant={exportFormat === 'jpg' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => setExportFormat('jpg')}
          >
            JPG
          </Button>
          <Button 
            variant={exportFormat === 'svg' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => setExportFormat('svg')}
          >
            SVG
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="quality">{t('common.quality')}</Label>
        <div className="flex space-x-2">
          <Button 
            variant={exportQuality === 'low' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => setExportQuality('low')}
          >
            {t('common.low')}
          </Button>
          <Button 
            variant={exportQuality === 'medium' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => setExportQuality('medium')}
          >
            {t('common.medium')}
          </Button>
          <Button 
            variant={exportQuality === 'high' ? 'default' : 'outline'} 
            className="flex-1"
            onClick={() => setExportQuality('high')}
          >
            {t('common.high')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageExportTab;
