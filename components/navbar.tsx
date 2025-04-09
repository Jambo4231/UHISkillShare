"use client";

import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { useAuth } from "../src/context/AuthContext"; 

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth(); 

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return <div className="navbar-placeholder">Loading...</div>;

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
        {isLoggedIn ? (
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
        ) : (
          <a href="/login" className="login-button">
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
