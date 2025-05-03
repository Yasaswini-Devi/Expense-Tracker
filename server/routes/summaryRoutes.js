import express from "express";
import { getYearlySummary, getMonthlySummary } from "../controllers/summaryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/yearly/:year", authMiddleware, getYearlySummary);
router.get("/monthly/:month/:year", authMiddleware, getMonthlySummary);

export default router;
