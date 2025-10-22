
import React from 'react';
import { Bell, Calendar, MessageSquare, Mail, Clock, CheckCheck } from 'lucide-react';
import { Notification } from './NotificationItem';

interface EnhancedNotificationItemProps {
  notification: Notification & {
    type?: 'rsvp' | 'reminder' | 'message' | 'invite' | 'system';
    read?: boolean;
    actionUrl?: string;
  };
}

const EnhancedNotificationItem: React.FC<EnhancedNotificationItemProps> = ({ notification }) => {
  // Determine icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'rsvp':
        return <CheckCheck className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'invite':
        return <Mail className="h-5 w-5 text-purple-500" />;
      case 'system':
      default:
        return <Bell className="h-5 w-5 text-invitopia-500" />;
    }
  };

  return (
    <div className={`bg-invitopia-50 rounded-lg p-3 border ${notification.read ? 'border-invitopia-100' : 'border-invitopia-300 shadow-sm'}`}>
      <div className="flex">
        <div className="mr-3 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className={`text-sm ${notification.read ? 'text-invitopia-800' : 'text-invitopia-900 font-medium'}`}>
            {notification.message}
          </p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-invitopia-500">{notification.time}</p>
            {notification.actionUrl && (
              <a 
                href={notification.actionUrl} 
                className="text-xs text-invitopia-700 hover:text-invitopia-800 hover:underline"
              >
                Voir détails
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNotificationItem;
