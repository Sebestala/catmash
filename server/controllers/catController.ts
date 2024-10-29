import { Request, Response } from "express";
import { fetchCats } from "../services/catService";

export const getCats = async (req: Request, res: Response) => {
  try {
    const cats = await fetchCats();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cats", error });
  }
};
