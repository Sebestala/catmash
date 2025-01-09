import { CatVotingInterface } from './CatVotingInterface'
import { getCats } from './api/api'

export default async function Home() {
  const { cats } = await getCats()
  return <CatVotingInterface cats={cats} />
}
