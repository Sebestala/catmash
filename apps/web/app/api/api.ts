import type { Cat } from '@repo/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getCats(): Promise<{
  cats: Cat[]
}> {
  const response = await fetch(`${API_URL}/api/cats`, {
    next: { revalidate: 0 }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return { cats: data }
}

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

export async function getMatchesPlayed(): Promise<number> {
  const response = await fetch(`${API_URL}/api/matches`, {
    next: { revalidate: 0 }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}