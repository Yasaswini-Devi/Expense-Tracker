import express from "express";
import { setBudget, getBudget } from "../controllers/budgetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, setBudget);
router.get("/", authMiddleware, getBudget);

export default router;
