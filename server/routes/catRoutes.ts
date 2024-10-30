import express from "express";
import {
  fetchAndStoreCats,
  getCats,
  updateCatScore,
  getMatchesPlayed,
} from "../controllers/catController";

const router = express.Router();

export const fetchAndStoreCatsRoute = router.get(
  "/cats/fetch",
  fetchAndStoreCats,
);

export const getCatsRoute = router.get("/cats", getCats);

export const updateCatScoreRoute = router.put(
  "/cats/:id/score",
  updateCatScore,
);

export const getMatchesPlayedRoute = router.get(
  "/cats/matchesPlayed",
  getMatchesPlayed,
);
