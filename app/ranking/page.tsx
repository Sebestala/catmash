"use client";

import { RankingCard } from "@/components/RankingCard";
import { useCatContext } from "@/context/CatContext";

/**
 * RankingPage component displays a list of ranked cats based on their scores.
 * The top three cats are highlighted in a separate layout, followed by the remaining cats in a grid.
 *
 * @returns {JSX.Element | null} The rendered ranking page component, or null if there are no cats to display.
 *
 * Features:
 * - Fetches and sorts cat data from the `CatContext` by score in descending order.
 * - Highlights the top three cats in a prominent layout.
 */
export default function RankingPage(): React.ReactElement | null {
  const { cats } = useCatContext();

  const sortedCats = [...cats].sort((a, b) => b.score - a.score);

  if (!sortedCats || sortedCats.length === 0) return null;

  return (
    <div className="space-y-4 px-6 py-4 md:space-y-8">
      <div className="grid grid-cols-3 items-end gap-4 sm:gap-6 md:gap-8">
        <RankingCard
          key={sortedCats[1].id}
          url={sortedCats[1].url}
          score={sortedCats[1].score}
          rank={2}
          catNumber={sortedCats[1].catNumber}
        />
        <RankingCard
          key={sortedCats[0].id}
          url={sortedCats[0].url}
          score={sortedCats[0].score}
          rank={1}
          catNumber={sortedCats[0].catNumber}
        />
        <RankingCard
          key={sortedCats[2].id}
          url={sortedCats[2].url}
          score={sortedCats[2].score}
          rank={3}
          catNumber={sortedCats[2].catNumber}
        />
      </div>
      <div className="grid grid-cols-4 md:gap-8">
        {sortedCats.slice(3).map((cat, index) => (
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
  );
}
