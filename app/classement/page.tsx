"use client";

import { RankingCard } from "@/components/RankingCard";
import { useCatContext } from "@/context/CatContext";

export default function ClassementPage() {
  const { cats } = useCatContext();

  const sortedCats = [...cats].sort((a, b) => b.score - a.score);

  if (!sortedCats || sortedCats.length === 0) return null;

  return (
    <div className="space-y-4 px-6 py-4 md:space-y-8">
      <div className="grid grid-cols-3 items-end gap-4 sm:gap-6 md:gap-8">
        <RankingCard
          key={sortedCats[1].id}
          imageUrl={sortedCats[1].url}
          score={sortedCats[1].score}
          rank={2}
          name={`Chat ${2}`}
        />
        <RankingCard
          key={sortedCats[0].id}
          imageUrl={sortedCats[0].url}
          score={sortedCats[0].score}
          rank={1}
          name={`Chat ${1}`}
        />
        <RankingCard
          key={sortedCats[2].id}
          imageUrl={sortedCats[2].url}
          score={sortedCats[2].score}
          rank={3}
          name={`Chat ${3}`}
        />
      </div>
      <div className="grid grid-cols-4 md:gap-8">
        {sortedCats.slice(3).map((cat, index) => (
          <RankingCard
            key={cat.id}
            imageUrl={cat.url}
            score={cat.score}
            rank={index + 4}
            name={`Chat ${index + 4}`}
          />
        ))}
      </div>
    </div>
  );
}
