import React, { useState, useEffect } from "react";
import { getYearlySummary } from "../../services/SummaryService";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "#6A8E91", // Muted teal-gray (complements primary-dark)
  "#C49C68", // Soft ochre (refined gold complement)
  "#BFA5A0", // Vintage rose (warms up the palette)
  "#D5C5B0", // Parchment beige (elegant contrast)
  "#9F7E69", // Burnt peach (depth & warmth)
  "#8A9A8E", // Mossy gray-green (ties to your component bg)
  "#715C49", // Antique bronze (earthy anchor)
  "#BDC3C7", // Soft silver-gray (eases tone)
  "#A88F73", // Dusty copper (warm metallic accent)
  "#B5BDAA", // Misty sage (adds subtle greenish hue)
  "#D9B7A1", // Blush taupe (soft pinkish beige)
  "#B7A8A0", // Warm ash gray (calm, neutral gray)
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
      <h5 className="mb-3">Total Spent in {selectedYear}: ₹{totalSpent}</h5>

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
