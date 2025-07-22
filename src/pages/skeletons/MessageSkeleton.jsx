import React from 'react';

const MessageSkeleton = () => {
  const skeletonCount = 6;

  return (
    <div>
      {[...Array(skeletonCount)].map((_, index) => {
        const isRightAligned = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`flex ${isRightAligned ? 'flex-row-reverse' : ''} items-start gap-3 px-4 py-2 animate-pulse`}
          >
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

            {/* Message bubble skeleton */}
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-700 rounded-md"></div>
              <div className="w-48 h-4 bg-gray-700 rounded-md"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
