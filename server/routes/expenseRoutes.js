import express from "express";
import { addExpense, getExpenses, deleteExpense, getCategories } from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // to protect routes

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.delete("/:id", authMiddleware, deleteExpense);
router.get("/categories", authMiddleware, getCategories);

export default router;