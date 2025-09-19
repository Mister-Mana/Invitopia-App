
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Theme } from '@/types/theme';

export function useThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const getThemeLabel = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'light':
        return t('settings.lightTheme');
      case 'dark':
        return t('settings.darkTheme');
      case 'system':
        return t('settings.systemTheme');
      default:
        return '';
    }
  };

  return {
    theme,
    setTheme,
    getThemeLabel,
  };
}
