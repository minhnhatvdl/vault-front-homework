import React from 'react';

type EmptyNotificationItemProps = {
  width?: string;
  translateY?: number;
  isRelative?: boolean;
};

const EmptyNotificationItem: React.FC<EmptyNotificationItemProps> = ({
  width = '100%',
  translateY = 0,
  isRelative = false,
}) => {
  return (
    <div
      className={`${isRelative ? 'relative' : 'absolute'} bg-card left-1/2 top-0 w-full -translate-x-1/2 rounded-xl shadow-sm`}
      style={{
        width,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div className="flex items-start gap-2 p-2">
        <div className="bg-skeleton h-7 w-7 shrink-0 rounded-full"></div>
        <div className="flex flex-1 flex-col space-y-2">
          <div className="flex w-full items-center justify-between">
            <div className="bg-skeleton h-3 w-8 rounded-md"></div>
            <div className="bg-skeleton h-3 w-8 rounded-md"></div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="bg-skeleton h-2 w-16 rounded-md"></div>
            <div className="bg-skeleton h-2 w-16 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyNotifications: React.FC = () => {
  return (
    <div className="flex h-80 w-full flex-col items-center justify-center py-8">
      <div className="relative mb-4 w-[240px]">
        <EmptyNotificationItem width="calc(100% - 40px)" translateY={-32} />
        <EmptyNotificationItem width="calc(100% - 20px)" translateY={-16} />
        <EmptyNotificationItem width="100%" translateY={0} isRelative={true} />
      </div>
      <h3 className="text-lg font-medium text-black">No result found...</h3>
    </div>
  );
};

export default EmptyNotifications;
