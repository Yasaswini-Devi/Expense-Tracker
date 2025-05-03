import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "budget" || "http://localhost:5000/api/budget";

export const getBudget = async (month, year, token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { month, year },
  });
  return response.data; 
};

export const setBudget = async (month, year, budgets, token) => {
  const response = await axios.post(
    `${API_URL}`,
    { month, year, budgets }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};