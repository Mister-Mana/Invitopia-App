import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    guestResponses: true,
    paymentAlerts: true,
    systemUpdates: false,
    marketingEmails: false,
    weeklyDigest: true,
    instantAlerts: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would save to your backend
      toast.success('Préférences de notification sauvegardées');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications par email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications importantes par email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="event-reminders">Rappels d'événements</Label>
              <p className="text-sm text-muted-foreground">
                Rappels avant vos événements
              </p>
            </div>
            <Switch
              id="event-reminders"
              checked={settings.eventReminders}
              onCheckedChange={() => handleToggle('eventReminders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="guest-responses">Réponses des invités</Label>
              <p className="text-sm text-muted-foreground">
                Notifications quand les invités répondent
              </p>
            </div>
            <Switch
              id="guest-responses"
              checked={settings.guestResponses}
              onCheckedChange={() => handleToggle('guestResponses')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="payment-alerts">Alertes de paiement</Label>
              <p className="text-sm text-muted-foreground">
                Notifications pour les paiements et factures
              </p>
            </div>
            <Switch
              id="payment-alerts"
              checked={settings.paymentAlerts}
              onCheckedChange={() => handleToggle('paymentAlerts')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications push</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Notifications push</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications push sur votre navigateur
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="instant-alerts">Alertes instantanées</Label>
              <p className="text-sm text-muted-foreground">
                Alertes en temps réel pour les actions importantes
              </p>
            </div>
            <Switch
              id="instant-alerts"
              checked={settings.instantAlerts}
              onCheckedChange={() => handleToggle('instantAlerts')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS et autres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">Notifications SMS</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des SMS pour les événements urgents
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={() => handleToggle('smsNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-digest">Résumé hebdomadaire</Label>
              <p className="text-sm text-muted-foreground">
                Résumé de vos activités de la semaine
              </p>
            </div>
            <Switch
              id="weekly-digest"
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleToggle('weeklyDigest')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="system-updates">Mises à jour système</Label>
              <p className="text-sm text-muted-foreground">
                Informations sur les nouvelles fonctionnalités
              </p>
            </div>
            <Switch
              id="system-updates"
              checked={settings.systemUpdates}
              onCheckedChange={() => handleToggle('systemUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-emails">Emails marketing</Label>
              <p className="text-sm text-muted-foreground">
                Conseils, offres spéciales et nouveautés
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Sauvegarder les préférences
      </Button>
    </div>
  );
};

export default NotificationSettings;