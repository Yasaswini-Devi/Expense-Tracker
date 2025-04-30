import Budget from "../models/Budget.js";

export const setBudget = async (req, res) => {
  const userId = req.user.id;
  const { month, year, budgets } = req.body;

  try {
    let existing = await Budget.findOne({ userId, month, year });
    if (existing) {
      existing.budgets = budgets;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newBudget = new Budget({ userId, month, year, budgets });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(500).json({ message: "Error setting budget", error: err });
  }
};

export const getBudget = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  try {
    const budget = await Budget.findOne({ userId, month, year });
    if (!budget) return res.status(404).json({ message: "Budget not set." });
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Error fetching budget", error: err });
  }
};
