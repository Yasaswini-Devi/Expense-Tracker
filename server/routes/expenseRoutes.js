import express from "express";
import { addExpense, getExpenses, deleteExpense, getCategories } from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // to protect routes
import { getMonthlyTotalByCategory } from "../utils/expenseUtils.js";

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.delete("/:id", authMiddleware, deleteExpense);
router.get("/categories", authMiddleware, getCategories);
router.get("/monthly-totals", authMiddleware, async (req, res) => {
    const { month, year } = req.query;
    const totals = await getMonthlyTotalByCategory(req.user.id, Number(month), Number(year));
    res.json(totals);
});
  

export default router;