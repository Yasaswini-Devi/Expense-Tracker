import React, { useState, useEffect } from "react";
import ExpenseForm from "../../components/dashboard/ExpenseForm";
import ExpenseChart from "../../components/dashboard/ExpenseChart";
import ExpenseList from "../../components/dashboard/ExpenseList";
import BudgetForm from "../../components/dashboard/BudgetForm";
import ExpenseFilter from "../../components/dashboard/ExpenseFilter";
import { getExpenses, getCategories } from "../../services/ExpenseService";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: [],
  });
  const [categories, setCategories] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chartType, setChartType] = useState("category"); // 'category' or 'item'

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
    <div className="container mt-4">
      {/* Row 1: ExpenseForm and BudgetForm side by side */}
      <div className="row mb-4">
        <div className="col-md-6 d-flex">
          <div className="card p-3 w-100 h-100">
            <h5 className="text-center">Add Expense</h5>
            <ExpenseForm fetchExpenses={fetchExpenses} fetchCategories={fetchCategories} />
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card p-3 w-100 h-100">
            <h5 className="text-center">Set Budget</h5>
            <BudgetForm categories={categories} />
          </div>
        </div>
      </div>

      {/* Row 2: Filters + List and Chart Side by Side */}
      <div className="row mb-3">
        <div className="col">
          <div className="card p-3">
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
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="card p-3">
          <h3 className="text-center mb-3">Expenses</h3>
            <div className="row">
              <div className="col-md-6 border-end">
                <ExpenseList expenses={expenses} setExpenses={setExpenses} />
              </div>
              <div className="col-md-6">
                <ExpenseChart expenses={expenses} chartType={chartType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
