"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signout } from "@/lib/auth-actions";
import Link from 'next/link';
import { useAuth } from '@/app/utils/authContext';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleLogoClick = () => {
    router.push('/');
  };
  const handleRegisterClick = () => {
    router.push('/signup');
  };
  const handleLoginClick = () => {
    router.push('/login');
  };
  const handleLogout = async () => {
    try {
      await signout();
      await refreshUser(); 
      setDropdownOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(user);
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div onClick={handleLogoClick} className="flex items-center space-x-2">
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
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* <button onClick={signout} className='dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Logout</button> */}
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 transition">
              <Image
                src={user.user_metadata.avatar_url || "/profile.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{user.user_metadata.full_name || user.email}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <Link
                    href="/dashboard/overview"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={handleLoginClick} className='dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Login</button>
            <button onClick={handleRegisterClick} className='hidden md:block dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};
