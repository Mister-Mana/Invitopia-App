
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languageNames, SupportedLanguage } from '@/lib/i18n';
import { Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  withTooltip?: boolean;
}

const EnhancedLanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'outline', 
  className,
  withTooltip = true
}) => {
  const { language, setLanguage, tNested } = useLanguage();

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };

  const languageButton = (
    <Button 
      variant={variant} 
      size="sm" 
      className={cn("flex items-center gap-2", className)}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">{languageNames[language]}</span>
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {withTooltip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {languageButton}
              </TooltipTrigger>
              <TooltipContent>
                <p>{tNested('common.changeLanguage', 'Change language')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          languageButton
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languageNames).map(([langCode, langName]) => (
          <DropdownMenuItem
            key={langCode}
            onClick={() => handleLanguageChange(langCode as SupportedLanguage)}
            className="flex items-center justify-between"
          >
            {langName}
            {language === langCode && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnhancedLanguageSwitcher;
