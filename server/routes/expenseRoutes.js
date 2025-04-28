const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Make sure this model exists

// Add a new expense
router.post('/add', async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const newExpense = new Expense({ title, amount, category, date });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all expenses
router.get('/all', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
