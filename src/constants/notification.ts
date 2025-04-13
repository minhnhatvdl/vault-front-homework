import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from 'lucide-react';
import { NotificationType } from '../types/notifications';
import { NotificationConfig } from '../types/notification-ui';

export const NOTIFICATION_COLORS = {
  positive: '#47883A',
  neutral: '#949494',
} as const;

export const NOTIFICATION_CONFIG: Record<NotificationType, NotificationConfig> = {
  TRANSACTION_RECEIVED: {
    iconComponent: ArrowDownIcon,
    text: 'Received',
    backgroundColor: NOTIFICATION_COLORS.positive,
  },
  TRANSACTION_SENT: {
    iconComponent: ArrowUpIcon,
    text: 'Sent',
    backgroundColor: NOTIFICATION_COLORS.neutral,
  },
  ACCOUNT_CREATED: {
    iconComponent: PlusIcon,
    text: 'Account Created',
    backgroundColor: NOTIFICATION_COLORS.positive,
  },
};
