import Expense from "../models/Expense.js";
import mongoose from "mongoose";
import { getMonthlyTotalByCategory } from "../utils/expenseUtils.js"; // update path if different

const getTopCategories = (expenses, limit = 3) => {
  const categoryTotals = {};
  expenses.forEach(({ category, amount }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });
  return Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([cat]) => cat);
};

export const getMonthlySummary = async (req, res) => {
  const { month, year } = req.query;
  const userId = req.user.id;

  try {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const expenses = await Expense.find({ user: userId, date: { $gte: start, $lte: end } });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const topCategories = getTopCategories(expenses);

    const remainingBudget = await getMonthlyTotalByCategory(userId, parseInt(month), parseInt(year));

    res.json({
      totalSpent,
      topCategories,
      remainingBudget,
      message: expenses.length ? null : "No expenses found for this month.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching monthly summary" });
  }
};

export const getYearlySummary = async (req, res) => {
  const { year } = req.query;
  const userId = req.user.id;

  try {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31, 23, 59, 59);

    const expenses = await Expense.find({ user: userId, date: { $gte: start, $lte: end } });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const topCategories = getTopCategories(expenses);

    res.json({ totalSpent, topCategories });
  } catch (err) {
    res.status(500).json({ message: "Error fetching yearly summary" });
  }
};

export const getPageSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ user: userId });
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const avg = expenses.length ? (totalSpent / expenses.length).toFixed(2) : 0;
    const categories = [...new Set(expenses.map(e => e.category))];

    res.json({
      totalSpent,
      transactionCount: expenses.length,
      avgTransaction: avg,
      categories, // <- add this
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching page summary" });
  }
};

export const getChartData = async (req, res) => {
  const userId = req.user.id;
  const currentYear = new Date().getFullYear();

  try {
    const pipeline = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ];

    const results = await Expense.aggregate(pipeline);
    const monthlyTotals = Array(12).fill(0);
    results.forEach(({ _id, total }) => {
      monthlyTotals[_id.month - 1] = total;
    });
    res.json({ monthlyTotals });
  } catch (err) {
    res.status(500).json({ message: "Error generating chart data" });
  }
};

export const getBudgetInsights = async (req, res) => {
  const userId = req.user.id;
  const type = req.query.type || "category"; // default is category

  try {
    if (type === "month") {
      // MONTHLY SPENDING
      const currentYear = new Date().getFullYear();
      const results = await Expense.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: new Date(`${currentYear}-01-01`),
              $lte: new Date(`${currentYear}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { month: { $month: "$date" } },
            total: { $sum: "$amount" }
          }
        },
        {
          $sort: { "_id.month": 1 }
        }
      ]);

      const monthlyTotals = Array(12).fill(0);
      results.forEach(({ _id, total }) => {
        monthlyTotals[_id.month - 1] = total;
      });

      return res.json({ type: "month", data: monthlyTotals });
    } else {
      // CATEGORY WISE
      const budgets = {
        Groceries: 6000,
        Utilities: 2000,
        Travel: 5000,
        Entertainment: 3000,
      };

      const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

      const spentData = await Expense.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            date: { $gte: firstOfMonth }
          }
        },
        {
          $group: {
            _id: "$category",
            spent: { $sum: "$amount" }
          }
        }
      ]);

      const result = Object.entries(budgets).map(([category, budget]) => {
        const found = spentData.find((s) => s._id === category);
        return {
          category,
          spent: found ? found.spent : 0,
          budget
        };
      });

      return res.json({ type: "category", data: result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get budget insights" });
  }
};
