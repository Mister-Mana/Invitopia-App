
import React, { ReactNode } from 'react';
import PageTransition from '@/components/PageTransition';
import AppSidebar from '@/components/shared/AppSidebar';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserMenu from '@/components/navbar/UserMenu';
import { cn } from '@/lib/utils';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <PageTransition>
        <div className="min-h-screen bg-background flex w-full">
          <AppSidebar type="dashboard" />
          <SidebarInset className="flex-1">
            {/* Header avec trigger pour mobile */}
            <header className="h-16 flex items-center justify-between border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
              </div>
              
              {/* Dashboard Controls */}
              <div className="flex items-center space-x-3">
                <LanguageSwitcher 
                  variant="ghost" 
                  className="text-foreground hover:bg-muted"
                />
                
                <ThemeSwitcher 
                  variant="ghost" 
                  className="text-foreground hover:bg-muted"
                />
                
                <UserMenu />
              </div>
            </header>
            
            <main className="flex-1 p-4 md:p-6">
              <div className="max-w-full mx-auto space-y-6">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </PageTransition>
    </SidebarProvider>
  );
};

export default DashboardLayout;
