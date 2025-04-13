import { memo, ReactNode } from 'react';

interface NotificationIconsProps {
  cryptoIcon: string;
  cryptoCurrency: string;
  actionIcon: ReactNode;
  actionIconBackground: string;
}

const NotificationIcons = memo(
  ({ cryptoIcon, cryptoCurrency, actionIcon, actionIconBackground }: NotificationIconsProps) => {
    return (
      <div className="relative" style={{ gridArea: 'icons' }}>
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
          <img
            src={cryptoIcon}
            className="h-full w-full rounded-full object-contain"
            alt={cryptoCurrency}
          />
          <div
            className="absolute -top-1.5 left-[35px] flex h-5 w-5 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: actionIconBackground }}
          >
            {actionIcon}
          </div>
        </div>
      </div>
    );
  }
);

NotificationIcons.displayName = 'NotificationIcons';

export default NotificationIcons;
