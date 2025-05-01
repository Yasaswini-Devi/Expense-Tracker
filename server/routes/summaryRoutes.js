import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"; // to protect routes
import { getMonthlyTotalByCategory } from "../utils/expenseUtils.js";
import { getMonthlySummary, getYearlySummary, getPageSummary, getBudgetInsights } from "../controllers/summaryController.js";

const router = express.Router();

// router.get("/:month/:year", authMiddleware, getMonthlySummary);
// router.get("/monthly-totals", authMiddleware, async (req, res) => {
//     const { month, year } = req.query;
//     const totals = await getMonthlyTotalByCategory(req.user.id, Number(month), Number(year));
//     res.json(totals);
// });

router.get("/monthly", authMiddleware, getMonthlySummary);
router.get("/yearly", authMiddleware, getYearlySummary);
router.get("/page", authMiddleware, getPageSummary);
router.get("/budget-insights", authMiddleware, getBudgetInsights);

export default router;