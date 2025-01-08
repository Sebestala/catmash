import { CatVotingInterface } from './CatVotingInterface'
import { createCats, getCats } from '@/api/api'

export default async function Home() {
  await createCats()
  const { cats } = await getCats()
  return <CatVotingInterface cats={cats} />
}
