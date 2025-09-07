
import React from 'react';
import { Check } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { languageNames, SupportedLanguage } from '@/lib/i18n';

interface LanguageMenuItemsProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (language: SupportedLanguage) => void;
}

const LanguageMenuItems: React.FC<LanguageMenuItemsProps> = ({ 
  currentLanguage, 
  onSelectLanguage 
}) => {
  return (
    <>
      {Object.entries(languageNames).map(([langCode, langName]) => (
        <DropdownMenuItem
          key={langCode}
          onClick={() => onSelectLanguage(langCode as SupportedLanguage)}
          className="flex items-center justify-between"
        >
          {langName}
          {currentLanguage === langCode && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      ))}
    </>
  );
};

export default LanguageMenuItems;
