import express from "express";
import { addExpense, getExpenses, deleteExpense } from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // to protect routes

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;