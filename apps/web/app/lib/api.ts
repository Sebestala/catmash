import type { Cat } from '@repo/types'

export async function fetchAndStoreCats() {
  const response = await fetch('http://localhost:3001/api/cats/fetch', {
    next: { revalidate: 3600 }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch cats')
  }
}

export async function fetchCats(): Promise<{
  cats: Cat[]
}> {
  const response = await fetch('http://localhost:3001/api/cats', {
    next: { revalidate: 0 }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch cats')
  }
  return response.json()
}

export async function fetchMatchesPlayed(): Promise<{
  matchesPlayed: number
}> {
  const response = await fetch('http://localhost:3001/api/cats/matchesPlayed', {
    next: { revalidate: 0 }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch cats')
  }
  return response.json()
}

export async function updateCatScore(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3001/api/cats/${id}/score`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to update cat score')
  }
}
