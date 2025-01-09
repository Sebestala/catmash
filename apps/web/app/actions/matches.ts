'use server'

import { getMatchesPlayed } from '@/api/api'

export async function incrementMatches() {
  const newMatchesCount = await getMatchesPlayed()
  return newMatchesCount
}

export async function fetchMatchesCount() {
  try {
    const newMatchesPlayed = await getMatchesPlayed()
    return newMatchesPlayed
  } catch (error) {
    console.error('Error fetching matches:', error)
    return 0
  }
}
