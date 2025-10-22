
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';

// Component imports
import NavbarLogo from './navbar/NavbarLogo';
import NavLinks from './navbar/NavLinks';
import UserMenu from './navbar/UserMenu';
import AuthButtons from './navbar/AuthButtons';
import MobileMenuToggle from './navbar/MobileMenuToggle';
import MobileMenu from './navbar/MobileMenu';
import DashboardMobileMenu from './navbar/DashboardMobileMenu';
import HamburgerMenu from './navbar/HamburgerMenu';
import ThemeLanguageControls from './navbar/ThemeLanguageControls';
import DashboardControls from './navbar/DashboardControls';

export interface NavbarProps {
  transparent?: boolean;
  minimal?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false, minimal = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isDashboard = window.location.pathname.includes('/dashboard') || 
                    window.location.pathname.includes('/admin') || 
                    window.location.pathname.includes('/events') ||
                    window.location.pathname.includes('/contacts') ||
                    window.location.pathname.includes('/templates') ||
                    window.location.pathname.includes('/settings') ||
                    window.location.pathname.includes('/profile') ||
                    window.location.pathname.includes('/billing') ||
                     window.location.pathname.includes('/analytics');

  // En mode minimal (pour le sidebar layout), ne pas afficher la navbar complète
  if (minimal && isDashboard) {
    return null;
  }
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !transparent
          ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavbarLogo />

          {!isMobile && !isDashboard && (
            <nav className="hidden md:flex items-center space-x-8">
              <NavLinks isDashboard={isDashboard} isAuthenticated={!!user} />
            </nav>
          )}

          <div className="flex items-center space-x-3">
            {isDashboard ? (
              <DashboardControls />
            ) : (
              <ThemeLanguageControls />
            )}
            
            {user ? (
              <UserMenu />
            ) : (
              !isDashboard && <AuthButtons />
            )}

            {isMobile && !isDashboard && <HamburgerMenu />}
            
            {isMobile && isDashboard && (
              <MobileMenuToggle 
                isOpen={mobileMenuOpen} 
                onClick={toggleMobileMenu} 
              />
            )}
          </div>
        </div>

        {isDashboard ? (
          <DashboardMobileMenu 
            isOpen={mobileMenuOpen && isMobile}
            onClose={closeMobileMenu}
          />
        ) : (
          <MobileMenu 
            isOpen={mobileMenuOpen && isMobile} 
            isDashboard={isDashboard}
            onClose={closeMobileMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
