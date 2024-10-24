"use client";

import { useState, useEffect } from "react";
import CatComponent from "@/components/CatLikeBox";

interface Cat {
  id: string;
  url: string;
}

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCats() {
      try {
        const response = await fetch("https://data.latelier.co/cats.json");
        if (!response.ok) {
          throw new Error("Failed to fetch cat data");
        }
        const data = await response.json();
        setCats(data.images.slice(0, 2)); // Only take the first two cats
      } catch {
        setError("Error fetching cat data. Please try again later.");
        console.error("Error fetching cat data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCats();
  }, [error]);

  if (loading) {
    return (
      <div className="-mt-32 flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-800"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-1 py-4 md:px-8 lg:py-8">
      <div className="grid grid-cols-2 gap-4 md:gap-16">
        <CatComponent imageUrl={cats[0].url} catNumber={1} onLike={() => {}} />

        <CatComponent imageUrl={cats[1].url} catNumber={2} onLike={() => {}} />
      </div>
    </div>
  );
}
