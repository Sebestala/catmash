import { createCats } from '../services/catService'

async function initCats() {
  try {
    console.log('Initializing cats...')
    await createCats()
    console.log('Cats initialized successfully')
  } catch (error) {
    console.error('Failed to initialize cats:', error)
  }
}

export default initCats
