"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { login as loginService, 
  logout as logoutService, 
  signup as signupService, 
  updateAccountInfo as updateAccountInfoService} from "../services/authService";
import { getSports as getSportsService, getUserInfo as getUserInfoService  } from "../services/skinService";
import { diagnoseImage  as diagnoseImageService  } from "../services/diagnoseService";

type AuthContextType = {
  tokenKey: string | null;
  accUserKey: string | null;
  email: string | null;
  currentUser: any | null;
  dayOfWeeks: Array<{name: string, shortName: string}>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  fetchSports: () => Promise<any>;
  updateAccountInfo: (data: UpdateAccountInfoPayload) => Promise<void>;
  callDiagnoseImage: (formData: FormData) => Promise<any>;
  openCamera: () => void;
  closeCamera: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  isCamera: boolean;
};

// Define the payload type for account updates
type UpdateAccountInfoPayload = {
  colPic?: string;
  sports?: number[];
  name?: string;
  dayOfBirth?: Date;
  periodicitySport?: string[];
  gender?: string;
  loginIP?: string;
  device?: string;
  firstLogin?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokenKey, setTokenKey] = useState<string | null>(null);
  const [accUserKey, setAccUserKey] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCamera, setIsCamera] = useState<boolean>(false);
  const [dayOfWeeks] =  useState<Array<{name: string, shortName: string}>>([{
    name: 'Monday',
    shortName: 'M'
  },
  {
    name: 'Tuesday',
    shortName: 'T'
  },{
    name: 'Wednesday',
    shortName: 'W'
  },{
    name: 'Thursday',
    shortName: 'T'
  },{
    name: 'Friday',
    shortName: 'F'
  },{
    name: 'Saturday',
    shortName: 'S'
  },{
    name: 'Sunday',
    shortName: 'S'
  }])


  // Load tokenKey and accUserKey from localStorage on app initialization
  useEffect(() => {
    const storedTokenKey = localStorage.getItem("tokenKey");
    const storedAccUserKey = localStorage.getItem("accUserKey");
    const storedEmail = localStorage.getItem("email");
    if (storedTokenKey) {
      setTokenKey(storedTokenKey);
    }
    if (storedAccUserKey) {
      setAccUserKey(storedAccUserKey);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserInfo();
        setCurrentUser(data || null);
      } catch (err: any) {
        console.log(err as string);
      }
    }
    if(tokenKey && email){
      fetchUser();
    }
  }, [tokenKey, email]);

  /**
   * Login handler
   * @param email 
   * @param password 
   */
  const login = async (email: string, password: string) => {
    const { tokenKey, accUserKey } = await loginService(email, password);
    setTokenKey(tokenKey);
    setAccUserKey(accUserKey);
    setEmail(email);
    localStorage.setItem("tokenKey", tokenKey);
    localStorage.setItem("accUserKey", accUserKey);
    localStorage.setItem("email", email);
  };

  /**
   * Logout handler
   */
  const logout = () => {
    setTokenKey(null);
    setAccUserKey(null);
    setEmail(null);
    logoutService();
  };

  /**
   * Sign up
   * @param email 
   * @param password 
   */
  const signup = async (email: string, password: string) => {
    const data = await signupService(email, password);
    setEmail(data?.user.email);
  };

  /**
   * Fetch Sports handler
   */
  const fetchSports = async () => {
    try {
      return await getSportsService(); // Call the sports service
    } catch (error: any) {
      throw new Error((error.response?.data?.message as string) || "Failed to fetch sports data");
    }
  };
  /**
   * Update account information
   * @param data - Partial account information to update
   */
  const updateAccountInfo = async (data: UpdateAccountInfoPayload) => {
    try {
      const updatedAccount = await updateAccountInfoService(data);
    } catch (error: any) {
      throw new Error((error.response?.data?.message as string) || "Failed to update account info");
    }
  };
  /**
   * fetch user info
   * @returns 
   */
  const fetchUserInfo  = async () => {
    try {
      return await getUserInfoService(); // Call the user service
    } catch (error: any) {
      throw new Error((error.response?.data?.message as string) || "Failed to fetch user data");
    }
  };

  const openCamera = ():void => {
    setIsCamera(true);
  }

  const closeCamera = ():void => {
    setIsCamera(false);
  }

  const callDiagnoseImage = async (formData: FormData) => {
    try {
      const response = await diagnoseImageService(formData);
      return response;
    } catch (error: any) {
      throw new Error((error.response?.data?.message as string) || 'Failed to diagnose image');
    }
  };

  const isAuthenticated = !!tokenKey;

  return (
    <AuthContext.Provider value={{ tokenKey, accUserKey, email, currentUser, dayOfWeeks, isCamera, login, logout, signup, fetchSports, updateAccountInfo, callDiagnoseImage, openCamera, closeCamera, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
