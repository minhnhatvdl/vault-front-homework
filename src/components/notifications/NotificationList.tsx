import React, { memo } from 'react';
import NotificationItem from './NotificationItem';
import { BaseNotification } from '../../types/notifications';
import EmptyNotifications from './EmptyNotifications';

interface NotificationListProps {
  notifications: BaseNotification[];
}

const NotificationList: React.FC<NotificationListProps> = memo(({ notifications }) => {
  if (notifications.length === 0) return <EmptyNotifications />;

  return (
    <div className="flex flex-col" aria-label="Transaction history">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} />
      ))}
    </div>
  );
});

NotificationList.displayName = 'NotificationList';

export default NotificationList;
