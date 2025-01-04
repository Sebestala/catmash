import { CatVotingInterface } from './CatVotingInterface'
import { fetchAndStoreCats, fetchCats } from './lib/api'

export default async function Home() {
  await fetchAndStoreCats()
  const { cats } = await fetchCats()
  return (
    <div className="px-6 pb-12 sm:px-12 md:px-20 lg:px-28 xl:px-64">
      <CatVotingInterface cats={cats} />
    </div>
  )
}
