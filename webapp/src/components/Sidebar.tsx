import React from 'react';
import { Home, Search, Tags, Highlighter, Archive, Menu } from 'lucide-react';
import { Category } from '@/types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  showCategories: boolean;
  onSelectCategory: (categoryId: string) => void;
  onHomeClick: () => void;
  onCategoriesClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  showCategories,
  onSelectCategory,
  onHomeClick,
  onCategoriesClick,
}) => {
  return (
    <div className="hidden md:block fixed left-0 w-64 h-screen p-4 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="space-y-6">
        <div className="space-y-2">
          <a
            href="#"
            onClick={onHomeClick}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Tags className="w-5 h-5" />
            <span>Tags</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Highlighter className="w-5 h-5" />
            <span>Highlights</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Archive className="w-5 h-5" />
            <span>Archive</span>
          </a>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Lists</span>
            <button onClick={onCategoriesClick} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <Menu className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedCategory === category.id
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};