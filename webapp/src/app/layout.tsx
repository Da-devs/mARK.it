import type { Metadata } from "next";
import { space_grotesk, akatab } from "./utils/fonts";
import "./globals.css";

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
      <body className="font-fspace_grotesk">
        {children}
      </body>
    </html>
  );
}
