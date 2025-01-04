/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { CatLikeBox } from '@/components/CatLikeBox'
import type { Cat } from '@repo/types'
import { AnimatePresence } from 'framer-motion'
import { updateCatScore } from './lib/api'

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

  if (!pair) {
    return (
      <div className="-mt-32 flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-12 md:gap-20">
      <AnimatePresence>
        {!isLoading && (
          <>
            <CatLikeBox
              imageUrl={pair[0].url}
              catNumber={pair[0].catNumber}
              onLike={() => handleVote(pair[0].id)}
              position="left"
            />

            <CatLikeBox
              imageUrl={pair[1].url}
              catNumber={pair[1].catNumber}
              onLike={() => handleVote(pair[1].id)}
              position="right"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
