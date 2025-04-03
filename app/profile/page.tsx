"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Auth } from "aws-amplify";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import "../app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  // Fetch Logged-in User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        setUser(authUser);

        // Fetch User Details from Database
        const userId = authUser.attributes.sub;
        const userDetails = await client.models.User.get({ id: userId });

        setUserData(userDetails);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <main className="container">
      <nav className="navbar">
        <img
          src="/logo.png"
          alt="UHI Skill Share"
          className="logo"
          onClick={() => router.push("/jobs-page")}
          style={{ cursor: "pointer" }}
        />
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="/notifications-page">Notifications</a>
          <button onClick={() => router.push("/create-new-job")}>
            + New Job
          </button>
        </div>
      </nav>

      <div className="content">
        <div className="flex gap-6">
          {/* Profile Picture */}
          <div className="profile-header">
            <div className="profile-picture">
              <img
                src={userData?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="rounded-full w-24 h-24"
              />
            </div>

            {/* User Info */}
            <div className="user-info">
              <p>Screen Name:</p>
              <div className="user-name">{userData?.username || "N/A"}</div>

              {/* User Ratings */}
              <p>User Rating:</p>
              <div className="stars">⭐⭐⭐⭐⭐ ({userData?.averageRating || "0"})</div>

              <p>Average Comment Rating:</p>
              <div className="stars">⭐⭐⭐★★ ({userData?.commentRating || "0"})</div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="stats">
          <p>Jobs Posted: <span>{userData?.jobsPosted || 0}</span></p>
          <p>Jobs Undertaken: <span>{userData?.jobsTaken || 0}</span></p>
          <p>Comments: <span>{userData?.comments || 0}</span></p>
        </div>
      </div>
    </main>
  );
}
