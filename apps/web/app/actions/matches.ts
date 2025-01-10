'use server'

import { getMatchesPlayed } from '../api/api'

/**
 * Server Action: Increments and fetches the updated count of matches played.
 *
 * @returns {Promise<number>} A promise that resolves to the updated number of matches played.
 *
 * Features:
 * - Fetches the latest matches count from the `getMatchesPlayed` API call.
 */
export async function incrementMatches(): Promise<number> {
  const newMatchesCount = await getMatchesPlayed()
  return newMatchesCount
}

/**
 * Server Action: Fetches the total number of matches played with error handling.
 *
 * @returns {Promise<number>} A promise that resolves to the total matches played or 0 if an error occurs.
 *
 * Features:
 * - Retrieves the matches count from the `getMatchesPlayed` API call.
 * - Logs errors to the console if fetching fails.
 */
export async function fetchMatchesCount(): Promise<number> {
  try {
    const newMatchesPlayed = await getMatchesPlayed()
    return newMatchesPlayed
  } catch (error) {
    console.error('Error fetching matches:', error)
    return 0
  }
}
