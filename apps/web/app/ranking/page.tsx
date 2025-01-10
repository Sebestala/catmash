import { RankingCard } from '@repo/ui'
import { getCats } from '../api/api'

/**
 * RankingPage component fetches and displays a list of ranked cats.
 *
 * @returns {Promise<React.ReactElement | null>} A promise that resolves to the rendered ranking page component
 * or null if no cats are available.
 *
 * Features:
 * - Fetches the list of cats and their scores using the `getCats` API.
 * - Highlights the top 3 cats in a prominent layout with their rank, score, and image.
 * - Displays the remaining cats in a responsive grid format.
 * - Uses the `RankingCard` component to render individual cat rankings.
 */
export default async function RankingPage(): Promise<React.ReactElement | null> {
  const { cats } = await getCats()

  if (!cats || cats.length === 0) return null

  return (
    <div className="top-4 space-y-2 md:space-y-3 px-0 md:px-2 py-4">
      <div className="top-8 grid grid-cols-1 items-end gap-2 md:gap-3 md:grid-cols-3">
        <div className="order-2 md:order-1">
          <RankingCard
            key={cats[1].id}
            url={cats[1].url}
            score={cats[1].score}
            rank={2}
            catNumber={cats[1].catNumber}
          />
        </div>
        <div className="order-1 md:order-2">
          <RankingCard
            key={cats[0].id}
            url={cats[0].url}
            score={cats[0].score}
            rank={1}
            catNumber={cats[0].catNumber}
          />
        </div>
        <div className="order-3">
          <RankingCard
            key={cats[2].id}
            url={cats[2].url}
            score={cats[2].score}
            rank={3}
            catNumber={cats[2].catNumber}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-4">
        {cats.slice(3).map((cat, index) => (
          <RankingCard
            key={cat.id}
            url={cat.url}
            score={cat.score}
            rank={index + 4}
            catNumber={cat.catNumber}
          />
        ))}
      </div>
    </div>
  )
}
