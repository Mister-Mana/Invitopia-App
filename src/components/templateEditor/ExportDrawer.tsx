
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface ExportDrawerProps {
  onExport: () => void;
}

const ExportDrawer: React.FC<ExportDrawerProps> = ({ onExport }) => {
  const { t } = useLanguage();

  const handleExport = () => {
    onExport();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          {t('export.title')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('export.title')}</DrawerTitle>
        </DrawerHeader>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            <div>
              <Label>{t('export.format')}</Label>
              <Select defaultValue="pdf">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label>{t('export.quality')}</Label>
                <span className="text-invitopia-600 text-sm">80%</span>
              </div>
              <Slider
                className="mt-2"
                defaultValue={[80]}
                min={50}
                max={100}
                step={5}
              />
            </div>
            
            <Button className="w-full mt-4" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('export.download')}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ExportDrawer;
