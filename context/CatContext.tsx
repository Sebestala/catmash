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

/**
 * useCatContext custom hook to access the Cat context values.
 *
 * @returns {CatContextType} The cat context values, including cats, matchesPlayed, incrementScore, and more.
 *
 * @throws {Error} If used outside of a CatProvider, an error will be thrown.
 */
export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCatContext must be used within a CatProvider");
  }
  return context;
};

/**
 * CatProvider component provides context for managing cat data, match statistics, and loading states.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered provider component with context values.
 *
 * Context Values:
 * - cats (Cat[]): Array of cat data, each with an ID, URL, score, and catNumber.
 * - matchesPlayed (number): Total number of matches or votes made.
 * - incrementScore (function): Function to increment the score of a specific cat by ID.
 * - getRandomPair (function): Function to fetch a random pair of cats for voting.
 * - isFetching (boolean): Indicates if the cat data is being fetched from the API.
 * - isLoading (boolean): Indicates if a vote action is in progress.
 * - setIsLoading (function): Function to update the `isLoading` state.
 *
 * Usage:
 * Wrap your components with CatProvider to access and manage cat data and match statistics.
 */
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
          data.images.map((cat: Cat, index: number) => ({
            ...cat,
            score: 0,
            index: index + 1,
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
