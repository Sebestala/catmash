'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { CatCard } from '@/components/CatCard'
import type { Cat } from '@repo/types'
import { AnimatePresence } from 'framer-motion'
import { Loading } from '@/components/Loading'
import { voteForCat } from './actions/vote'

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
    setIsLoading(true)
    try {
      const result = await voteForCat(id)
      if (result.success) {
        if (typeof window !== 'undefined' && (window as any).incrementMatchesPlayed) {
          ;(window as any).incrementMatchesPlayed()
        }
        setPair(getRandomPair())
      } else {
        console.error('Failed to update cat score:', result.error)
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }

  if (cats.length < 2) {
    return <div>Pas assez de chats pour faire une paire</div>
  }

  if (!pair) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  )
}
