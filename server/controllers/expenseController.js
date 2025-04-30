import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({ title, amount, category, date, user: req.user.id });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    const filter = {
      user: req.user.id,
    };

    // Optional: Add date filter if provided
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Optional: Add category filter if provided
    if (category && category !== "All") {
      filter.category = category;
    }
 
    const expenses = await Expense.find(filter).sort({ date: -1 });

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

export const getCategories = async (req, res) => {
  try {
    const categories = await Expense.distinct("category", { user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};