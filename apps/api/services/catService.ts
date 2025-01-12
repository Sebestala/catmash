import { supabase } from '../config/supabase'
import type { Cat } from '@repo/types'
import { NotFoundError, BadRequestError, DatabaseError, ExternalApiError } from '../utils/errors'

const CAT_API_URL = 'https://data.latelier.co/cats.json'

/**
 * Creates and initializes cat data in the database.
 *
 * @returns {Promise<Cat[]>} A promise that resolves to the list of cats.
 *
 * Features:
 * - Fetches cat images from an external API.
 * - Inserts new cats into the database if they don't already exist.
 * - Fetches and returns all cats after initialization.
 *
 * @throws {DatabaseError | ExternalApiError} If there is an error with the database or the external API.
 */
export async function createCats(): Promise<Cat[]> {
  try {
    const catsImages = await fetchExternalCatsImages()
    const cats = catsImages.map((cat, index) => ({
      id: cat.id,
      url: ensureHttps(cat.url || ''),
      catNumber: index + 1,
      score: 0
    }))

    for (const cat of cats) {
      const { data: existingCat, error: fetchError } = await supabase
        .from('cats')
        .select('id')
        .eq('id', cat.id)
        .maybeSingle()

      if (fetchError) {
        throw new DatabaseError(`Error checking cat existence: ${fetchError.message}`)
      }

      if (!existingCat) {
        const { error: insertError } = await supabase.from('cats').insert(cat)

        if (insertError) {
          throw new DatabaseError(`Error inserting cat: ${insertError.message}`)
        }
      }
    }

    return await getCats()
  } catch (error) {
    if (error instanceof DatabaseError || error instanceof ExternalApiError) {
      throw error
    }
    throw new ExternalApiError('Failed to fetch and store cats')
  }
}

/**
 * Fetches all cats from the database, sorted by score in descending order.
 *
 * @returns {Promise<Cat[]>} A promise that resolves to the list of cats.
 *
 * @throws {DatabaseError} If there is an error fetching cats from the database.
 * @throws {NotFoundError} If no cats are found in the database.
 */
export async function getCats(): Promise<Cat[]> {
  const { data, error } = await supabase
    .from('cats')
    .select('id, url, score, catNumber')
    .order('score', { ascending: false })

  if (error) {
    throw new DatabaseError('Failed to fetch cats from database')
  }

  if (!data || data.length === 0) {
    throw new NotFoundError('No cats found in the database')
  }

  return data
}

/**
 * Updates the score of a specific cat by its ID.
 *
 * @param {string} id - The ID of the cat to update.
 * @returns {Promise<Cat>} A promise that resolves to the updated cat.
 *
 * @throws {BadRequestError} If the provided cat ID is invalid.
 * @throws {DatabaseError} If there is an error updating the cat score or fetching the updated cat.
 * @throws {NotFoundError} If the cat is not found after the update.
 */
export async function updateCatScore(id: string): Promise<Cat> {
  if (!id) {
    throw new BadRequestError('Invalid cat ID')
  }

  const { error } = await supabase.rpc('increment_score', { row_id: id })

  if (error) {
    throw new DatabaseError(`Failed to update cat score: ${error.message}`)
  }

  const { data, error: fetchError } = await supabase
    .from('cats')
    .select('id, url, score, catNumber')
    .eq('id', id)
    .single()

  if (fetchError) {
    throw new DatabaseError('Failed to fetch updated cat')
  }

  if (!data) {
    throw new NotFoundError('Cat not found after update')
  }

  return data
}

/**
 * Fetches the total number of matches played by summing up cat scores.
 *
 * @returns {Promise<number>} A promise that resolves to the total number of matches played.
 *
 * @throws {DatabaseError} If there is an error fetching cat scores.
 * @throws {NotFoundError} If no cat data is found.
 */
export async function getMatchesPlayed(): Promise<number> {
  const { data, error } = await supabase.from('cats').select('score')

  if (error) {
    throw new DatabaseError('Failed to fetch matches played')
  }

  if (!data) {
    throw new NotFoundError('No cat data found')
  }

  return data.reduce((sum: number, cat: { score: number }) => sum + (cat.score || 0), 0)
}

async function fetchExternalCatsImages(): Promise<Partial<Cat>[]> {
  try {
    const response = await fetch(CAT_API_URL)
    const data = await response.json()
    return data.images
  } catch (error) {
    throw new ExternalApiError('Failed to fetch cats from external API')
  }
}

function ensureHttps(url: string): string {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}
