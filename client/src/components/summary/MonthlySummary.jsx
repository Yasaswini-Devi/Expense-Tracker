import React, { useState, useEffect } from "react";
import { getMonthlySummary } from "../../services/SummaryService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MonthlySummary = ({ month, year }) => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const data = await getMonthlySummary(month, year, token);
        setTotalSpent(data.totalSpent);
        setTotalBudget(data.totalBudget);
      } catch (error) {
        console.error("Error fetching monthly summary:", error);
      }
    };
    fetchMonthlySummary();
  }, [month, year, token]);

  const chartData = {
    labels: ["Budget vs Expenditure"],
    datasets: [
      {
        label: "Expenditure",
        data: [totalSpent],
        backgroundColor: "#FF6F61",
        borderColor: "#FF6F61",
        borderWidth: 1,
      },
      {
        label: "Budget",
        data: [totalBudget],
        backgroundColor: "#98FB98",
        borderColor: "#98FB98",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="monthly-summary-content">
      <h2>{month}/{year} Monthly Summary</h2>
      <div style={{ height: "300px" }}>
        <Bar data={chartData} />
      </div>
      <h4>Total Spent: ${totalSpent}</h4>
      <h4>Total Budget: ${totalBudget}</h4>
    </div>
  );
};

export default MonthlySummary;
