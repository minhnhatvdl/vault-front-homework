import { useMemo } from 'react';
import { truncateAddress } from '../utils/address';
import { BaseNotification } from '../types/notifications';
import { NotificationDetails } from '../types/notification-ui';
import {
  isTransactionData,
  isAccountData,
  getAmountText,
  getCryptoSymbol,
  getCryptoColor,
  getCryptoIcon,
} from '../utils/notification';
import { NOTIFICATION_CONFIG } from '../constants/notification';

export const useNotificationDetails = (notification: BaseNotification): NotificationDetails => {
  const { type, data } = notification;

  const cryptoCurrency = useMemo(() => getCryptoSymbol(data), [data]);

  const cryptoColor = useMemo(() => getCryptoColor(cryptoCurrency), [cryptoCurrency]);

  const cryptoIcon = useMemo(() => getCryptoIcon(cryptoCurrency), [cryptoCurrency]);

  const config = NOTIFICATION_CONFIG[type];

  const actionIcon = useMemo(() => {
    const { iconComponent: IconComponent } = config;
    return <IconComponent size={12} />;
  }, [config]);

  const amount = useMemo(() => getAmountText(data), [data]);

  const subtext = useMemo(() => {
    if (isAccountData(data)) {
      return data.name;
    }
    if (!isTransactionData(data)) {
      return '';
    }
    return type === 'TRANSACTION_RECEIVED'
      ? `From ${truncateAddress(data.from)}`
      : `to ${truncateAddress(data.to)}`;
  }, [type, data]);

  return {
    cryptoCurrency,
    cryptoColor,
    cryptoIcon,
    actionIcon,
    actionText: config.text,
    amount,
    subtext,
    actionIconBackground: config.backgroundColor,
  };
};
