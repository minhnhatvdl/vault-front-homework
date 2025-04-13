import { memo } from 'react';

interface NotificationContentProps {
  actionText: string;
  amount: string;
  subtext: string;
}

const NotificationContent = memo(({ actionText, amount, subtext }: NotificationContentProps) => {
  return (
    <div style={{ gridArea: 'content' }} className="flex flex-grow flex-col justify-center">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-semibold text-black">{actionText}</span>
        <span className="font-semibold text-black ">{amount}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-secondary text-sm">{subtext}</span>
      </div>
    </div>
  );
});

NotificationContent.displayName = 'NotificationContent';

export default NotificationContent;
