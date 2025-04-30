import React, { useState } from "react";
import { createExpense } from "../../services/ExpenseService";
import { getBudget } from "../../services/BudgetService";
import { getMonthlyTotals } from "../../services/ExpenseService";

const ExpenseForm = ({ fetchExpenses, fetchCategories }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Extract month/year
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      // Fetch budget and monthly totals
      const [budgetData, totals] = await Promise.all([
        getBudget(month, year, token),
        getMonthlyTotals(month, year, token),
      ]);

      const categoryBudget = budgetData.budgets[category];
      const currentTotal = totals[category] || 0;
      const newTotal = currentTotal + Number(amount);

      if (categoryBudget) {
        if (newTotal > categoryBudget) {
          alert(`⚠️ This expense exceeds your budget for "${category}"!`);
        } else if (newTotal > 0.9 * categoryBudget) {
          alert(`⚠️ You're close to exceeding your budget for "${category}".`);
        }
      }

      // Add the expense anyway
      await createExpense(
        {
          title,
          amount,
          category,
          date,
        },
        token
      );

      fetchExpenses();
      fetchCategories();

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn primary-btn w-100">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
