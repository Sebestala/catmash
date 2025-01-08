import type { Cat } from '@repo/types'
import Image from 'next/image'

interface RankingCardProps extends Partial<Cat> {
  rank: number
}

/**
 * RankingCard component displays a ranked cat card with a specific border color and aspect ratio,
 * depending on the cat's rank. It shows the cat's image, rank, name, and score.
 *
 * @param {string} url - The URL of the cat image to display.
 * @param {number} score - The score of the cat.
 * @param {number} rank - The rank position of the cat.
 * @param {number} [catNumber] - The identifier or number associated with the cat.
 *
 * @returns {React.ReactElement} The rendered ranking card component.
 */
export function RankingCard({ url, score, rank, catNumber }: RankingCardProps): React.ReactElement {
  const aspectRatio =
    rank === 1
      ? 'aspect-[1.10]'
      : rank === 2
        ? 'aspect-[1.25]'
        : rank === 3
          ? 'aspect-[1.40]'
          : 'aspect-[1.54]'

  const borderColor =
    rank === 1
      ? 'border-yellow-500'
      : rank === 2
        ? 'border-slate-400'
        : rank === 3
          ? 'border-orange-700'
          : 'border-gray-500'

  const textColor =
    rank === 1
      ? 'text-yellow-500'
      : rank === 2
        ? 'text-slate-400'
        : rank === 3
          ? 'text-orange-700'
          : 'text-gray-500'

  return (
    <div
      className={`relative ${aspectRatio} border-2 ${borderColor} overflow-hidden rounded-xl border`}
    >
      <Image
        src={url || ''}
        alt={`Chat ${rank}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`rounded-lg object-cover`}
        fill
        priority
        unoptimized
      />
      <div className="absolute left-1/2 top-6 z-10 flex -translate-x-1/2 flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border ${borderColor} bg-white/80`}
        >
          <p className={`${textColor} font-bold`}>{rank}</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
        <h2 className="mb-1 text-lg font-semibold text-white">Chat {catNumber}</h2>
        <p className="text-sm italic text-white">Score: {score}pts</p>
      </div>
    </div>
  )
}
