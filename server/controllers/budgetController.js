import Budget from "../models/Budget.js";

// Set or update the budget
export const setBudget = async (req, res) => {
  const userId = req.user.id;
  const { month, year, budgets } = req.body;

  try {
    let existing = await Budget.findOne({ userId, month, year });

    if (existing) {
      existing.budgets = budgets;
      await existing.save();
      return res.status(200).json({ message: "Budget updated", budget: existing });
    }

    const newBudget = new Budget({ userId, month, year, budgets });
    await newBudget.save();
    res.status(201).json({ message: "Budget created", budget: newBudget });
  } catch (err) {
    res.status(500).json({ message: "Error setting budget", error: err.message });
  }
};

// Get budget by month/year
export const getBudget = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  try {
    const budget = await Budget.findOne({ userId, month, year });
    if (!budget) {
      return res.status(200).json({ message: "No budget set yet", budgets: {} });
    }

    res.status(200).json({
      message: "Budget found",
      budgets: budget.budgets,  
      month,
      year,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching budget", error: err.message });
  }
};