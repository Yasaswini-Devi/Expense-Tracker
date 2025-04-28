import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth/";

export const register = (userData) => {
  return axios.post(API_URL + "register", userData);
};

export const login = (userData) => {
  return axios.post(API_URL + "login", userData);
};
