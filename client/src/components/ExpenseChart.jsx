import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <p className="text-center text-muted">No expenses to display.</p>;
  }

  // Generate dynamic colors
  const backgroundColors = expenses.map(
    (_, index) => `hsl(${index * 40}, 70%, 60%)`
  );

  const data = {
    labels: expenses.map((expense) => expense.title),
    datasets: [
      {
        label: "Amount ($)",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: backgroundColors,
      },
    ],
  };

  return (
    <div className="card p-4 shadow-sm mt-4">
      <h2 className="text-center">Expense Chart</h2>
      <div className="chart-container" style={{ width: "100%", height: "400px" }}>
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default ExpenseChart;
