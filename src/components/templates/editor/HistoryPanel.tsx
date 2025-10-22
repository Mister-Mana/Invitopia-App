
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RotateCcw, RotateCw } from 'lucide-react';

interface HistoryPanelProps {
  history: {
    past: Array<any>;
    future: Array<any>;
  };
  onUndo: () => void;
  onRedo: () => void;
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onUndo, 
  onRedo,
  onClose
}) => {
  const { t } = useLanguage();
  
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('common.history')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline"
              onClick={onUndo}
              disabled={history.past.length === 0}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('common.undo')}
            </Button>
            <Button 
              variant="outline"
              onClick={onRedo}
              disabled={history.future.length === 0}
            >
              <RotateCw className="h-4 w-4 mr-2" />
              {t('common.redo')}
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">{t('common.actions')}</div>
            
            {/* Future actions (can be redone) */}
            {history.future.length > 0 && (
              <div className="space-y-1">
                {history.future.map((_, index) => (
                  <div 
                    key={`future-${index}`}
                    className="p-2 text-sm text-gray-500 border-l-2 border-gray-300 pl-3"
                  >
                    {t('common.action')} #{history.future.length - index}
                  </div>
                ))}
              </div>
            )}
            
            {/* Current state */}
            <div className="p-2 text-sm font-medium bg-gray-100 rounded-md">
              {t('common.currentState')}
            </div>
            
            {/* Past actions (can be undone) */}
            {history.past.length > 0 && (
              <div className="space-y-1">
                {history.past.map((_, index) => (
                  <div 
                    key={`past-${index}`}
                    className="p-2 text-sm border-l-2 border-invitopia-300 pl-3"
                    onClick={() => {
                      // Undo to this specific point
                      for (let i = 0; i < history.past.length - index; i++) {
                        onUndo();
                      }
                    }}
                  >
                    {t('common.action')} #{history.past.length - index}
                  </div>
                )).reverse()}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HistoryPanel;
