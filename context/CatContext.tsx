"use client";

import { Cat } from "@/models/Cat";
import React, { createContext, useState, useContext, useEffect } from "react";

interface CatContextType {
  cats: Cat[];
  matchesPlayed: number;
  incrementScore: (id: string) => void;
  getRandomPair: () => [Cat, Cat] | null;
  isFetching: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCatContext must be used within a CatProvider");
  }
  return context;
};

export const CatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("https://data.latelier.co/cats.json")
      .then((response) => response.json())
      .then((data: { images: Cat[] }) => {
        setCats(
          data.images.map((cat: Cat) => ({
            ...cat,
            score: 0,
          })),
        );
      })
      .catch((error) => {
        console.error("Error fetching cat data:", error);
        setIsFetching(false);
      })
      .finally(() => setIsFetching(false));
  }, []);

  const incrementScore = (id: string) => {
    setCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, score: cat.score + 1 } : cat,
      ),
    );
    setMatchesPlayed((prev) => prev + 1);
  };

  const getRandomPair = (): [Cat, Cat] | null => {
    if (cats.length < 2) return null;
    const shuffled = [...cats].sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
  };

  return (
    <CatContext.Provider
      value={{
        cats,
        matchesPlayed,
        incrementScore,
        getRandomPair,
        isFetching,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};
