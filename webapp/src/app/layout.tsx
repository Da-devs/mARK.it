import type { Metadata } from "next";
import { space_grotesk, akatab } from "./utils/fonts";
import Navbar from "@/components/navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-providers";

export const metadata: Metadata = {
  title: "mARK.it",
  description: "Your bookmarks, simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${space_grotesk.variable} ${akatab.variable}`}>
      <body className="mt-3 font-fspace_grotesk">
        <ThemeProvider attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
