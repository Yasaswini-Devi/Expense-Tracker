import React, { useState, useEffect } from "react";
import { getMonthlySummary } from "../../services/SummaryService";
import { ProgressBar } from "react-bootstrap"; // For Bootstrap progress bar

const MonthlySummary = ({ month, year }) => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [categorySummary, setCategorySummary] = useState({});
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const data = await getMonthlySummary(month, year, token);
        setTotalSpent(data.totalSpent);
        setTotalBudget(data.totalBudget);
        setCategorySummary(data.categorySummary);
      } catch (error) {
        console.error("Error fetching monthly summary:", error);
      }
    };
    fetchMonthlySummary();
  }, [month, year, token]);

  return (
    <div className="monthly-summary-content">
      <div className="d-flex justify-content-evenly">
        <h5>Total Spent: ₹{totalSpent}</h5>
        <h5>{monthNames[month - 1]}</h5>
        <h5>Total Budget: ₹{totalBudget}</h5>
      </div>

      {/* Category-wise progress bars */}
      <div className="category-summary">
        {Object.keys(categorySummary).map((category) => {
          const { spent, budget } = categorySummary[category];
          const percentage = Math.min((spent / budget) * 100, 100); // Ensure it's capped at 100%
          const remainingBudget = budget - spent;

          // Determine bar color
          let variant = "success"; // Default color
          if (spent > budget) {
            variant = "danger"; // Over budget
          } else if (spent / budget >= 0.8) {
            variant = "warning"; // Close to budget
          }

          return (
            <div key={category} className="category-progress">
              <h5>{category}</h5>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Spent: ₹{spent}</span>
                <span>Budget: ₹{budget}</span>
                <span>Remaining: ₹{remainingBudget}</span>
              </div>
              <ProgressBar
                now={percentage}
                label={`${percentage.toFixed(1)}%`}
                variant={variant}
                style={{ marginBottom: '10px' }}
              />
              <div style={{ fontSize: '12px', color: 'gray' }}>
                {spent > budget ? "You have exceeded your budget!" : "You're within your budget."}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlySummary;
