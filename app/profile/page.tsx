"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "@aws-amplify/auth";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobsPosted, setJobsPosted] = useState(0);
  const [jobsUndertaken, setJobsUndertaken] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await fetchAuthSession();
        const userId = session?.tokens?.idToken?.payload["sub"]; // Get logged-in user ID

        if (!userId) throw new Error("User ID not found in session");

        // Fetch user from database by sub
        const result = await client.models.User.list({
          filter: { sub: { eq: userId } },
        });

        const userData = result.data?.[0];
        if (!userData) throw new Error("User not found in database");

        setUser(userData);

        // Fetch related jobs/comments using user's internal model ID
        const [jobs, acceptedJobs, comments] = await Promise.all([
          client.models.Job.list({ filter: { userid: { eq: userData.id } } }),
          client.models.AcceptedJob.list({ filter: { userid: { eq: userData.id } } }),
          client.models.Comment.list({ filter: { userid: { eq: userData.id } } }),
        ]);

        setJobsPosted(jobs.data?.length || 0);
        setJobsUndertaken(acceptedJobs.data?.length || 0);
        setCommentsCount(comments.data?.length || 0);
      } catch (err: any) {
        console.error("❌ Error loading user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container">
      

      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 mt-6 rounded-lg">
        <div className="flex gap-6">
          <div className="profile-header">
            <div className="profile-picture">
              <img
                src="/DefaultProfile.png"
                alt="Profile"
                className="profile-picture"
              />
            </div>
            <div className="user-info">
              <p>Screen Name:</p>
              <div className="user-name">{user?.username || "N/A"}</div>

              <p>User Rating:</p>
              <div className="stars">
                {user?.rating ? "⭐".repeat(user.rating) : "No Ratings"}
              </div>

              <p>Average Comment Rating:</p>
              <div className="stars">
                {user?.averageCommentRating
                  ? "⭐".repeat(user.averageCommentRating)
                  : "No Ratings"}
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <p>Jobs Posted: <span>{jobsPosted}</span></p>
          <p>Jobs Undertaken: <span>{jobsUndertaken}</span></p>
          <p>Comments: <span>{commentsCount}</span></p>
        </div>
		
		<div className="update-profile-link">
		  <button onClick={() => router.push("/updateProfile")}>
			Update Profile
		  </button>
		</div>
      </div>
    </main>
  );
}
