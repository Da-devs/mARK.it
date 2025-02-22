import React from 'react';
import { Item } from '../../types';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full transition-colors duration-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{item.date}</div>
      </div>
    </div>
  );
};