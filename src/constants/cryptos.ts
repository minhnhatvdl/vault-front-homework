import BtcIcon from '../assets/icons/cryptos/btc.png';
import EthIcon from '../assets/icons/cryptos/eth.png';
import XrpIcon from '../assets/icons/cryptos/xrp.png';
import XtzIcon from '../assets/icons/cryptos/xtz.png';
import DefaultIcon from '../assets/icons/cryptos/default.png';

export const CRYPTO_NAME_TO_SYMBOL: Record<string, string> = {
  BITCOIN: 'BTC',
  ETHEREUM: 'ETH',
  RIPPLE: 'XRP',
  TEZOS: 'XTZ',
};

export const CRYPTO_COLORS: Record<string, string> = {
  BTC: '#f7931b',
  ETH: '#2e3130',
  XRP: '#22292e',
  XTZ: '#0162ff',
};

export const CRYPTO_ICONS: Record<string, string> = {
  BTC: BtcIcon,
  ETH: EthIcon,
  XRP: XrpIcon,
  XTZ: XtzIcon,
};

export const DEFAULT_CRYPTO_COLOR = '#FFFFFF';

export const DEFAULT_CRYPTO_ICON = DefaultIcon;
