import React, { useState, useEffect } from "react";
import { getYearlySummary } from "../../services/SummaryService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const YearlySummary = ({ selectedYear }) => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchYearlySummary = async () => {
      try {
        const data = await getYearlySummary(selectedYear, token);
        setTotalSpent(data.totalSpent);
        setMonthlyExpenditure(data.monthlyExpenditure);
      } catch (error) {
        console.error("Error fetching yearly summary:", error);
      }
    };
    fetchYearlySummary();
  }, [selectedYear, token]);

  const chartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Monthly Expenditure",
        data: monthlyExpenditure,
        backgroundColor: [
          "#FF6F61", "#6A5ACD", "#8B0000", "#00BFFF", "#98FB98", "#FFD700", 
          "#D2691E", "#8A2BE2", "#D3D3D3", "#F0E68C", "#A9A9A9", "#D3D3D3"
        ],
        borderColor: [
          "#FF6F61", "#6A5ACD", "#8B0000", "#00BFFF", "#98FB98", "#FFD700", 
          "#D2691E", "#8A2BE2", "#D3D3D3", "#F0E68C", "#A9A9A9", "#D3D3D3"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="yearly-summary-content">
      <h2>Total Spent in {selectedYear}: ${totalSpent}</h2>
      <div style={{ height: "300px" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default YearlySummary;
