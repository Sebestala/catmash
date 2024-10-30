import express from "express";
import { fetchAndStoreCats, getCats } from "../controllers/catController";

const router = express.Router();

export const fetchAndStoreCatsRoute = router.get(
  "/cats/fetch",
  fetchAndStoreCats,
);

export const getCatsRoute = router.get("/cats", getCats);
