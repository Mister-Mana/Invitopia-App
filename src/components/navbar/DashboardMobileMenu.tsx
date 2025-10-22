
import React from 'react';
import { useAuth } from '@/contexts/auth';
import UserMenu from './UserMenu';
import DashboardControls from './DashboardControls';

interface DashboardMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardMobileMenu: React.FC<DashboardMobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden py-4 animate-fade-in">
      <nav className="flex flex-col space-y-4">
        {/* Contrôles de langue et thème */}
        <div className="flex justify-center">
          <DashboardControls />
        </div>
        
        {/* Menu utilisateur */}
        <div className="pt-4 border-t border-invitopia-200 flex flex-col space-y-2">
          {user && (
            <UserMenu variant="mobile" onMobileMenuClose={onClose} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default DashboardMobileMenu;
