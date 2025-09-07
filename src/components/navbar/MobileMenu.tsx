
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
  isDashboard: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, isDashboard, onClose }) => {
  const { user } = useAuth();
  const { tNested } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden py-4 animate-fade-in">
      <nav className="flex flex-col space-y-4">
        {/* Navigation Links */}
        <div className="flex flex-col space-y-4">
          <Link 
            to="/features" 
            className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors py-2"
            onClick={onClose}
          >
            {tNested('common.home.footer.features', 'Fonctionnalités')}
          </Link>
          <Link 
            to="/pricing" 
            className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors py-2"
            onClick={onClose}
          >
            {tNested('common.home.footer.pricing', 'Tarifs')}
          </Link>
          <Link 
            to="/about" 
            className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors py-2"
            onClick={onClose}
          >
            À propos
          </Link>
          <Link 
            to="/team" 
            className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors py-2"
            onClick={onClose}
          >
            Équipe
          </Link>
          <Link 
            to="/contact" 
            className="text-invitopia-700 hover:text-invitopia-600 font-medium transition-colors py-2"
            onClick={onClose}
          >
            Contact
          </Link>
        </div>
        
        {/* Auth Section */}
        <div className="pt-4 border-t border-invitopia-200 flex flex-col space-y-2">
          {user ? (
            <UserMenu variant="mobile" onMobileMenuClose={onClose} />
          ) : (
            <AuthButtons variant="mobile" onMobileMenuClose={onClose} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
