/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { CatCard } from '@/components/CatCard'
import type { Cat } from '@repo/types'
import { AnimatePresence } from 'framer-motion'
import { updateCatScore } from '@/api/api'
import { Loading } from '@/components/Loading'

interface CatVotingInterfaceProps {
  cats: Cat[]
}

export function CatVotingInterface({ cats }: CatVotingInterfaceProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [pair, setPair] = useState<[Cat, Cat] | null>(null)

  const getRandomPair = useCallback((): [Cat, Cat] | null => {
    if (!cats || cats.length < 2) return null
    const shuffled = [...cats].sort(() => 0.5 - Math.random())
    return [shuffled[0], shuffled[1]]
  }, [cats])

  useEffect(() => {
    setPair(getRandomPair())
  }, [getRandomPair])

  const handleVote = async (id: string) => {
    try {
      await updateCatScore(id)
      if (typeof window !== 'undefined' && (window as any).incrementMatchesPlayed) {
        ;(window as any).incrementMatchesPlayed()
      }
      setPair(getRandomPair())
      setIsLoading(true)
      const timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timeoutId)
    } catch (error) {
      console.error('Failed to update cat score:', error)
    }
  }

  if (cats.length < 2) {
    return <div>Pas assez de chats pour faire une paire</div>
  }

  if (!pair) {
    return <Loading />
  }

  return (
    // <Suspense fallback={<Loading />}>
    <div className="grid grid-cols-2 gap-2 sm:gap-8 md:gap-12 px-0 pb-12 sm:px-12 md:px-20 lg:px-28 xl:px-64">
      <AnimatePresence>
        {!isLoading && (
          <>
            <CatCard
              imageUrl={pair[0].url}
              catNumber={pair[0].catNumber}
              onLike={() => handleVote(pair[0].id)}
              position="left"
            />

            <CatCard
              imageUrl={pair[1].url}
              catNumber={pair[1].catNumber}
              onLike={() => handleVote(pair[1].id)}
              position="right"
            />
          </>
        )}
      </AnimatePresence>
    </div>
    // </Suspense>
  )
}
