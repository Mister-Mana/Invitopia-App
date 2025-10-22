
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, ArrowUpRight } from 'lucide-react';
import NotificationItem, { Notification } from './NotificationItem';

interface NotificationsCardProps {
  notifications: Notification[];
}

const NotificationsCard: React.FC<NotificationsCardProps> = ({ notifications }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-invitopia-500" />
            {t('dashboard.recentActivity')}
          </span>
          <Button variant="ghost" size="sm" className="text-invitopia-600 hover:text-invitopia-800 text-xs">
            {t('dashboard.markAllRead')}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4 text-invitopia-600 hover:text-invitopia-800">
          {t('dashboard.viewAllNotifications')}
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
