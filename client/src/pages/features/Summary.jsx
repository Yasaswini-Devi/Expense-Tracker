import React, { useState, useEffect } from "react";
import { getMonthlySummary } from "../../services/SummaryService";

const MonthlySummary = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-based month
  const [year, setYear] = useState(today.getFullYear());
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, [month, year]);

  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await getMonthlySummary(month, year, token);
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const yearRange = Array.from({ length: 5 }, (_, i) => today.getFullYear() - 2 + i);

  return (
    <div className="p-3">
      <h3>📊 Monthly Summary</h3>

      <div className="d-flex gap-2 mb-3">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="form-select w-auto">
          {months.map((name, idx) => (
            <option key={idx + 1} value={idx + 1}>{name}</option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="form-select w-auto">
          {yearRange.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {summary ? (
        <div className="card p-3">
          <p><strong>Total Spent:</strong> ₹{summary.totalSpent}</p>
          <p><strong>Top Categories:</strong> {summary.topCategories?.join(", ") || "N/A"}</p>
          {summary.message && (
            <p className="text-warning">{summary.message}</p>
          )}
          {summary.remainingBudget && Object.keys(summary.remainingBudget).length > 0 && (
            <div>
              <strong>Remaining Budget:</strong>
              <ul>
                {Object.entries(summary.remainingBudget).map(([cat, rem]) => (
                  <li key={cat}>{cat}: ₹{rem}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading summary...</p>
      )}
    </div>
  );
};

export default MonthlySummary;
