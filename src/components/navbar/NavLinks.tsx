
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavLinksProps {
  isDashboard?: boolean;
  isAuthenticated?: boolean;
  onMobileMenuClose?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  isDashboard = false, 
  isAuthenticated = false,
  onMobileMenuClose 
}) => {
  const { t } = useLanguage();

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link 
        to="/features" 
        className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors"
        onClick={onMobileMenuClose}
      >
        {t('navbar.features')}
      </Link>
      <Link 
        to="/pricing" 
        className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors"
        onClick={onMobileMenuClose}
      >
        {t('navbar.pricing')}
      </Link>
      <Link 
        to="/about" 
        className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors"
        onClick={onMobileMenuClose}
      >
        {t('navbar.about')}
      </Link>
      <Link 
        to="/team" 
        className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors"
        onClick={onMobileMenuClose}
      >
        {t('navbar.team')}
      </Link>
      <Link 
        to="/contact" 
        className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors"
        onClick={onMobileMenuClose}
      >
        {t('navbar.contact')}
      </Link>
    </div>
  );
};

export default NavLinks;
