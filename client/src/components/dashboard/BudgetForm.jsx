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
    <div className="card p-3 mb-4">
      <h4>Set Monthly Budget</h4>
      <div className="d-flex gap-2">
        <input type="number" value={month} onChange={(e) => setMonth(Number(e.target.value))} min={1} max={12} />
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mt-2">
          <label>{cat}</label>
          <input
            type="number"
            value={budgets[cat] || ""}
            onChange={(e) => handleChange(cat, e.target.value)}
            className="form-control"
          />
        </div>
      ))}

      <button onClick={handleSubmit} className="btn btn-primary mt-3">Save Budget</button>
    </div>
  );
};

export default BudgetForm;
