
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { languageNames } from '@/lib/i18n';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';
import LanguageMenuItems from './language/LanguageMenuItems';

interface LanguageSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'outline', 
  className 
}) => {
  const { currentLanguage, handleLanguageChange } = useLanguageSwitcher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size="sm" 
          className={cn("flex items-center gap-2", className)}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageNames[currentLanguage]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <LanguageMenuItems 
          currentLanguage={currentLanguage} 
          onSelectLanguage={handleLanguageChange} 
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
