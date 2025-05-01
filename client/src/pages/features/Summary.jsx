import React, { useState } from "react";
import PageSummary from "../../components/summary/PageSummary";
import MonthlySummary from "../../components/summary/MonthlySummary";
import YearlySummary from "../../components/summary/YearlySummary";
import SummaryCharts from "../../components/summary/SummaryCharts";

const SummaryDashboard = () => {
  const [view, setView] = useState("monthly");

  return (
    <div className="p-4">
      <h2>📈 Summary Dashboard</h2>

      <div className="btn-group my-3">
        <button className="btn btn-outline-primary" onClick={() => setView("page")}>Page Summary</button>
        <button className="btn btn-outline-primary" onClick={() => setView("monthly")}>Monthly Summary</button>
        <button className="btn btn-outline-primary" onClick={() => setView("yearly")}>Yearly Summary</button>
        <button className="btn btn-outline-primary" onClick={() => setView("charts")}>Budget Insights</button>
      </div>

      {view === "page" && <PageSummary />}
      {view === "monthly" && <MonthlySummary />}
      {view === "yearly" && <YearlySummary />}
      {view === "charts" && <SummaryCharts />}
    </div>
  );
};

export default SummaryDashboard;
