"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  userSub: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  userSub: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userSub, setUserSub] = useState<string | null>(null);

  // Function to check the user session, including offline handling
  const checkUser = async () => {
    try {
      await fetchAuthSession();
      const user = await getCurrentUser();
      const sub = user.userId;

      localStorage.setItem("cachedSub", sub); // Cache the Cognito sub
      setUserSub(sub);
      setIsLoggedIn(true);
    } catch (err) {
      if (!navigator.onLine) {
        console.warn("Offline mode: using cached user sub.");
        const cached = localStorage.getItem("cachedSub");
        if (cached) {
          setUserSub(cached);
          setIsLoggedIn(true);
        } else {
          console.warn("No cached sub found. Treating as logged out.");
          setUserSub(null);
          setIsLoggedIn(false);
        }
      } else {
        setUserSub(null);
        setIsLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser(); // Check the user when the app is loaded

    const unsubscribe = Hub.listen("auth", () => {
      checkUser(); // Update login state on auth changes
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, userSub }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context easily in components
export const useAuth = () => useContext(AuthContext);
