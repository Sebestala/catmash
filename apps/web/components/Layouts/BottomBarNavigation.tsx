'use client'

import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchMatchesPlayed } from '@/api/api'

interface BottomBarNavigationProps {
  initialMatchesPlayed: number
}

export function BottomBarNavigation({
  initialMatchesPlayed
}: BottomBarNavigationProps): React.ReactElement {
  const router = useRouter()
  const pathname = usePathname()
  const [matchesPlayed, setMatchesPlayed] = useState(initialMatchesPlayed)

  useEffect(() => {
    const updateMatchesCount = async () => {
      try {
        const data: number = await fetchMatchesPlayed()
        setMatchesPlayed(data)
      } catch (error) {
        console.error('Failed to fetch matches count:', error)
      }
    }

    const intervalId = setInterval(updateMatchesCount, 10000)

    return () => clearInterval(intervalId)
  }, [])

  const incrementMatchesPlayed = () => {
    setMatchesPlayed((prev) => prev + 1)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).incrementMatchesPlayed = incrementMatchesPlayed
    }
  }, [])

  const handleClick = () => {
    if (pathname === '/') {
      router.push('/ranking')
    } else {
      router.push('/')
    }
  }

  return (
    <footer className="fixed -bottom-0.5 z-50 w-screen">
      <nav
        className="flex justify-center"
        onClick={handleClick}
      >
        <div className="rounded-t-lg border border-blue-950 bg-white md:w-1/2 md:max-w-md">
          <Link
            href="/"
            className="h-full w-full"
          >
            <div className="flex flex-col items-center justify-center space-y-0.5 px-4 py-1 md:space-y-2">
              <ChevronUp
                size={22}
                strokeWidth={2.2}
                color="black"
              />
              <h2 className="text-sm font-semibold text-blue-900 md:text-lg lg:text-xl">
                Voir le classement des chats
              </h2>
              <p className="text-sm text-blue-800 md:text-base lg:text-lg">
                <span className="font-bold">{matchesPlayed}</span> Matchs joués
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </footer>
  )
}
