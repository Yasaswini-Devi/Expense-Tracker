import React, { useState, useEffect } from "react";
import { getYearlySummary } from "../../services/SummaryService";

const YearlySummary = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, [year]);

  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await getYearlySummary(year, token);
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch yearly summary:", error);
    }
  };

  const yearRange = Array.from({ length: 5 }, (_, i) => today.getFullYear() - 2 + i);

  return (
    <div className="p-3">
      <h3>📅 Yearly Summary</h3>

      <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="form-select w-auto mb-3">
        {yearRange.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {summary ? (
        <div className="card p-3">
          <p><strong>Total Spent:</strong> ₹{summary.totalSpent}</p>
          <p><strong>Top Categories:</strong> {summary.topCategories?.join(", ") || "N/A"}</p>
        </div>
      ) : (
        <p>Loading yearly summary...</p>
      )}
    </div>
  );
};

export default YearlySummary;
