import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ResponsiveCatImage from "@/components/ResponsiveCatImage";
import { CatProvider } from "@/context/CatContext";
import { BottomBarNavigation } from "@/components/Layouts/BottomBarNavigation";

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
            <div className="flex w-full flex-col items-center justify-center space-y-2 p-4">
              <ResponsiveCatImage />
              <h1 className="text-md flex items-center justify-center font-bold text-blue-900 md:text-lg lg:text-xl">
                CATMASH
              </h1>
            </div>
          </header>
          <main>{children}</main>
          <footer>
            <BottomBarNavigation />
          </footer>
        </CatProvider>
      </body>
    </html>
  );
}
