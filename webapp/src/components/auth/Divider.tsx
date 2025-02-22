import React from 'react';

export const Divider: React.FC = () => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
      <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
      <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
    </div>
  );
};
