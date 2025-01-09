'use server'

import { revalidatePath } from 'next/cache'
import { updateCatScore } from '@/api/api'

export async function voteForCat(id: string) {
  try {
    await updateCatScore(id)
    revalidatePath('/ranking')
    return { success: true }
  } catch (error) {
    console.error('Failed to update cat score:', error)
    return { success: false, error: 'Failed to update cat score' }
  }
}
