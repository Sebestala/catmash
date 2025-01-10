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
 * RootLayout component provides the main structure for the Catmash application,
 * including global styles, font configurations, and context providers.
 *
 * @param {Readonly<{ children: React.ReactNode }>} children - The content to be displayed within the layout.
 * @returns {Promise<React.ReactElement>} The rendered root layout component.
 *
 * Features:
 * - Sets metadata for the application, including title and description.
 * - Loads and applies custom local fonts (Geist Sans and Geist Mono) with CSS variables for styling.
 * - Fetches the initial matches played count and provides it to the `MatchesProvider` context.
 * - Includes a fixed top navigation bar (`TopCatBar`) and a bottom navigation bar (`BottomBarNavigation`).
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
