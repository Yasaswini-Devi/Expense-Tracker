import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"; // to protect routes
import { getMonthlyTotalByCategory } from "../utils/expenseUtils.js";
import { getMonthlySummary } from "../controllers/summaryController.js";

const router = express.Router();

router.get("/:month/:year", authMiddleware, getMonthlySummary);
router.get("/monthly-totals", authMiddleware, async (req, res) => {
    const { month, year } = req.query;
    const totals = await getMonthlyTotalByCategory(req.user.id, Number(month), Number(year));
    res.json(totals);
});

export default router;