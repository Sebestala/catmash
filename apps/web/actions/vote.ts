'use server'

import { revalidatePath } from 'next/cache'
import { updateCatScore } from '@/api/api'

/**
 * Server Action: Votes for a specific cat by updating its score and revalidating the ranking page.
 *
 * @param {string} id - The ID of the cat to vote for.
 * @returns {Promise<{ success: boolean, error?: string }>}
 * A promise that resolves to an object indicating the success of the operation, and an error message if applicable.
 *
 * Features:
 * - Updates the cat's score using the `updateCatScore` API call.
 * - Revalidates the `/ranking` path to reflect updated scores.
 * - Handles errors, logging them to the console and returning an error response.
 */
export async function voteForCat(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await updateCatScore(id)
    revalidatePath('/ranking')
    return { success: true }
  } catch (error) {
    console.error('Failed to update cat score:', error)
    return { success: false, error: 'Failed to update cat score' }
  }
}
