import React from 'react';
import { Home, Search, Tags, Highlighter, Archive } from 'lucide-react';

interface MobileNavProps {
  onHomeClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onHomeClick }) => {
  return (
    <div className="md:hidden flex mb-4 justify-around py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <button onClick={onHomeClick} className="text-gray-600 dark:text-gray-300">
        <Home className="w-5 h-5" />
      </button>
      <button className="text-gray-600 dark:text-gray-300">
        <Tags className="w-5 h-5" />
      </button>
      <button className="text-gray-600 dark:text-gray-300">
        <Highlighter className="w-5 h-5" />
      </button>
      <button className="text-gray-600 dark:text-gray-300">
        <Archive className="w-5 h-5" />
      </button>
    </div>
  );
};