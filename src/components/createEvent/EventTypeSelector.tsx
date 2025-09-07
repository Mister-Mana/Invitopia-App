
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface EventTemplate {
  id: string;
  name: string;
  description: string;
}

interface EventTypeSelectorProps {
  eventTemplates: EventTemplate[];
  selectedTemplate: string | null;
  onTemplateSelect: (templateId: string) => void;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  eventTemplates,
  selectedTemplate,
  onTemplateSelect
}) => {
  const { tNested } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventTemplates.map((template) => (
        <div 
          key={template.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? 'border-invitopia-700 bg-invitopia-50 shadow-md'
              : 'border-invitopia-200 hover:border-invitopia-400'
          }`}
          onClick={() => onTemplateSelect(template.id)}
        >
          <div className="flex items-start">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedTemplate === template.id
                ? 'border-invitopia-700'
                : 'border-invitopia-300'
            }`}>
              {selectedTemplate === template.id && (
                <div className="w-3 h-3 rounded-full bg-invitopia-700" />
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-invitopia-800">{template.name}</h3>
              <p className="text-sm text-invitopia-600 mt-1">{template.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventTypeSelector;
