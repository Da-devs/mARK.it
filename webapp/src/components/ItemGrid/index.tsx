import React from 'react';
import { Item } from '../../types';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  items: Item[];
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};