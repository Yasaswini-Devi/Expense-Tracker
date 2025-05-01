import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

export const getMonthlySummary = async (req, res) => {
  const { month, year } = req.params;
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({
      user: userId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0),
      },
    });

    const budget = await Budget.findOne({ user: userId, month, year });

    let totalSpent = 0;
    let categoryTotals = {};

    expenses.forEach(exp => {
      totalSpent += exp.amount;
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const remainingBudget = {};
    if (budget && budget.budgets) {
      for (let cat in budget.budgets) {
        remainingBudget[cat] = (budget.budgets[cat] || 0) - (categoryTotals[cat] || 0);
      }
    }

    res.json({
      totalSpent,
      topCategories,
      remainingBudget,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
