import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import { getExpenses, getCategories } from "../../services/ExpenseService";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [view, setView] = useState("table"); // "table" or "chart"
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'All',
  });
  const [categories, setCategories] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const data = await getExpenses(filters, token);
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getCategories(token);
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const applyFilters = async () => {
    const params = {
      startDate: filters.startDate,
      endDate: filters.endDate,
      category: filters.category !== 'All' ? filters.category : undefined,
    };
    const token = localStorage.getItem("token");
    const data = await getExpenses(filters, token);
    setExpenses(data);
  };  

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Expense Form (4 columns) */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4 className="text-center">Add Expense</h4>
            <ExpenseForm 
              fetchExpenses={fetchExpenses} 
              fetchCategories={fetchCategories} 
            />
          </div>
        </div>

        {/* Expense Table/Chart (8 columns) */}
        <div className="col-md-8">
          {/* Centered Toggle Button */}
          <div className="d-flex justify-content-center mb-3">
            <button className="btn primary-btn" onClick={() => setView(view === "table" ? "chart" : "table")}>
              Switch to {view === "table" ? "Chart" : "Table"} View
            </button>
          </div>

          <div className="border rounded p-3 card">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />

          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />

          <select
            name="category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button onClick={applyFilters}>Apply</button>

            {view === "table" ? (
              <ExpenseList expenses={expenses} setExpenses={setExpenses} />
            ) : (
              <ExpenseChart expenses={expenses} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
