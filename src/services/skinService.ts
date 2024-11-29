import axios from "axios";
import { GET_SPORTS_ENDPOINT, GET_USER_ENDPOINT } from '@/lib/constants';
import axiosInstance from "@/lib/axios";
// Login function
export const getSports = async (): Promise<any> => {
  try {
    // Retrieve the tokenKey and email from localStorage
    const tokenKey = localStorage.getItem("tokenKey");
    const email = localStorage.getItem("email");

    if (!tokenKey || !email) {
      throw new Error("Authentication credentials are missing");
    }

    // Call the API with the headers
    const { data } = await axiosInstance.get(GET_SPORTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenKey}`, // Add the token for validation
        email, // Include email in headers
      },
    });

    return data; // Return the list of sports
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Failed to fetch sports");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getUserInfo = async (): Promise<any> => {
  try {
    // Retrieve the tokenKey and email from localStorage
    const tokenKey = localStorage.getItem("tokenKey");
    const email = localStorage.getItem("email");

    if (!tokenKey || !email) {
      throw new Error("Authentication credentials are missing");
    }

    // Call the API with the headers
    const { data } = await axiosInstance.get(GET_USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenKey}`, // Add the token for validation
        email, // Include email in headers
      },
    });

    return data; // Return the list of sports
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
    throw new Error("An unexpected error occurred");
  }
};