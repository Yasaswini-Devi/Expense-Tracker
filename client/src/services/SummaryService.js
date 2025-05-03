import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "summary" || "http://localhost:5000/api/summary";

// Fetch Yearly Summary
export const getYearlySummary = async (selectedYear, token) => {
  try {
    const response = await axios.get(`${API_URL}/yearly/${selectedYear}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching yearly summary:", error);
    throw error;
  }
};

// Fetch Monthly Summary
export const getMonthlySummary = async (month, year, token) => {
  try {
    const response = await axios.get(`${API_URL}/monthly/${month}/${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    throw error;
  }
};