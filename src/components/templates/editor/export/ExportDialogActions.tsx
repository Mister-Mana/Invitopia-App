
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Share, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ExportDialogActionsProps {
  exportFormat: string;
  onExport: () => void;
}

const ExportDialogActions: React.FC<ExportDialogActionsProps> = ({
  exportFormat,
  onExport
}) => {
  const { t } = useLanguage();
  
  const handleCopyToClipboard = () => {
    toast.success(t('common.copied'));
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('export.shareSuccess'));
  };
  
  return (
    <>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleCopyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          {t('common.copy')}
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleShare}>
          <Share className="h-4 w-4 mr-2" />
          {t('common.share')}
        </Button>
      </div>
      <Button onClick={onExport} className="w-full sm:w-auto">
        <Download className="h-4 w-4 mr-2" />
        {t('export.download')} {exportFormat.toUpperCase()}
      </Button>
    </>
  );
};

export default ExportDialogActions;
