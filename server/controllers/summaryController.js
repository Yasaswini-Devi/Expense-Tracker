import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";
import mongoose from "mongoose";

// Yearly Summary
export const getYearlySummary = async (req, res) => {
  const { year } = req.params;
  const userId = req.user.id;

  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalSpent: { $sum: "$amount" },
        },
      },
    ]);

    let totalSpent = 0;
    const monthlyExpenditure = Array(12).fill(0);

    expenses.forEach(({ _id, totalSpent: spent }) => {
      totalSpent += spent;
      monthlyExpenditure[_id.month - 1] = spent;
    });

    res.status(200).json({ year: +year, totalSpent, monthlyExpenditure });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch yearly summary", error: err });
  }
};

// Monthly Summary
export const getMonthlySummary = async (req, res) => {
  const { month, year } = req.params;
  const userId = req.user.id;

  try {
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const expenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" },
        },
      },
    ]);

    const budgetDoc = await Budget.findOne({ userId, month: +month, year: +year });

    const budgets = budgetDoc?.budgets || {};
    const result = {};

    let totalBudget = 0;
    let totalSpent = 0;

    for (const category in budgets) {
      const budget = budgets[category];
      totalBudget += budget;

      const spent = expenses.find(e => e._id === category)?.totalSpent || 0;
      totalSpent += spent;

      result[category] = {
        spent,
        budget,
        over: spent > budget,
      };
    }

    res.status(200).json({
      month: +month,
      year: +year,
      totalSpent,
      totalBudget,
      categorySummary: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch monthly summary", error: err });
  }
};
