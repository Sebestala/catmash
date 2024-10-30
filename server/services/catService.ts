import { supabase } from "../config/supabase";
import { Cat } from "../../models/Cat";

interface CatWithImages {
  images: Partial<Cat>[];
}

const CAT_API_URL = "https://data.latelier.co/cats.json";

export const fetchAndStoreCats = async () => {
  try {
    const response = await fetch(CAT_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CatWithImages = await response.json();
    const cats = data.images;

    cats.forEach((cat, index) => {
      cat.catNumber = index + 1;
      cat.score = 0;
    });

    for (const cat of cats) {
      const { data: existingCat, error: fetchError } = await supabase
        .from("cats")
        .select("id")
        .eq("id", cat.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking cat existence:", fetchError);
        continue;
      }

      if (!existingCat) {
        const { error: insertError } = await supabase.from("cats").insert({
          id: cat.id,
          url: cat.url,
          score: cat.score,
          catNumber: cat.catNumber,
        });

        if (insertError) console.error("Error inserting cat:", insertError);
      }
    }

    console.log("Cats fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching cats:", error);
    throw error;
  }
};

export const getCats = async (): Promise<{
  cats: Cat[];
  matchesPlayed: number;
}> => {
  const { data, error } = await supabase.from("cats").select("*");

  const catsSorted = data?.sort((a, b) => b.score - a.score);
  const matchesPlayed = catsSorted?.reduce((acc, cat) => acc + cat.score, 0);
  if (error) throw error;
  return { cats: catsSorted as Cat[], matchesPlayed };
};
