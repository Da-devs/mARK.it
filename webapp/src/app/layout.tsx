"use client"
import type { Metadata } from "next";
import { AuthProvider } from "./utils/authContext";
import { space_grotesk, akatab } from "./utils/fonts";
import { Navbar } from "@/components/navbar";
import { useDarkMode } from '../hooks/useDarkMode';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <html suppressHydrationWarning lang="en" className={`${space_grotesk.variable} ${akatab.variable}`}>
      <head>
        <title>mARK.it</title>
        <meta name="description" content="Your bookmarks, simplified." />
      </head>
      <body className="font-fspace_grotesk">
        <AuthProvider>
          <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
