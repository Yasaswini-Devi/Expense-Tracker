import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "summary" || "http://localhost:5000/api/summary";

// export const getMonthlySummary = async (month, year, token) => {
//   const res = await axios.get(`${API_URL}/${month}/${year}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };

export const getMonthlySummary = async (month, year, token) => {
  const response = await axios.get(`${API_URL}/monthly`, {
    params: { month, year },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getYearlySummary = async (year, token) => {
  const response = await axios.get(`${API_URL}/yearly`, {
    params: { year },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPageSummary = async (token) => {
  const response = await axios.get(`${API_URL}/page`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getBudgetInsights = async (type, token) => {
  try {
    const response = await axios.get(`${API_URL}/budget-insights?type=${encodeURIComponent(type)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching budget insights:", error);
    throw error;
  }
};
