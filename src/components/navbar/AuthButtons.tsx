
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthButtonsProps {
  variant?: 'desktop' | 'mobile';
  onMobileMenuClose?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  variant = 'desktop',
  onMobileMenuClose 
}) => {
  const { t } = useLanguage();

  if (variant === 'mobile') {
    return (
      <>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-invitopia-700 dark:text-invitopia-300"
          asChild
        >
          <Link to="/login" onClick={onMobileMenuClose}>
            {t('navbar.login')}
          </Link>
        </Button>
        <Button 
          variant="default" 
          className="w-full justify-start bg-invitopia-700 hover:bg-invitopia-600 dark:bg-invitopia-600 dark:hover:bg-invitopia-700"
          asChild
        >
          <Link to="/events/create" onClick={onMobileMenuClose}>
            {t('navbar.createEvent')}
          </Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button 
        variant="ghost"
        size="sm"
        className="hidden md:inline-flex text-invitopia-700 hover:text-invitopia-500 hover:bg-invitopia-50 dark:text-invitopia-300 dark:hover:text-invitopia-400 dark:hover:bg-gray-800"
        asChild
      >
        <Link to="/login">{t('navbar.login')}</Link>
      </Button>
      <Button 
        variant="default"
        size="sm"
        className="hidden md:inline-flex bg-invitopia-700 hover:bg-invitopia-600 dark:bg-invitopia-600 dark:hover:bg-invitopia-700"
        asChild
      >
        <Link to="/events/create">{t('navbar.createEvent')}</Link>
      </Button>
    </>
  );
};

export default AuthButtons;
