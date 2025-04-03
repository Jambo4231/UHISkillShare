"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify"; 

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [commentRating, setCommentRating] = useState<number | null>(null);
  const [stats, setStats] = useState({
    jobsPosted: 0,
    jobsUndertaken: 0,
    comments: 0,
  });

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const username = authUser.username;

        const response = await client.models.User.list({
          filter: { username: { eq: username } },
        });

        if (!response?.data?.length) {
          setError("User not found in the database.");
          setLoading(false);
          return;
        }

        const userData = response.data[0];
        setUser(userData);

        const jobsPosted = await client.models.Job.list({
          filter: { userid: { eq: username } },
        });

        const jobsUndertaken = await client.models.AcceptedJob.list({
          filter: { userid: { eq: username } },
        });

        const comments = await client.models.Comment.list({
          filter: { userid: { eq: username } },
        });

        setStats({
          jobsPosted: jobsPosted?.data?.length || 0,
          jobsUndertaken: jobsUndertaken?.data?.length || 0,
          comments: comments?.data?.length || 0,
        });

        const ratingsResponse = await client.models.Rating.list({
          filter: { userid: { eq: username } },
        });

        const ratings = ratingsResponse?.data || [];
        if (ratings.length > 0) {
          const avg = ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;
          setAverageRating(avg.toFixed(1));
        }

        const commentRatingsResponse = await client.models.CommentRating.list({
          filter: { userid: { eq: username } },
        });

        const commentRatings = commentRatingsResponse?.data || [];
        if (commentRatings.length > 0) {
          const avgComment = commentRatings.reduce((sum, r) => sum + r.value, 0) / commentRatings.length;
          setCommentRating(avgComment.toFixed(1));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="container">
      <nav className="navbar">
        <img
          src="/logo.png"
          alt="UHI Skill Share"
          className="logo"
          onClick={() => router.push("/jobs-page")}
        />
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <button onClick={() => router.push("/notifications-page")}>Notifications</button>
          <button onClick={() => router.push("/create-new-job")}>+ New Job</button>
        </div>
      </nav>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">Profile Picture</div>
          <div className="user-info">
            <p><strong>Screen Name:</strong> {user.username}</p>
            <p><strong>Full Name:</strong> {user.firstname} {user.surname}</p>
            <p><strong>College:</strong> {user.college}</p>
            <p><strong>Area of Study:</strong> {user.areaofstudy || "Not specified"}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>User Rating:</strong> {averageRating ? `${averageRating} ⭐` : "No ratings yet"}</p>
            <p><strong>Average Comment Rating:</strong> {commentRating ? `${commentRating} ⭐` : "No comment ratings yet"}</p>
          </div>
        </div>

        <div className="stats">
          <p>Jobs Posted: <span>{stats.jobsPosted}</span></p>
          <p>Jobs Undertaken: <span>{stats.jobsUndertaken}</span></p>
          <p>Comments: <span>{stats.comments}</span></p>
        </div>

        {/* Link to Edit Profile Page */}
        <div className="edit-profile">
          <button onClick={() => router.push("/edit-profile")}>Edit Profile</button>
        </div>
      </div>
    </main>
  );
}
