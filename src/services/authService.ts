import axios from "axios";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT, ACCOUNT_UPDATE_ENDPOINT } from '@/lib/constants';
import { LoginResponse } from "@/types";
import axiosInstance from "@/lib/axios";

async function getClientIP() {
  const response = await fetch('https://api.ipify.org?format=json'); // Get public IP
  const data = await response.json();
  return data.ip;
}

// Login function
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const loginIP = await getClientIP();

    const { data } = await axiosInstance.post<any>(LOGIN_ENDPOINT, {
      email,
      password,
      loginIP
    });
    return data; // Axios automatically parses JSON
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Logout function
export const logout = () => {
  // Clear token and accUserKey
  localStorage.removeItem("tokenKey");
  localStorage.removeItem("accUserKey");
};


export const signup = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const { data } = await axios.post<any>(SIGNUP_ENDPOINT, {
      email,
      password,
    });
    return data; // Return the response containing tokenKey and accUserKey
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Sign-up failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateAccountInfo = async (updateData: object): Promise<any> => {
  try {
    // Retrieve the tokenKey and email from localStorage
    const tokenKey = localStorage.getItem("tokenKey");
    const email = localStorage.getItem("email");

    if (!tokenKey || !email) {
      throw new Error("Authentication credentials are missing");
    }

    const { data } = await axios.put<any>(
      ACCOUNT_UPDATE_ENDPOINT,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${tokenKey}`, // Token for validation
          email, // Email for validation
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to update account info");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};