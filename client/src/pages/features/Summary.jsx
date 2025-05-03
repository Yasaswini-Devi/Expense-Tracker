import React, { useState } from "react";
import YearlySummary from "../../components/summary/YearlySummary";
import MonthlySummary from "../../components/summary/MonthlySummary";

const Summary = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <label htmlFor="yearSelect" className="form-label mb-1">Select Year</label>
              <select
                id="yearSelect"
                className="form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
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

            <div className="col-md-6">
              <label htmlFor="monthSelect" className="form-label mb-1">Select Month</label>
              <select
                id="monthSelect"
                className="form-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {[...Array(12)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {new Date(0, index).toLocaleString("en", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card-body">

          {/* Summaries in a row */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <YearlySummary selectedYear={selectedYear} />
            </div>
            <div className="col-md-6 mb-3">
              <MonthlySummary month={selectedMonth} year={selectedYear} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
