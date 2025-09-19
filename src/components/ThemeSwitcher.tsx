
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ThemeSwitcherProps } from '@/types/theme';
import ThemeIcon from './theme/ThemeIcon';
import ThemeMenuItems from './theme/ThemeMenuItems';
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher';

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  variant = 'outline', 
  className 
}) => {
  const { theme, setTheme, getThemeLabel } = useThemeSwitcher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size="sm" 
          className={cn("flex items-center gap-2", className)}
        >
          <ThemeIcon theme={theme} />
          <span className="hidden sm:inline">
            {getThemeLabel(theme)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeMenuItems 
          currentTheme={theme} 
          onSelectTheme={setTheme} 
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
