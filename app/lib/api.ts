import { Cat } from "@/models/Cat";

export async function fetchAndStoreCats() {
  const response = await fetch("http://localhost:3001/api/cats/fetch", {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }
}

export async function fetchCats(): Promise<{
  cats: Cat[];
  matchesPlayed: number;
}> {
  const response = await fetch("http://localhost:3001/api/cats", {
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }
  return response.json();
}
