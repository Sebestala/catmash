"use client";

import { useState, useEffect } from "react";
import { CatLikeBox } from "@/components/CatLikeBox";
import { useCatContext } from "@/context/CatContext";
import { Cat } from "@/models/Cat";
import { AnimatePresence } from "framer-motion";

export function CatVotingInterface(): React.ReactElement {
  const { getRandomPair, incrementScore, isFetching, isLoading, setIsLoading } =
    useCatContext();
  const [pair, setPair] = useState<[Cat, Cat] | null>(null);

  useEffect(() => {
    setPair(getRandomPair());
  }, [getRandomPair]);

  const handleVote = (id: string) => {
    incrementScore(id);
    setPair(getRandomPair());
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  if (!pair || isFetching) {
    return (
      <div className="-mt-32 flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-12 md:gap-20">
      <AnimatePresence>
        {!isLoading && (
          <>
            <CatLikeBox
              imageUrl={pair[0].url}
              catNumber={pair[0].catNumber}
              onLike={() => handleVote(pair[0].id)}
              position="left"
            />

            <CatLikeBox
              imageUrl={pair[1].url}
              catNumber={pair[1].catNumber}
              onLike={() => handleVote(pair[1].id)}
              position="right"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
