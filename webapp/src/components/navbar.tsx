"use client";
import React from 'react';
import { Grid, Settings, Pen, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">mARK.it</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <Pen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300">
          D
        </div>
      </div>
    </nav>
  );
};
