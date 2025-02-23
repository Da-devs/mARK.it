"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from "@/app/utils/supabase/client";
import { User } from '@supabase/supabase-js';

// declare const chrome: any;

interface AuthContextType {
  user: User | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  const refreshUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    refreshUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('userUUID'); // Clear UUID on logout
      } else if (session?.user) {
        setUser(session.user);
        localStorage.setItem('userUUID', session.user.id); // Store UUID on login
        const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
        if (browserAPI.runtime && browserAPI.runtime.sendMessage) {
          console.log("Sending message to extension with UUID:", session.user.id);
          browserAPI.runtime.sendMessage("ipagofgebmmdoifcellidcopecibjmom", { uuid: session.user.id }, (response: any) => {
          console.log("Response from extension:", response);
          });
          }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);