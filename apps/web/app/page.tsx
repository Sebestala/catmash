import { CatVotingInterface } from './CatVotingInterface'
import { getCats } from './api/api'

/**
 * Home component fetches the list of cats and renders the `CatVotingInterface` for user interaction.
 *
 * @returns {Promise<React.ReactElement>} A promise that resolves to the rendered home page component.
 *
 * Features:
 * - Fetches the list of cats using the `getCats` API.
 * - Passes the fetched cats to the `CatVotingInterface` for voting functionality.
 */
export default async function Home(): Promise<React.ReactElement> {
  const { cats } = await getCats()
  return <CatVotingInterface cats={cats} />
}
