
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full p-0 shadow-lg transition-all duration-300',
        'bg-invitopia-700 hover:bg-invitopia-600 text-white',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
      aria-label="Retour en haut"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default BackToTop;
