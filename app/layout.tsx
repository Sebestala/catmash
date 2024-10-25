import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import ResponsiveCatImage from "@/components/ResponsiveCatImage";
import { CatProvider } from "@/context/CatContext";

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
        <header className="fixed top-0 z-50 w-full">
          <div className="flex w-full flex-col items-center justify-center space-y-2 p-4">
            <ResponsiveCatImage />
            <h1 className="text-md flex items-center justify-center font-bold text-blue-900 md:text-lg lg:text-xl">
              CATMASH
            </h1>
          </div>
        </header>
        <main>
          <CatProvider>{children}</CatProvider>
        </main>
        <footer>
          <nav className="flex justify-center">
            <div className="fixed -bottom-0.5 z-50 rounded-t-lg border border-blue-950 bg-white md:w-1/2 md:max-w-md">
              <Link href="/" className="h-full w-full">
                <div className="flex flex-col items-center justify-center space-y-0.5 px-4 py-1 md:space-y-2">
                  <ChevronUp size={22} strokeWidth={2.2} color="black" />
                  <h2 className="text-sm font-semibold text-blue-900 md:text-lg lg:text-xl">
                    Voir le classement des chats
                  </h2>
                  <p className="text-sm text-blue-800 md:text-base lg:text-lg">
                    X Matchs joués
                  </p>
                </div>
              </Link>
            </div>
          </nav>
        </footer>
      </body>
    </html>
  );
}
