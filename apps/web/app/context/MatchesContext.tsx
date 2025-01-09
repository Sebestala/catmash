'use client'

import { fetchMatchesCount, incrementMatches } from '../actions/matches'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface MatchesContextProps {
  matchesPlayed: number
  incrementMatchesPlayed: () => Promise<void>
  refreshMatchesCount: () => Promise<void>
}

const MatchesContext = createContext<MatchesContextProps | undefined>(undefined)

export const MatchesProvider = ({
  initialMatchesPlayed,
  children
}: {
  initialMatchesPlayed: number
  children: ReactNode
}) => {
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

export const useMatches = () => {
  const context = useContext(MatchesContext)
  if (!context) {
    throw new Error('useMatches must be used within a MatchesProvider')
  }
  return context
}
