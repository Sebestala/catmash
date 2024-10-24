import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

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
            <Image
              src="/cat_topBar.webp"
              alt="Happy Cat"
              width={50}
              height={50}
              priority
            />
            <h1 className="flex items-center justify-center text-lg font-bold text-blue-900 md:text-xl lg:text-2xl">
              CATMASH
            </h1>
          </div>
        </header>
        <main className="container mx-auto flex-grow px-4 py-8">
          {children}
        </main>
        <footer>
          <nav className="flex justify-center">
            <div className="fixed -bottom-1 z-50 rounded-t-lg border-2 border-blue-950 md:w-1/2 md:max-w-md">
              <Link href="/" className="h-full w-full">
                <div className="flex flex-col items-center justify-center space-y-2 p-4">
                  <ChevronUp size={28} strokeWidth={2.2} color="black" />
                  <h2 className="text-base font-semibold text-blue-900">
                    Voir le classement des chats
                  </h2>
                  <p className="text-sm text-blue-800">X Matchs joués</p>
                </div>
              </Link>
            </div>
          </nav>
        </footer>
      </body>
    </html>
  );
}
