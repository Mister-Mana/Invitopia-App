
import { useLanguage } from '@/contexts/LanguageContext';
import { SupportedLanguage } from '@/lib/i18n';

export function useLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };
  
  return {
    currentLanguage: language,
    handleLanguageChange
  };
}
