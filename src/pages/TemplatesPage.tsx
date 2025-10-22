import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import CanvaTemplateLibrary from '@/components/templates/canva/CanvaTemplateLibrary';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TemplatesSidebar } from '@/components/templates/TemplatesSidebar';

const TemplatesPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <SidebarProvider>
          <div className="flex min-h-screen w-full pt-16">
            <TemplatesSidebar />
            
            <main className="flex-1 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <SidebarTrigger />
              </div>
              <CanvaTemplateLibrary />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </PageTransition>
  );
};

export default TemplatesPage;
