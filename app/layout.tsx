import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CatProvider } from "@/context/CatContext";
import { BottomBarNavigation } from "@/components/Layouts/BottomBarNavigation";
import TopCatBar from "@/components/Layouts/TopCatBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Catmash",
  description: "Tournament of pretty cats",
};

/**
 * RootLayout component provides the root structure for the "Catmash" application,
 * including metadata, font settings, and layout structure.
 *
 * @param {Readonly<{ children: React.ReactNode }>} children - The content to be displayed within the layout.
 * @returns {JSX.Element} The rendered root layout component.
 *
 * Features:
 * - Wraps the application in `CatProvider` to supply cat-related context.
 * - Includes a fixed top navigation bar (`TopCatBar`) and a bottom navigation bar (`BottomBarNavigation`).
 * - Provides padding adjustments to ensure content is spaced appropriately from fixed headers and footers.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CatProvider>
          <header className="fixed top-0 z-50 w-full">
            <TopCatBar />
          </header>
          <main className="mt-28 py-4 md:mt-20 lg:mt-24 lg:py-8">
            {children}
          </main>
          <footer>
            <BottomBarNavigation />
          </footer>
        </CatProvider>
      </body>
    </html>
  );
}
