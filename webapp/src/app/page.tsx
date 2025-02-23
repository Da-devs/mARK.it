"use client"
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { MobileNav } from '../components/MobileNav';
import { SearchBar } from '../components/SearchBar';
import { NewItemButton } from '../components/NewItemButton';
import { ItemGrid } from '../components/ItemGrid';
import { demoItems } from '../data/items';
import { initialCategories } from '../data/categories';
import { Item } from '../types/index';

function App() {
  const [items] = useState<Item[]>(demoItems);
  const [categories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  const filteredItems = items.filter(item => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        return item.tags.some(tag => category.tags.includes(tag));
      }
    }
    if (searchQuery) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return true;
  });

  const handleHomeClick = () => {
    setSelectedCategory(null);
    setShowCategories(false);
  };

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">      
      <div className="md:flex">

        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          showCategories={showCategories}
          onSelectCategory={setSelectedCategory}
          onHomeClick={handleHomeClick}
          onCategoriesClick={handleCategoriesClick}
        />

        <div className="w-full md:ml-64 p-4 md:p-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <MobileNav onHomeClick={handleHomeClick} />

          {selectedCategory && (
            <div className="max-w-2xl mb-8">
              <div className="flex items-center gap-x-10">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm mt-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  Clear filter
                </button>
              </div>
            </div>
          )}

          <NewItemButton />
          <ItemGrid items={filteredItems} />
        </div>
      </div>
    </div>
  );
}

export default App;