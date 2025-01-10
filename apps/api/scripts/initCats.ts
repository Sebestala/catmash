import { createCats } from '../services/catService'

/**
 * Initializes the cat data by calling the `createCats` service.
 *
 * @returns {Promise<void>} Resolves when the initialization is complete.
 *
 * Features:
 * - Calls `createCats` to populate and initialize the cat data.
 */
export default async function initCats(): Promise<void> {
  try {
    console.log('Initializing cats...')
    await createCats()
    console.log('Cats initialized successfully')
  } catch (error) {
    console.error('Failed to initialize cats:', error)
  }
}
