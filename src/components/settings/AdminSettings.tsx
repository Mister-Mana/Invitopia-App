import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Shield, Database, Mail, Globe, Zap, AlertTriangle } from 'lucide-react';

interface AdminSettingsProps {
  hasAccess: (role: 'super_admin' | 'admin' | 'organizer') => boolean;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ hasAccess }) => {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    autoApproveEvents: false,
    maxEventsPerUser: 10,
    maxGuestsPerEvent: 1000,
    dataRetentionDays: 365
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: 'Invitopia'
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 24,
    passwordMinLength: 8,
    requireTwoFactor: false,
    maxLoginAttempts: 5,
    lockoutDuration: 30
  });

  const handleSystemToggle = (key: keyof typeof systemSettings) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveSystem = async () => {
    try {
      toast.success('Paramètres système sauvegardés');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleSaveEmail = async () => {
    try {
      toast.success('Paramètres email sauvegardés');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleSaveSecurity = async () => {
    try {
      toast.success('Paramètres de sécurité sauvegardés');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  if (!hasAccess('admin')) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Accès non autorisé</h3>
            <p className="text-gray-500">Vous n'avez pas l'autorisation d'accéder aux paramètres administrateur.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Paramètres système
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance-mode">Mode maintenance</Label>
              <p className="text-sm text-muted-foreground">
                Désactiver temporairement l'accès au site
              </p>
            </div>
            <Switch
              id="maintenance-mode"
              checked={systemSettings.maintenanceMode}
              onCheckedChange={() => handleSystemToggle('maintenanceMode')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="registration-enabled">Inscription ouverte</Label>
              <p className="text-sm text-muted-foreground">
                Permettre aux nouveaux utilisateurs de s'inscrire
              </p>
            </div>
            <Switch
              id="registration-enabled"
              checked={systemSettings.registrationEnabled}
              onCheckedChange={() => handleSystemToggle('registrationEnabled')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-verification">Vérification email obligatoire</Label>
              <p className="text-sm text-muted-foreground">
                Exiger la vérification de l'email à l'inscription
              </p>
            </div>
            <Switch
              id="email-verification"
              checked={systemSettings.emailVerificationRequired}
              onCheckedChange={() => handleSystemToggle('emailVerificationRequired')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-events">Événements max par utilisateur</Label>
              <Input
                id="max-events"
                type="number"
                value={systemSettings.maxEventsPerUser}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, maxEventsPerUser: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="max-guests">Invités max par événement</Label>
              <Input
                id="max-guests"
                type="number"
                value={systemSettings.maxGuestsPerEvent}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, maxGuestsPerEvent: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <Button onClick={handleSaveSystem}>
            Sauvegarder les paramètres système
          </Button>
        </CardContent>
      </Card>

      {/* Email Settings - Super Admin Only */}
      {hasAccess('super_admin') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configuration email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-host">Serveur SMTP</Label>
                <Input
                  id="smtp-host"
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                  placeholder="smtp.example.com"
                />
              </div>
              <div>
                <Label htmlFor="smtp-port">Port SMTP</Label>
                <Input
                  id="smtp-port"
                  type="number"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="smtp-user">Utilisateur SMTP</Label>
                <Input
                  id="smtp-user"
                  value={emailSettings.smtpUser}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="from-email">Email expéditeur</Label>
                <Input
                  id="from-email"
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                  placeholder="noreply@example.com"
                />
              </div>
              <div>
                <Label htmlFor="from-name">Nom expéditeur</Label>
                <Input
                  id="from-name"
                  value={emailSettings.fromName}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={handleSaveEmail}>
              Sauvegarder la configuration email
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Paramètres de sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="session-timeout">Expiration session (heures)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="password-length">Longueur mot de passe min</Label>
              <Input
                id="password-length"
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="max-attempts">Tentatives de connexion max</Label>
              <Input
                id="max-attempts"
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="lockout-duration">Durée de blocage (minutes)</Label>
              <Input
                id="lockout-duration"
                type="number"
                value={securitySettings.lockoutDuration}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, lockoutDuration: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Exiger 2FA pour tous les comptes administrateur
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={securitySettings.requireTwoFactor}
              onCheckedChange={() => setSecuritySettings(prev => ({ ...prev, requireTwoFactor: !prev.requireTwoFactor }))}
            />
          </div>

          <Button onClick={handleSaveSecurity}>
            Sauvegarder les paramètres de sécurité
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;