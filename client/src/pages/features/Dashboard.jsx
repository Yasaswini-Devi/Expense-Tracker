import React, { useState, useEffect } from "react";
import ExpenseForm from "../../components/dashboard/ExpenseForm";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import ExpenseList from "../../components/dashboard/ExpenseList";
import BudgetForm from "../../components/dashboard/BudgetForm";
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
  const [appliedFilters, setAppliedFilters] = useState([]);

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

    const newFilters = [];
    if (filters.startDate) newFilters.push(`Start Date: ${filters.startDate}`);
    if (filters.endDate) newFilters.push(`End Date: ${filters.endDate}`);
    if (filters.category !== 'All') newFilters.push(`Category: ${filters.category}`);
    setAppliedFilters(newFilters);
  };  

  const clearFilters = async () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: 'All',
    });

    setAppliedFilters([]);
    await fetchExpenses(); // Reload all expenses
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
          <BudgetForm categories={categories} />
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
          <div class="d-flex justify-content-evenly">
            <div class="d-flex flex-column align-items-center">
              <label for="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                class="form-control"
              />
            </div>

            <div class="d-flex flex-column align-items-center">
              <label for="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                class="form-control"
              />
            </div>

            <div class="d-flex flex-column align-items-center">
              <label for="category">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                class="form-control"
              >
                <option value="All">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

            <div className="mt-3 d-flex justify-content-evenly">
              <button onClick={applyFilters} className="btn primary-btn">Apply</button>
              <button onClick={clearFilters} className="btn secondary-btn">Clear Filters</button>
            </div>

            {appliedFilters.length > 0 && (
              <div className="mt-3">
                <h5>Applied Filters:</h5>
                <div className="d-flex flex-wrap">
                  {appliedFilters.map((filter, index) => (
                    <span key={index} className="badge me-2">
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
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
