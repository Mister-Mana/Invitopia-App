
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import CanvaTemplateLibrary from '@/components/templates/canva/CanvaTemplateLibrary';

const TemplatesPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto pt-24 pb-12 px-6">
          <CanvaTemplateLibrary />
        </main>
      </div>
    </PageTransition>
  );
};

export default TemplatesPage;
