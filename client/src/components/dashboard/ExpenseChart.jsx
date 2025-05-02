import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const [viewMode, setViewMode] = useState("category"); // category or item

  const getChartData = () => {
    const dataMap = {};

    expenses.forEach((expense) => {
      const key = viewMode === "category" ? expense.category : expense.title;
      if (dataMap[key]) {
        dataMap[key] += expense.amount;
      } else {
        dataMap[key] = expense.amount;
      }
    });

    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);

    const backgroundColors = [
      "#6A8E91", // Muted teal-gray (complements primary-dark)
      "#C49C68", // Soft ochre (refined gold complement)
      "#BFA5A0", // Vintage rose (warms up the palette)
      "#D5C5B0", // Parchment beige (elegant contrast)
      "#9F7E69", // Burnt peach (depth & warmth)
      "#8A9A8E", // Mossy gray-green (ties to your component bg)
      "#715C49", // Antique bronze (earthy anchor)
      "#BDC3C7", // Soft silver-gray (eases tone)
      "#A88F73", // Dusty copper
      "#B5BDAA", // Misty sage
    ];
    
    return {
      labels,
      datasets: [
        {
          label: "Expenses",
          data,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="chart-container">
      <div className="d-flex justify-content-end mb-2">
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="form-select w-auto"
          style={{ backgroundColor: "var(--primary-light)", color: "var(--header-text)", border: "none" }}
        >
          <option value="category">Category-wise</option>
          <option value="item">Item-wise</option>
        </select>
      </div>
      <Pie data={getChartData()} />
    </div>
  );
};

export default ExpenseChart;
