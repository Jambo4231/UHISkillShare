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
    <>
      <a href="/jobs-page">
        <img
          src="logo.png"
          id="logomobile"
          alt="UHI Skill Share"
          title="UHI Skill Share"
        />
      </a>
      <input type="checkbox" id="navbar-active" />
      <label htmlFor="navbar-active" className="opennavbarbutton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </label>
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
              <label htmlFor="navbar-active" className="closenavbarbutton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </label>
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
    </>
  );
};

export default Navbar;
