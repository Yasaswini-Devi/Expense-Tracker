import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteExpense } from "../../services/ExpenseService";

const ExpenseList = ({ expenses, setExpenses }) => {
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedExpenses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((expenseId) => expenseId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle bulk delete
  const handleDeleteSelected = async () => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedExpenses.map((id) => 
          deleteExpense(id, token)
        )
      );

      // Update state without reloading
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => !selectedExpenses.includes(expense._id))
      );

      // Clear selection
      setSelectedExpenses([]);
    } catch (error) {
      console.error("Error deleting selected expenses:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* <h2 className="text-center mb-3">Expense List</h2> */}

      {expenses.length === 0 ? (
        <p className="text-muted text-center">No expenses added yet.</p>
      ) : (
        <>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Select</th>
                <th>Title</th>
                <th>Amount ($)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedExpenses.includes(expense._id)}
                      onChange={() => handleCheckboxChange(expense._id)}
                    />
                  </td>
                  <td>{expense.title}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.category}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Centered Delete Button */}
          {selectedExpenses.length > 0 && (
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger mt-2" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
