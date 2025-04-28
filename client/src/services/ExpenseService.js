import axios from "axios";

// Set your API URL (adjust if you have backend on a different port)
const API_URL = import.meta.env.VITE_API_URL + "expenses/" || "http://localhost:5000/api/expenses/";

// Create Expense
export const createExpense = async (expenseData, token) => {
  const response = await axios.post(API_URL, expenseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get All Expenses
export const getExpenses = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

// Delete Expense
export const deleteExpense = async (expenseId, token) => {
  const response = await axios.delete(`${API_URL}/${expenseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// (Optional) Update Expense
export const updateExpense = async (expenseId, updatedData, token) => {
  const response = await axios.put(`${API_URL}/${expenseId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
