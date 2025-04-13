import {
  CRYPTO_COLORS,
  CRYPTO_ICONS,
  CRYPTO_NAME_TO_SYMBOL,
  DEFAULT_CRYPTO_COLOR,
  DEFAULT_CRYPTO_ICON,
} from '../constants/cryptos';
import { TransactionData, AccountData } from '../types/notifications';

export const isTransactionData = (data: TransactionData | AccountData): data is TransactionData => {
  return 'unit' in data;
};

export const isAccountData = (data: TransactionData | AccountData): data is AccountData => {
  return 'currency' in data;
};

export const getCryptoSymbol = (data: TransactionData | AccountData): string => {
  const currency = getCryptoCurrency(data);
  if (CRYPTO_COLORS[currency]) {
    return currency;
  }
  return CRYPTO_NAME_TO_SYMBOL[currency] || '';
};

export const getCryptoColor = (symbol: string): string =>
  CRYPTO_COLORS[symbol] || DEFAULT_CRYPTO_COLOR;

export const getCryptoIcon = (symbol: string): string =>
  CRYPTO_ICONS[symbol] || DEFAULT_CRYPTO_ICON;

export const getCryptoCurrency = (data: TransactionData | AccountData): string => {
  if (isAccountData(data)) {
    return data.currency.toUpperCase();
  }
  return isTransactionData(data) ? data.unit.toUpperCase() : '';
};

export const getAmountText = (data: TransactionData | AccountData): string => {
  if (!isTransactionData(data)) {
    return '';
  }
  return `${data.amount} ${data.unit}`;
};
