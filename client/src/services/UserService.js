import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "user" || "http://localhost:5000/api/user";

// Get user details
export const getUserDetails = async (token) => {
  const response = await axios.get(`${API_URL}/details`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update user details
export const updateUserDetails = async (formData, token) => {
  const response = await axios.put(`${API_URL}update`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Reset user password
export const resetPassword = async (newPassword, token) => {
  const response = await axios.put(`${API_URL}/reset-password`, { newPassword }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
