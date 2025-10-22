
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export const ContentTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div>
        <Label>{t('templates.editor.title')}</Label>
        <Input defaultValue="Invitation" className="mt-1" />
      </div>
      
      <div>
        <Label>{t('templates.editor.names')}</Label>
        <Input defaultValue="Julie & Marc" className="mt-1" />
      </div>
      
      <div>
        <Label>{t('templates.editor.description')}</Label>
        <Textarea defaultValue="Ont le plaisir de vous convier à leur mariage" className="mt-1" />
      </div>
      
      <div>
        <Label>{t('createEvent.fields.date')}</Label>
        <Input type="date" defaultValue="2024-06-12" className="mt-1" />
      </div>
      
      <div>
        <Label>{t('createEvent.fields.time')}</Label>
        <Input type="time" defaultValue="15:00" className="mt-1" />
      </div>
      
      <div>
        <Label>{t('createEvent.fields.location')}</Label>
        <Input defaultValue="Château de Versailles, Paris" className="mt-1" />
      </div>
    </div>
  );
};
