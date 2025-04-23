"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth"; // Your previous working imports
import { Hub } from "aws-amplify/utils"; // Correct import for Hub

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check the user session, including offline handling
  const checkUser = async () => {
    try {
      // First, try fetching the auth session
      await fetchAuthSession();
      await getCurrentUser();
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser(); // Check the user when the app is loaded

    const unsubscribe = Hub.listen("auth", () => {
      checkUser(); // Update login state on auth changes
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context easily in components
export const useAuth = () => useContext(AuthContext);
