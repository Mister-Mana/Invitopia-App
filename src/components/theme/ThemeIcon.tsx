
import React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { Theme } from '@/types/theme';

interface ThemeIconProps {
  theme: Theme;
  className?: string;
}

const ThemeIcon: React.FC<ThemeIconProps> = ({ theme, className }) => {
  switch (theme) {
    case 'light':
      return <Sun className={className || "h-4 w-4"} />;
    case 'dark':
      return <Moon className={className || "h-4 w-4"} />;
    case 'system':
      return <Laptop className={className || "h-4 w-4"} />;
    default:
      return null;
  }
};

export default ThemeIcon;
