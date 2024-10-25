"use client";

import { useState, useEffect } from "react";
import { CatLikeBox } from "@/components/CatLikeBox";
import { useCatContext } from "@/context/CatContext";
import { Cat } from "@/models/Cat";
import { AnimatePresence } from "framer-motion";

/**
 * Home component displays a pair of cats for voting, allowing users to increment the score of their preferred cat.
 *
 * @returns {JSX.Element} The rendered home component with two `CatLikeBox` components for voting.
 *
 * Features:
 * - Fetches a random pair of cats from the `CatContext` and displays them side-by-side.
 * - Handles vote actions by updating the score of the selected cat and fetching a new pair.
 * - Shows a loading spinner while fetching new cats or if data is being refreshed.
 */
export default function Home(): React.ReactElement {
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
    </div>
  );
}
