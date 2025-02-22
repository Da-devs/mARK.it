import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export const NewItemButton: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center justify-center">
        <PlusIcon className="h-5 w-5 mr-2" />
        New Item
      </button>
    </div>
  );
};