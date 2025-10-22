
import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Theme } from '@/types/theme';

interface ThemeMenuItemsProps {
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
}

const ThemeMenuItems: React.FC<ThemeMenuItemsProps> = ({ 
  currentTheme, 
  onSelectTheme 
}) => {
  const { t } = useLanguage();

  return (
    <>
      <DropdownMenuItem 
        onClick={() => onSelectTheme('light')} 
        className="flex items-center gap-2"
      >
        <Sun className="h-4 w-4" />
        <span>{t('settings.lightTheme')}</span>
        {currentTheme === 'light' && <span className="ml-auto">✓</span>}
      </DropdownMenuItem>
      
      <DropdownMenuItem 
        onClick={() => onSelectTheme('dark')} 
        className="flex items-center gap-2"
      >
        <Moon className="h-4 w-4" />
        <span>{t('settings.darkTheme')}</span>
        {currentTheme === 'dark' && <span className="ml-auto">✓</span>}
      </DropdownMenuItem>
      
      <DropdownMenuItem 
        onClick={() => onSelectTheme('system')} 
        className="flex items-center gap-2"
      >
        <Laptop className="h-4 w-4" />
        <span>{t('settings.systemTheme')}</span>
        {currentTheme === 'system' && <span className="ml-auto">✓</span>}
      </DropdownMenuItem>
    </>
  );
};

export default ThemeMenuItems;
