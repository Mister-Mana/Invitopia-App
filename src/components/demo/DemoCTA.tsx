
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DemoCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 text-center">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Prêt à transformer vos événements ?</CardTitle>
          <CardDescription className="text-lg">
            Rejoignez des milliers d'organisateurs qui font confiance à Invitopia pour créer des événements mémorables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-invitopia-600">50k+</div>
              <p className="text-gray-600">Événements créés</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-invitopia-600">2M+</div>
              <p className="text-gray-600">Invitations envoyées</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-invitopia-600">98%</div>
              <p className="text-gray-600">Satisfaction client</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/signup')}>
              Créer un compte gratuit
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth/login')}>
              Se connecter
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Aucune carte de crédit requise • Essai gratuit de 14 jours • Annulation à tout moment
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoCTA;
