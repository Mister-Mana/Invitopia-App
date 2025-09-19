import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActivities } from '@/hooks/useActivities';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Calendar, Users, Mail, Settings, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const ActivityHistory: React.FC = () => {
  const { t } = useLanguage();
  const { activities, loading } = useActivities();

  const getActivityIcon = (actionType: string, resourceType: string) => {
    if (resourceType === 'event') {
      switch (actionType) {
        case 'created':
          return <Plus className="h-4 w-4 text-green-500" />;
        case 'updated':
          return <Settings className="h-4 w-4 text-blue-500" />;
        default:
          return <Calendar className="h-4 w-4 text-invitopia-500" />;
      }
    }
    if (resourceType === 'guest') return <Users className="h-4 w-4 text-purple-500" />;
    if (resourceType === 'invitation') return <Mail className="h-4 w-4 text-orange-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getActivityText = (activity: any) => {
    const { action_type, resource_type, description } = activity;
    
    if (description) return description;
    
    const actionMap: any = {
      created: 'a créé',
      updated: 'a modifié',
      deleted: 'a supprimé',
      sent: 'a envoyé',
      viewed: 'a consulté'
    };
    
    const resourceMap: any = {
      event: 'un événement',
      guest: 'un invité',
      invitation: 'une invitation',
      contact: 'un contact'
    };
    
    return `${actionMap[action_type] || action_type} ${resourceMap[resource_type] || resource_type}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-invitopia-500" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-invitopia-500" />
          Activité récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Aucune activité récente
          </p>
        ) : (
          <div className="space-y-4">
            {activities.slice(0, 10).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.action_type, activity.resource_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    {getActivityText(activity)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(activity.created_at), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;