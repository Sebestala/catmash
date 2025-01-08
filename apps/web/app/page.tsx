import { CatVotingInterface } from './CatVotingInterface'
import { createCats, getCats } from '@/api/api'

export default async function Home() {
  await createCats()
  const { cats } = await getCats()
  return (
    <div className="px-6 pb-12 sm:px-12 md:px-20 lg:px-28 xl:px-64">
      <CatVotingInterface cats={cats} />
    </div>
  )
}
