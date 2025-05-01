import React, { useEffect, useState } from "react";
import { getPageSummary } from "../../services/SummaryService";

const PageSummary = () => {
    const [summary, setSummary] = useState({
        totalSpent: 0,
        transactionCount: 0,
        avgTransaction: 0,
        categories: [],
      });
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    getPageSummary(token)
      .then(setSummary)
      .catch((err) => console.error("Page summary fetch failed", err));
  }, []);

  return (
    <div className="p-3">
      <h3>📄 Page Summary</h3>
  
      {summary ? (
        <div className="card p-3">
          <p><strong>Total Expenditure:</strong> ₹{summary.totalSpent ?? "0"}</p>
          <p><strong>Number of Transactions:</strong> {summary.transactionCount ?? "0"}</p>
  
          <strong>Categories:</strong>
          {Array.isArray(summary.categories) && summary.categories.length > 0 ? (
            <ul>
              {summary.categories.map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          ) : (
            <p>No categories available</p>
          )}
        </div>
      ) : (
        <p>Loading page summary...</p>
      )}
    </div>
  );  
};

export default PageSummary;
