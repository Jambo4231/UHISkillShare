"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

type AuthContextType = {
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({ isLoggedIn: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUser = async () => {
    try {
      await getCurrentUser();
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();

    const unsubscribe = Hub.listen("auth", () => {
      checkUser(); // updates on sign in/out events
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
