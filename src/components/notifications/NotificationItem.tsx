import { memo } from 'react';
import { BaseNotification } from '../../types/notifications';
import NotificationIcons from './NotificationIcons';
import NotificationContent from './NotificationContent';
import { useNotificationDetails } from '../../hooks/useNotificationDetails';

interface NotificationItemProps {
  notification: BaseNotification;
}

const NotificationItem = memo(({ notification }: NotificationItemProps) => {
  const {
    cryptoCurrency,
    cryptoIcon,
    actionIcon,
    actionIconBackground,
    actionText,
    amount,
    subtext,
  } = useNotificationDetails(notification);

  return (
    <div className="border-default relative mb-3 flex gap-4 overflow-hidden rounded-2xl border bg-white p-3">
      <NotificationIcons
        cryptoIcon={cryptoIcon}
        cryptoCurrency={cryptoCurrency}
        actionIcon={actionIcon}
        actionIconBackground={actionIconBackground}
      />
      <NotificationContent actionText={actionText} amount={amount} subtext={subtext} />
    </div>
  );
});

NotificationItem.displayName = 'NotificationItem';

export default NotificationItem;
