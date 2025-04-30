import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "budget" || "http://localhost:5000/api/budget";

export const getBudget = async (month, year, token) => {
  const res = await axios.get(API_URL + `?month=${month}&year=${year}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const setBudget = async (month, year, budgets, token) => {
  const res = await axios.post(API_URL, { month, year, budgets }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
