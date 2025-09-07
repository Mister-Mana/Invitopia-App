import React, { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/auth';
import MobileBottomNavbar from './MobileBottomNavbar';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showBottomNav = true,
  className 
}) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className={cn(
        "min-h-screen bg-background",
        isMobile && user && showBottomNav && "pb-20", // Add bottom padding for mobile nav
        className
      )}>
        <Navbar />
        
        <main className={cn(
          "pt-16", // Account for fixed navbar
          isMobile ? "px-4 py-4" : "container mx-auto px-6 py-8"
        )}>
          {children}
        </main>

        {/* Mobile Bottom Navigation - only show for authenticated users on mobile */}
        {isMobile && user && showBottomNav && (
          <MobileBottomNavbar />
        )}
      </div>
    </PageTransition>
  );
};

export default MobileLayout;