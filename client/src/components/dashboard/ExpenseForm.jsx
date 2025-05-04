import React, { useState, useEffect } from "react";
import { createExpense } from "../../services/ExpenseService";
import { getMonthlySummary } from "../../services/SummaryService";

const ExpenseForm = ({ fetchExpenses, categories }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const finalCategory = category === "Other" ? customCategory : category;

    try {
      await createExpense(
        {
          title,
          amount,
          category: finalCategory,
          date,
        },
        token
      );

      // Fetch budget and updated totals
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();

      const monthlySummary = await getMonthlySummary(month, year, token);

      const categoryBudget = monthlySummary.categorySummary[finalCategory]["budget"];
      const updatedTotal = monthlySummary.categorySummary[finalCategory]["spent"] || 0;

      if (categoryBudget) {
        const remaining = categoryBudget - updatedTotal;

        if (remaining >= 0) {
          alert(`✅ You have ₹${remaining} left in your "${finalCategory}" budget.`);
        } else {
          alert(`⚠️ You are ₹${-remaining} over budget for "${finalCategory}".`);
        }
      }

      fetchExpenses();
      setTitle("");
      setAmount("");
      setCategory("");
      setCustomCategory("");
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
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      {category === "Other" && (
        <div className="mb-3">
          <label className="form-label">Custom Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        </div>
      )}

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
