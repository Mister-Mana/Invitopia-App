
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomeLink: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
      <Button variant="ghost" size="sm" asChild className="text-invitopia-600 hover:text-invitopia-700 hover:bg-invitopia-50">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Accueil</span>
        </Link>
      </Button>
    </div>
  );
};

export default HomeLink;
