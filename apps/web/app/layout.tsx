import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@repo/ui/styles.css'
import { getMatchesPlayed } from '@/app/api/api'
import { MatchesProvider } from '@/app/context/MatchesContext'
import { cn } from '@repo/ui'
import { TopCatBar } from './components/Layouts/TopCatBar'
import { BottomBarNavigation } from './components/Layouts/BottomBarNavigation'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Catmash',
  description: 'Tournament of pretty cats'
}

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
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.ReactElement> {
  const initialMatchesPlayed = await getMatchesPlayed()
  return (
    <html lang="fr">
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        <MatchesProvider initialMatchesPlayed={initialMatchesPlayed}>
          <TopCatBar />
          <main className="overflow-hidden px-4 py-4 pt-32 md:pt-28 lg:pt-32 xl:pt-40">
            {children}
          </main>
          <BottomBarNavigation />
        </MatchesProvider>
      </body>
    </html>
  )
}
