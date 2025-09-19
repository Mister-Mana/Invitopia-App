
import React from 'react';

export interface Notification {
  id: number;
  message: string;
  time: string;
}

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  return (
    <div className="bg-invitopia-50 rounded-lg p-3 border border-invitopia-100">
      <p className="text-sm text-invitopia-800">{notification.message}</p>
      <p className="text-xs text-invitopia-500 mt-1">{notification.time}</p>
    </div>
  );
};

export default NotificationItem;
