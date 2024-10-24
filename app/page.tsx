"use client";

import { useState, useEffect } from "react";
import CatComponent from "@/components/CatLikeBox";
import { useCatContext } from "@/context/CatContext";
import { Cat } from "@/models/Cat";

export default function Home() {
  const { getRandomPair, incrementScore, isFetching } = useCatContext();
  const [pair, setPair] = useState<[Cat, Cat] | null>(null);

  useEffect(() => {
    setPair(getRandomPair());
  }, [getRandomPair]);

  const handleVote = (id: string) => {
    incrementScore(id);
    setPair(getRandomPair());
  };

  if (!pair || isFetching) {
    return (
      <div className="-mt-32 flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 py-4 md:px-8 lg:py-8">
      <div className="grid grid-cols-2 gap-4 md:gap-16">
        <CatComponent
          imageUrl={pair[0].url}
          catNumber={1}
          onLike={() => handleVote(pair[0].id)}
        />

        <CatComponent
          imageUrl={pair[1].url}
          catNumber={2}
          onLike={() => handleVote(pair[1].id)}
        />
      </div>
    </div>
  );
}
