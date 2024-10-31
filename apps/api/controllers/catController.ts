import { Request, Response } from "express";
import * as catService from "../services/catService";

export const fetchAndStoreCats = async (req: Request, res: Response) => {
  try {
    await catService.fetchAndStoreCats();
    res.status(200).json({ message: "Cats fetched and stored successfully" });
  } catch {
    res.status(500).json({ error: "Error fetching and storing cats" });
  }
};

export const getCats = async (req: Request, res: Response) => {
  try {
    const cats = await catService.getCats();
    res.status(200).json(cats);
  } catch {
    res.status(500).json({ error: "Error fetching cats" });
  }
};

export const updateCatScore = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await catService.updateCatScore(id);
    res.status(200).json({ message: "Cat score updated successfully" });
  } catch {
    res.status(500).json({ error: "Error updating cat score" });
  }
};

export const getMatchesPlayed = async (req: Request, res: Response) => {
  try {
    const matchesPlayed = await catService.getMatchesPlayed();
    res.status(200).json(matchesPlayed);
  } catch {
    res.status(500).json({ error: "Error fetching matches played" });
  }
};
