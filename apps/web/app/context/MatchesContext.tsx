'use client'

import { fetchMatchesCount, incrementMatches } from '../actions/matches'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface MatchesContextProps {
  matchesPlayed: number
  incrementMatchesPlayed: () => Promise<void>
  refreshMatchesCount: () => Promise<void>
}

const MatchesContext = createContext<MatchesContextProps | undefined>(undefined)

/**
 * MatchesProvider component provides context for managing the total matches played
 * and actions to increment or refresh the matches count.
 *
 * @param {number} initialMatchesPlayed - The initial number of matches played.
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered provider component with context values.
 *
 * Context Values:
 * - `matchesPlayed` (number): The total number of matches played.
 * - `incrementMatchesPlayed` (function): Asynchronously increments the matches count and updates the context state.
 * - `refreshMatchesCount` (function): Asynchronously fetches the latest matches count and updates the context state.
 */
export const MatchesProvider = ({
  initialMatchesPlayed,
  children
}: {
  initialMatchesPlayed: number
  children: ReactNode
}): JSX.Element => {
  const [matchesPlayed, setMatchesPlayed] = useState(initialMatchesPlayed)

  const incrementMatchesPlayed = async () => {
    const newCount = await incrementMatches()
    setMatchesPlayed(newCount)
  }

  const refreshMatchesCount = async () => {
    const newCount = await fetchMatchesCount()
    setMatchesPlayed(newCount)
  }

  return (
    <MatchesContext.Provider value={{ matchesPlayed, incrementMatchesPlayed, refreshMatchesCount }}>
      {children}
    </MatchesContext.Provider>
  )
}

/**
 * useMatches custom hook provides access to the Matches context values.
 *
 * @returns {MatchesContextProps} The context values, including `matchesPlayed`, `incrementMatchesPlayed`, and `refreshMatchesCount`.
 *
 * @throws {Error} If used outside of a MatchesProvider, an error is thrown.
 */
export const useMatches = (): MatchesContextProps => {
  const context = useContext(MatchesContext)
  if (!context) {
    throw new Error('useMatches must be used within a MatchesProvider')
  }
  return context
}
