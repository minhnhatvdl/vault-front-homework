export type NotificationType = 'TRANSACTION_RECEIVED' | 'TRANSACTION_SENT' | 'ACCOUNT_CREATED';

export interface BaseNotification {
  id: number;
  type: NotificationType;
  data: TransactionData | AccountData;
}

export interface TransactionData {
  id: number;
  amount: number;
  unit: string;
  from: string;
  to: string;
}

export interface AccountData {
  id: number;
  name: string;
  currency: string;
}
