import { NOTIFICATION_COLORS } from '../constants/notification';

export interface NotificationConfig {
  iconComponent: React.ComponentType<{ size: number }>;
  text: string;
  backgroundColor: (typeof NOTIFICATION_COLORS)[keyof typeof NOTIFICATION_COLORS];
}

export interface NotificationDetails {
  cryptoCurrency: string;
  cryptoColor: string;
  cryptoIcon: string;
  actionIcon: React.ReactNode;
  actionIconBackground: string;
  actionText: string;
  amount: string;
  subtext: string;
}
