import React, { useState, useEffect } from "react";
import { getBudget, setBudget } from "../../services/BudgetService";

const BudgetForm = ({ categories }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [budgets, setBudgets] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const data = await getBudget(month, year, token);
        setBudgets(Object.fromEntries(data.budgets));
      } catch (err) {
        console.log("No budget set yet.");
      }
    };
    fetchBudget();
  }, [month, year]);

  const handleChange = (category, value) => {
    setBudgets((prev) => ({ ...prev, [category]: Number(value) }));
  };

  const handleSubmit = async () => {
    try {
      await setBudget(month, year, budgets, token);
      alert("Budget saved!");
    } catch (err) {
      alert("Error saving budget");
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-3">
  <div className="row mb-3">
    <div className="col">
      <label className="form-label">Month</label>
      <input
        type="number"
        className="form-control"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        min={1}
        max={12}
        required
      />
    </div>
    <div className="col">
      <label className="form-label">Year</label>
      <input
        type="number"
        className="form-control"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        required
      />
    </div>
  </div>

  {categories.map((cat) => (
    <div className="mb-3" key={cat}>
      <label className="form-label">{cat} Budget</label>
      <input
        type="number"
        className="form-control"
        value={budgets[cat] || ""}
        onChange={(e) => handleChange(cat, e.target.value)}
        placeholder={`Enter budget for ${cat}`}
      />
    </div>
  ))}

  <button type="submit" className="btn primary-btn w-100 mt-2">
    Save Budget
  </button>
</form>

  );
};

export default BudgetForm;
