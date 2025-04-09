"use client";

import { useRouter } from "next/navigation";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    const unsubscribe = Hub.listen("auth", (data: any) => {
      switch (data.payload.event) {
        case "signedIn":
        case "tokenRefresh":
          setIsLoggedIn(true);
          break;
        case "signedOut":
        case "signIn_failure":
        case "tokenRefresh_failure":
          setIsLoggedIn(false);
          break;
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <a href="/jobs-page">
        <img
          src="/Media/logo.png"
          id="logo"
          alt="UHI Skill Share"
          title="UHI Skill Share"
        />
      </a>
      <div className="nav-links">
        {isLoggedIn && (
          <>
            <button onClick={() => router.push("/create-new-job")}>
              + New Job
            </button>
            <a href="/my-jobs">My Jobs</a>
            <a href="/notifications-page">Notifications</a>
            <a href="/profile">
              <img
                src="/Media/DefaultProfile.png"
                alt="Your Profile"
                id="NavbarProfile"
                title="Your Profile"
              />
            </a>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
        {isLoggedIn === false && (
          <a href="/login" className="login-button">
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
