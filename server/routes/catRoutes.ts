import express from "express";
import { getCats } from "../controllers/catController";

const router = express.Router();

router.get("/cats", getCats);

export default router;
