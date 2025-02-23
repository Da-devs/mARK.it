"use client"

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { MobileNav } from '../components/MobileNav';
import { SearchBar } from '../components/SearchBar';
import { NewItemButton } from '../components/NewItemButton';
import { useSupabaseGet } from '@/components/useSupabaseGet';
import { initialCategories } from '../data/categories';
import { Item, AuthData } from '../types/index';

interface ContentCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url?: string;
  created_at: string;
  category_id: string;
}

const ContentCard = ({ content }: { content: ContentCard }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    {content.image_url && (
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={content.image_url} 
          alt={content.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {content.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
        {content.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {content.tags.map(tag => (
          <span 
            key={tag}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ContentGrid = ({ items }: { items: ContentCard[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => (
      <ContentCard key={item.id} content={item} />
    ))}
  </div>
);

function HomePage({ authData }: { authData: AuthData }) {
  const { getFromSupabase, isLoading, error } = useSupabaseGet();
  const [content, setContent] = useState<ContentCard[]>([]);
  const [categories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getFromSupabase<ContentCard[]>('content', authData, {
          queryParams: selectedCategory ? { category_id: selectedCategory } : undefined
        });
        setContent(data || []);
      } catch (err) {
        console.error('Error fetching content:', err);
      }
    };

    fetchContent();
  }, [selectedCategory, authData]);

  const filteredContent = content.filter(item => {
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

          {isLoading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 dark:text-red-400 mb-4">
              Error loading content: {error.message}
            </div>
          )}

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
          <ContentGrid items={filteredContent} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;