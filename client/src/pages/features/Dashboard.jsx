import React, { useState, useEffect } from "react";
import ExpenseForm from "../../components/dashboard/ExpenseForm";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import ExpenseList from "../../components/dashboard/ExpenseList";
import BudgetForm from "../../components/dashboard/BudgetForm";
import ExpenseFilter from "../../components/dashboard/ExpenseFilter";
import { getExpenses, getCategories } from "../../services/ExpenseService";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [view, setView] = useState("table");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: [],
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
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const clearFilters = async () => {
    setFilters({
      startDate: "",
      endDate: "",
      category: [],
    });
    setAppliedFilters([]);
    await fetchExpenses();
  };

  const applyFilters = async () => {
    const params = {
      startDate: filters.startDate,
      endDate: filters.endDate,
      category: filters.category.length > 0 ? filters.category : undefined,
    };

    const token = localStorage.getItem("token");
    const data = await getExpenses(params, token);
    setExpenses(data);

    const newFilters = [];
    if (filters.startDate) newFilters.push({ type: "startDate", value: filters.startDate });
    if (filters.endDate) newFilters.push({ type: "endDate", value: filters.endDate });
    if (Array.isArray(filters.category)) {
      filters.category.forEach((cat) => {
        newFilters.push({ type: "category", value: cat });
      });
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
    const newApplied = appliedFilters.filter(
      (f) => !(f.type === filterToRemove.type && f.value === filterToRemove.value)
    );
    setAppliedFilters(newApplied);

    setFilters((prev) => {
      const updated = { ...prev };

      if (filterToRemove.type === "category") {
        updated.category = prev.category.filter((c) => c !== filterToRemove.value);
      } else if (filterToRemove.type === "startDate") {
        updated.startDate = "";
      } else if (filterToRemove.type === "endDate") {
        updated.endDate = "";
      }

      return updated;
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Panel */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4 className="text-center">Add Expense</h4>
            <ExpenseForm fetchExpenses={fetchExpenses} fetchCategories={fetchCategories} />
          </div>
          <BudgetForm categories={categories} />
        </div>

        {/* Right Panel */}
        <div className="col-md-8">
          <div className="d-flex justify-content-center mb-3">
            <button className="btn primary-btn" onClick={() => setView(view === "table" ? "chart" : "table")}>
              Switch to {view === "table" ? "Chart" : "Table"} View
            </button>
          </div>

          <div className="border rounded p-3 card">
            <ExpenseFilter
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              clearFilters={clearFilters}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              appliedFilters={appliedFilters}
              handleRemoveFilter={handleRemoveFilter}
            />

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