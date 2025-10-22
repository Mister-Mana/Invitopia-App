
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

const EventNotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-invitopia-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-sm text-center mx-6">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Événement non trouvé
        </h1>
        <p className="text-invitopia-600 mb-6">
          L'événement que vous recherchez n'existe pas ou n'est plus disponible publiquement.
        </p>
        <Button asChild className="bg-invitopia-700 hover:bg-invitopia-600">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            {t('common.back')} à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventNotFound;
