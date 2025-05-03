import React, { useState, useEffect } from "react";
import { getYearlySummary } from "../../services/SummaryService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "#FF6F61", "#6A5ACD", "#8B0000", "#00BFFF", "#98FB98", "#FFD700", 
  "#D2691E", "#8A2BE2", "#D3D3D3", "#F0E68C", "#A9A9A9", "#D3D3D3"
];

const labels = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
    labels,
    datasets: [
      {
        label: "Monthly Expenditure",
        data: monthlyExpenditure,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
    },
  };

  return (
    <div className="position-relative">
      <h5 className="mb-3">Total Spent in {selectedYear}: ${totalSpent}</h5>

      <div className="d-flex">
        <div style={{ width: "60%" }}>
          <Pie data={chartData} options={options} />
        </div>

        {/* Custom Legend */}
        <div className="ms-3">
          <div className="border rounded p-2 bg-light">
            <h6 className="mb-2">Monthly Legend</h6>
            <div className="d-flex flex-wrap">
              {labels.map((label, idx) => (
                <div key={label} className="d-flex align-items-center me-3 mb-2" style={{ minWidth: 120 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: colors[idx],
                      marginRight: 8,
                      borderRadius: 2,
                    }}
                  />
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySummary;
