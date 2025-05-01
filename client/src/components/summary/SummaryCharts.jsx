import React, { useEffect, useState } from "react";
import { getBudgetInsights } from "../../services/SummaryService";

const SummaryCharts = () => {
  const [type, setType] = useState("category");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const token = localStorage.getItem("token");
      // Ensure 'type' is correctly passed as a string (not an object)
      const data = await getBudgetInsights(type, token);
      setData(data);
    };
    fetchInsights();
  }, [type]);

  return (
    <div className="card p-3">
      <h4>📊 Budget Insights</h4>

      <div className="mb-3">
        <button onClick={() => setType("category")} className="btn btn-primary btn-sm me-2">
          Category Wise
        </button>
        <button onClick={() => setType("month")} className="btn btn-outline-primary btn-sm">
          Month Wise
        </button>
      </div>

      {type === "category" && data && data.data.map(({ category, spent, budget }) => {
        const percent = Math.min(100, Math.round((spent / budget) * 100));
        const isOver = spent > budget;

        return (
          <div key={category} className="mb-2">
            <div className="d-flex justify-content-between">
              <strong>{category}</strong>
              <span>₹{spent} / ₹{budget}</span>
            </div>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className={`progress-bar ${isOver ? "bg-danger" : "bg-success"}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}

      {type === "month" && data && (
        <div>
          <h6>📅 Month-wise spending</h6>
          {data.data.map((total, idx) => (
            <p key={idx}>Month {idx + 1}: ₹{total}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryCharts;
