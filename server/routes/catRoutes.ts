import express from "express";
import { fetchAndStoreCats } from "../controllers/catController";

const router = express.Router();

export const fetchAndStoreCatsRoute = router.get(
  "/cats/fetch",
  fetchAndStoreCats,
);
