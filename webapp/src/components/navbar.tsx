"use client";
import React from 'react';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };
  const handleRegisterClick = () => {
    router.push('/register');
  };
  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center space-x-2">
        <Image src="/icon.svg" className='dark:invert' alt="mARK.it" width={30} height={30} />
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">mARK.it</span>
      </div>
      
      <div className="flex items-center space-x-4">
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
        <button onClick={handleLoginClick} className='dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Login</button>
        <button onClick={handleRegisterClick} className='hidden md:block dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Sign Up</button>
      </div>
    </nav>
  );
};
