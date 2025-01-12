import type { Cat } from '@repo/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Fetches the list of cats from the API.
 *
 * @returns {Promise<{ cats: Cat[] }>} A promise that resolves to an object containing an array of cats.
 *
 * Features:
 * - Sends a GET request to the `/api/cats` endpoint.
 * - Ensures no caching by setting `next.revalidate` to 0.
 * - Throws an error if the response is not successful.
 */
export async function getCats(): Promise<{
  cats: Cat[]
}> {
  const response = await fetch(`${API_URL}/api/cats`, {
    next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return { cats: data }
}

/**
 * Updates the score of a specific cat by its ID.
 *
 * @param {string} id - The ID of the cat to update.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 *
 * Features:
 * - Sends a PUT request to the `/api/cats/:id` endpoint.
 * - Includes the content type as `application/json` in the request headers.
 * - Throws an error if the response is not successful.
 */
export async function updateCatScore(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/cats/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to update cat score')
  }
}

/**
 * Fetches the total number of matches played from the API.
 *
 * @returns {Promise<number>} A promise that resolves to the total matches played.
 *
 * Features:
 * - Sends a GET request to the `/api/matches` endpoint.
 * - Ensures no caching by setting `next.revalidate` to 0.
 * - Throws an error if the response is not successful.
 */
export async function getMatchesPlayed(): Promise<number> {
  const response = await fetch(`${API_URL}/api/matches`, {
    next: { revalidate: 0 }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}
