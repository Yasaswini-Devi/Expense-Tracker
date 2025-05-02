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
    category: [], // <-- array of selected categories
  });  
  const [categories, setCategories] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const clearFilters = async () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: [],
    });
  
    setAppliedFilters([]);
    await fetchExpenses(); // Reload all expenses
  };
 
  const applyFilters = async () => {
    const token = localStorage.getItem("token");
    const data = await getExpenses(filters, token);
    setExpenses(data);
  
    const newFilters = [];
  
    if (filters.startDate) newFilters.push({ type: 'startDate', value: filters.startDate });
    if (filters.endDate) newFilters.push({ type: 'endDate', value: filters.endDate });
    if (filters.category.length > 0) {
      filters.category.forEach((cat) =>
        newFilters.push({ type: 'category', value: cat })
      );
    }
  
    setAppliedFilters(newFilters);
  };
  
  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);
 
  const handleRemoveFilter = (filterToRemove) => {
    // Remove from appliedFilters
    const newApplied = appliedFilters.filter(
      (f) => !(f.type === filterToRemove.type && f.value === filterToRemove.value)
    );
    setAppliedFilters(newApplied);
  
    // Update filters state
    setFilters((prev) => {
      const updated = { ...prev };
  
      if (filterToRemove.type === 'category') {
        updated.category = prev.category.filter((c) => c !== filterToRemove.value);
      } else if (filterToRemove.type === 'startDate') {
        updated.startDate = '';
      } else if (filterToRemove.type === 'endDate') {
        updated.endDate = '';
      }
  
      return updated;
    });
  };
   
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
          
            <div className="d-flex flex-column align-items-center position-relative">
              <label htmlFor="category">Categories</label>
              <div className="form-control" style={{ cursor: "pointer" }} onClick={() => setShowDropdown(!showDropdown)}>
                {filters.category.length > 0 ? filters.category.join(", ") : "Select Categories"}
              </div>
              {showDropdown && (
                <div className="dropdown-menu show p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {categories.map((cat) => (
                    <div className="form-check" key={cat}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={cat}
                        id={`cat-${cat}`}
                        checked={filters.category.includes(cat)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const newCategories = checked
                            ? [...filters.category, cat]
                            : filters.category.filter(c => c !== cat);
                          setFilters({ ...filters, category: newCategories });
                        }}
                      />
                      <label className="form-check-label" htmlFor={`cat-${cat}`}>
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={clearFilters} className="btn primary-btn m-3">Clear Filters</button>
          </div>

          {appliedFilters.length > 0 && (
            <div className="mt-3">
              <h5>Applied Filters:</h5>
              <div className="d-flex flex-wrap">
                {appliedFilters.map((filter, index) => (
                  <span
                  key={index}
                  className="badge d-inline-flex align-items-center me-2 py-2 px-3"
                >
                  <span className="text-white">
                    {filter.type === 'category'
                      ? `Category: ${filter.value}`
                      : filter.type === 'startDate'
                      ? `Start: ${filter.value}`
                      : `End: ${filter.value}`}
                  </span>
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    aria-label="Close"
                    style={{ transform: 'scale(0.7)' }}
                    onClick={() => handleRemoveFilter(filter)}
                  />
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
