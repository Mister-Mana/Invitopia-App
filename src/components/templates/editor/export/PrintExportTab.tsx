
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const PrintExportTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 border rounded-md">
      <p className="text-sm text-gray-500 mb-4">
        {t('export.printDescription')}
      </p>
      <Button className="w-full">
        <Printer className="h-4 w-4 mr-2" />
        {t('common.print')}
      </Button>
    </div>
  );
};

export default PrintExportTab;
