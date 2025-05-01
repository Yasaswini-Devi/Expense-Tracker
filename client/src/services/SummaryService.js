import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "summary" || "http://localhost:5000/api/summary";

export const getMonthlySummary = async (month, year, token) => {
  const res = await axios.get(`${API_URL}/${month}/${year}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
