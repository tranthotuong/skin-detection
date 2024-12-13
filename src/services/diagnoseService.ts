import axios from "axios";
import axiosInstance from "@/lib/axios";
import { PUT_IMAGE_ENDPOINT } from '@/lib/constants';

// Define the response structure
interface DiagnoseResponse {
  message: string;
  scanHistory: {
    id: number;
    scanDate: string;
    imageUrl: string;
    result: string;
    advice: string;
    diseaseId?: number | null;
    scannedBy: number;
    createdAt: string;
    updatedAt: string;
  };
}

// Define the service function
export const diagnoseImage = async (formData: FormData): Promise<DiagnoseResponse> => {
  try {
    // Retrieve the tokenKey and email from localStorage
    const tokenKey = localStorage.getItem("tokenKey");
    const email = localStorage.getItem("email");
    
    if (!tokenKey || !email) {
      throw new Error("Authentication credentials are missing");
    }

    const response = await axiosInstance.post<DiagnoseResponse>(PUT_IMAGE_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for file upload
        Authorization: `Bearer ${tokenKey}`, // Add the token for validation
        email, // Include email in headers
      },
    });
    return response.data; // Return the response data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to diagnose image');
    }
    throw new Error('An unexpected error occurred');
  }
};
