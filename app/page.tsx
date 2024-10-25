"use client";

import { useState, useEffect } from "react";
import { CatLikeBox } from "@/components/CatLikeBox";
import { useCatContext } from "@/context/CatContext";
import { Cat } from "@/models/Cat";
import { AnimatePresence } from "framer-motion";

export default function Home() {
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
    <div className="px-6 sm:px-12 md:px-20 lg:px-28 xl:px-64">
      <div className="grid grid-cols-2 gap-4 sm:gap-12 md:gap-20">
        <AnimatePresence>
          {!isLoading && (
            <>
              <CatLikeBox
                imageUrl={pair[0].url}
                catNumber={1}
                onLike={() => handleVote(pair[0].id)}
              />

              <CatLikeBox
                imageUrl={pair[1].url}
                catNumber={2}
                onLike={() => handleVote(pair[1].id)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
