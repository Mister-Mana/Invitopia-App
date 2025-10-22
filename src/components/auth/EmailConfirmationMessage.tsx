import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailConfirmationMessageProps {
  email: string;
}

const EmailConfirmationMessage: React.FC<EmailConfirmationMessageProps> = ({ email }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-green-500/10 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl">Compte créé avec succès !</CardTitle>
          <CardDescription className="mt-2">
            Vérifiez votre email pour activer votre compte
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Email de confirmation envoyé
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Nous avons envoyé un email de confirmation à <strong>{email}</strong>
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Cliquez sur le lien dans l'email pour activer votre compte avant de vous connecter.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium">Prochaines étapes :</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Ouvrez votre boîte email</li>
              <li>Recherchez l'email de confirmation d'Invitopia</li>
              <li>Cliquez sur le lien de confirmation</li>
              <li>Revenez ici pour vous connecter</li>
            </ol>
          </div>

          <div className="pt-4 space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              Vous n'avez pas reçu l'email ? Vérifiez vos spams ou contactez le support.
            </p>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/signin')} 
          className="w-full"
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailConfirmationMessage;
