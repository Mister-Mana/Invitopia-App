
import React from 'react';

interface DashboardNavLinksProps {
  isDashboard?: boolean;
  isAuthenticated?: boolean;
  onMobileMenuClose?: () => void;
}

const DashboardNavLinks: React.FC<DashboardNavLinksProps> = ({ 
  isDashboard = false, 
  isAuthenticated = false,
  onMobileMenuClose 
}) => {
  // Pour le Dashboard, on ne retourne aucun lien de navigation publique
  if (isDashboard) {
    return null;
  }

  // Retourner les liens publics normaux pour les autres pages
  return (
    <div className="hidden md:flex items-center space-x-8">
      {/* Les liens publics existants seront gérés par NavLinks */}
    </div>
  );
};

export default DashboardNavLinks;
