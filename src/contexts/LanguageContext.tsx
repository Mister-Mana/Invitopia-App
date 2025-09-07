
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, SupportedLanguage } from '@/lib/i18n';

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  tNested: (key: string, defaultValue?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Detect browser language or use French as default
  const getBrowserLanguage = (): SupportedLanguage => {
    const browserLang = navigator.language.split('-')[0];
    return (browserLang as SupportedLanguage) in translations 
      ? (browserLang as SupportedLanguage) 
      : 'fr';
  };

  const [language, setLanguage] = useState<SupportedLanguage>(
    typeof window !== 'undefined' 
      ? (localStorage.getItem('language') as SupportedLanguage) || getBrowserLanguage() 
      : 'fr'
  );

  // Save language preference to localStorage
  const changeLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Enhanced method for nested translations with better error handling
  const tNested = (key: string, defaultValue?: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (!value || typeof value !== 'object') {
          console.warn(`Translation object is not valid at key: ${key}`);
          return defaultValue || key;
        }
        
        if (!(k in value)) {
          console.warn(`Translation key not found: ${key}`);
          return defaultValue || key;
        }
        
        value = value[k];
      }
      
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return defaultValue || key;
      }
      
      return value;
    } catch (error) {
      console.error(`Error retrieving translation for key: ${key}`, error);
      return defaultValue || key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, tNested }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
