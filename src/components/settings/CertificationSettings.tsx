import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import { useBadges } from '@/hooks/useBadges';
import { Shield, Award, CheckCircle, Clock, XCircle } from 'lucide-react';

const CertificationSettings: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { badges, loading } = useBadges();
  const navigate = useNavigate();

  const userBadges = badges.filter(b => b.user_id === user?.id);
  const activeBadge = userBadges.find(b => b.status === 'approved' || b.status === 'active');
  const pendingBadge = userBadges.find(b => b.status === 'pending');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`badges.statuses.${status}`) || status;
  };

  const getBadgeTypeLabel = (type: string) => {
    return t(`badges.types.${type}`) || type;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <div>
              <CardTitle>{t('settings.certificationSection.title')}</CardTitle>
              <CardDescription>{t('settings.certificationSection.description')}</CardDescription>
              </div>
            </div>
            {!activeBadge && !pendingBadge && (
              <Button onClick={() => navigate('/badge-application')}>
                {t('badges.apply')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Active Badge */}
          {activeBadge && (
            <div className="p-6 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(activeBadge.status)}
                    <h3 className="font-semibold text-lg">
                      {getBadgeTypeLabel(activeBadge.badge_type)}
                    </h3>
                    <Badge variant="default">
                      {getStatusLabel(activeBadge.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('badges.appliedAt')}: {new Date(activeBadge.applied_at).toLocaleDateString()}
                  </p>
                  {activeBadge.expires_at && (
                    <p className="text-sm text-muted-foreground">
                      {t('badges.expiresAt')}: {new Date(activeBadge.expires_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
          )}

          {/* Pending Badge */}
          {pendingBadge && !activeBadge && (
            <div className="p-6 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(pendingBadge.status)}
                    <h3 className="font-semibold text-lg">
                      {getBadgeTypeLabel(pendingBadge.badge_type)}
                    </h3>
                    <Badge variant="secondary">
                      {getStatusLabel(pendingBadge.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('badges.appliedAt')}: {new Date(pendingBadge.applied_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    Votre demande est en cours d'examen par notre équipe.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* No Badge */}
          {!activeBadge && !pendingBadge && (
            <div className="p-8 text-center border-2 border-dashed rounded-lg">
              <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">
                {t('settings.certificationSection.noBadge')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('settings.certificationSection.description')}
              </p>
              <Button onClick={() => navigate('/badge-application')}>
                {t('settings.certificationSection.apply')}
              </Button>
            </div>
          )}

          {/* Badge Types Info */}
          <div className="space-y-3 pt-6 border-t">
            <h4 className="font-semibold">Types de certification disponibles</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">{t('badges.types.verified')}</p>
                  <p className="text-sm text-muted-foreground">Badge de vérification de base</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-purple-500" />
                <div className="flex-1">
                  <p className="font-medium">{t('badges.types.professional')}</p>
                  <p className="text-sm text-muted-foreground">Pour les professionnels de l'événementiel</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="font-medium">{t('badges.types.premium')}</p>
                  <p className="text-sm text-muted-foreground">Certification premium avec avantages exclusifs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">{t('badges.types.excellence')}</p>
                  <p className="text-sm text-muted-foreground">Le plus haut niveau de certification</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationSettings;
