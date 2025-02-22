"use client";
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from "../app/utils/supabase/client";
import { signout } from "@/lib/auth-actions";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const handleLogoClick = () => {
    router.push('/');
  };
  const handleRegisterClick = () => {
    router.push('/signup');
  };
  const handleLoginClick = () => {
    router.push('/login');
  };
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
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
          <button onClick={signout} className='dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Logout</button>
        ) : (
          <>
            <button onClick={handleLoginClick} className='dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Login</button>
            <button onClick={handleRegisterClick} className='hidden md:block dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Sign Up</button>
          </>
        )}
        {/* <button onClick={handleLoginClick} className='dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Login</button> */}
        {/* <button onClick={handleRegisterClick} className='hidden md:block dark:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>Sign Up</button> */}
      </div>
    </nav>
  );
};
