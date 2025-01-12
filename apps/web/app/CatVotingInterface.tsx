'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import type { Cat } from '@repo/types'
import { AnimatePresence } from 'framer-motion'
import { voteForCat } from './actions/vote'
import { useMatches } from '@/app/context/MatchesContext'
import { Loading, CatCard } from '@repo/ui'
interface CatVotingInterfaceProps {
  cats: Cat[]
}

/**
 * CatVotingInterface component displays a pair of cats for voting,
 * allowing users to increment the score of the chosen cat and update the total matches played.
 *
 * @param {Cat[]} cats - Array of cat objects to be used for voting.
 * @returns {React.ReactElement} The rendered voting interface or a loading/empty state.
 *
 * Features:
 * - Fetches a random pair of cats using the `getRandomPair` function.
 * - Handles voting actions by calling the `voteForCat` action and updating the matches played.
 * - Displays a loading spinner during the vote process.
 * - Uses `CatCard` to render individual cat cards with like buttons.
 */
export function CatVotingInterface({ cats }: CatVotingInterfaceProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [pair, setPair] = useState<[Cat, Cat] | null>(null)
  const { incrementMatchesPlayed } = useMatches()

  useEffect(() => {
    setPair(getRandomPair(cats))
  }, [])

  const handleVote = async (id: string) => {
    setIsLoading(true)
    try {
      const result = await voteForCat(id)
      if (result.success) {
        incrementMatchesPlayed()
        setPair(getRandomPair(cats))
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

function getRandomPair(cats: Cat[]): [Cat, Cat] | null {
  if (!cats || cats.length < 2) return null

  const index1 = Math.floor(Math.random() * cats.length)
  const remainingCats = [...cats.slice(0, index1), ...cats.slice(index1 + 1)]
  const index2 = Math.floor(Math.random() * remainingCats.length)

  return [cats[index1], remainingCats[index2]]
}
