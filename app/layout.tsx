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
          <main>{children}</main>
          <footer>
            <BottomBarNavigation />
          </footer>
        </CatProvider>
      </body>
    </html>
  );
}
