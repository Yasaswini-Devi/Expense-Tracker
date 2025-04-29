import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import { getExpenses } from "../../services/ExpenseService";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [view, setView] = useState("table"); // "table" or "chart"

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token"); // get token from localStorage
      const data = await getExpenses(token);
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Expense Form (4 columns) */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4 className="text-center">Add Expense</h4>
            <ExpenseForm fetchExpenses={fetchExpenses} />
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
