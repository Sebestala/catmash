import { supabase } from '../config/supabase'
import type { Cat } from '@repo/types'
import { NotFoundError, BadRequestError, DatabaseError, ExternalApiError } from '../utils/errors'

const CAT_API_URL = 'https://data.latelier.co/cats.json'

export async function fetchExternalCatsAndStoreIt(): Promise<Cat[]> {
  try {
    const catsImages = await fetchExternalCatsImages()
    const cats = catsImages.map((cat, index) => ({
      ...cat,
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
    throw new ExternalApiError('Failed to fetch and store cats')
  }
}

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

export async function getMatchesPlayed(): Promise<number> {
  const { data, error } = await supabase.from('cats').select('score')

  if (error) {
    throw new DatabaseError('Failed to fetch matches played')
  }

  if (!data) {
    throw new NotFoundError('No cat data found')
  }

  return data.reduce((sum, cat) => sum + (cat.score || 0), 0)
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
