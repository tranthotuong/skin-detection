// lib/axios.ts
import axios from "axios";
import { API_BASE_URL, SIGN_IN_URL } from "@/lib/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("tokenKey");
      localStorage.removeItem("accUserKey");
      window.location.href = SIGN_IN_URL; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
