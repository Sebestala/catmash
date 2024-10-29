import { Cat } from "../../models/Cat";
import axios from "axios";

const CAT_API_URL = "https://data.latelier.co/cats.json";

export const fetchCats = async (): Promise<Cat[]> => {
  try {
    const response = await axios.get<Cat[]>(CAT_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cats:", error);
    throw error;
  }
};
