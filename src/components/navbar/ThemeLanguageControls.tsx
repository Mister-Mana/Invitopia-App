
import React from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

interface ThemeLanguageControlsProps {
  className?: string;
}

const ThemeLanguageControls: React.FC<ThemeLanguageControlsProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-3 ${className || ''}`}>
      <LanguageSwitcher 
        variant="ghost" 
        className="text-invitopia-700 hover:text-invitopia-500 hover:bg-invitopia-50 dark:text-invitopia-300 dark:hover:text-invitopia-400 dark:hover:bg-gray-800"
      />
      
      <ThemeSwitcher 
        variant="ghost" 
        className="text-invitopia-700 hover:text-invitopia-500 hover:bg-invitopia-50 dark:text-invitopia-300 dark:hover:text-invitopia-400 dark:hover:bg-gray-800"
      />
    </div>
  );
};

export default ThemeLanguageControls;
