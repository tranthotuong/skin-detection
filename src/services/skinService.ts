import axios from "axios";
import { GET_SPORTS_ENDPOINT, GET_USER_ENDPOINT, GET_TOP_HISTORY_ENDPOINT, GET_LIST_HISTORY_ENDPOINT } from '@/lib/constants';
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

export const getTopHistories = async (): Promise<any> => {
  try {
    // Retrieve the tokenKey and email from localStorage
    const tokenKey = localStorage.getItem("tokenKey");
    const email = localStorage.getItem("email");

    if (!tokenKey || !email) {
      throw new Error("Authentication credentials are missing");
    }

    // Call the API with the headers
    const { data } = await axiosInstance.get(GET_TOP_HISTORY_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenKey}`, // Add the token for validation
        email, // Include email in headers
      },
    });

    return data; // Return the list of histories
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Failed to fetch histories");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getHistories = async (queryParams: { diseaseName?: string; sortOrder?: 'asc' | 'desc' }): Promise<any> => {
  try {
    // Retrieve the tokenKey and email from localStorage
    const tokenKey = localStorage.getItem("tokenKey");
    const email = localStorage.getItem("email");

    if (!tokenKey || !email) {
      throw new Error("Authentication credentials are missing");
    }

    // Build query parameters
    const params = {
      diseaseName: queryParams.diseaseName || '', // Optional disease name filter
      sortOrder: queryParams.sortOrder || 'desc', // Default sort order is 'desc'
    };

    // Call the API with the headers
    const { data } = await axiosInstance.get(GET_LIST_HISTORY_ENDPOINT, {
      params,
      headers: {
        Authorization: `Bearer ${tokenKey}`, // Add the token for validation
        email, // Include email in headers
      },
    });

    return data; // Return the list of histories
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Failed to fetch histories");
    }
    throw new Error("An unexpected error occurred");
  }
};