import React, { useState } from "react";
import YearlySummary from "../../components/summary/YearlySummary";
import MonthlySummary from "../../components/summary/MonthlySummary";

const Summary = () => {
  const [selectedTab, setSelectedTab] = useState("yearly"); // Default tab is 'yearly'
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default is current month

  return (
    <div className="summary-container">
      <div className="tabs">
        <button
          className={selectedTab === "yearly" ? "active" : ""}
          onClick={() => setSelectedTab("yearly")}
        >
          Yearly Summary
        </button>
        <button
          className={selectedTab === "monthly" ? "active" : ""}
          onClick={() => setSelectedTab("monthly")}
        >
          Monthly Summary
        </button>
      </div>

      {selectedTab === "yearly" && (
        <div className="yearly-summary">
          <div className="year-selector">
            <label>Select Year: </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {/* Year options for the past 5 years */}
              {[...Array(5)].map((_, index) => {
                const year = new Date().getFullYear() - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <YearlySummary selectedYear={selectedYear}/>
        </div>
      )}

      {selectedTab === "monthly" && (
        <div className="monthly-summary">
          <div className="month-selector">
            <label>Select Month: </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {new Date(0, index).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <MonthlySummary month={selectedMonth} year={selectedYear} />
        </div>
      )}
    </div>
  );
};

export default Summary;