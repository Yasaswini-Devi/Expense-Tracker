import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const newExpense = new Expense({ title, amount, date, user: req.user.id });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};
