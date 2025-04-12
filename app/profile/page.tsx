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
  const [averageUserRating, setAverageUserRating] = useState<number | null>(null);
  const [averageCommentRating, setAverageCommentRating] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await fetchAuthSession();
        const userId = session?.tokens?.idToken?.payload["sub"];
        if (!userId) throw new Error("User ID not found in session");

        const result = await client.models.User.list({
          filter: { sub: { eq: userId } },
        });

        const userData = result.data?.[0];
        if (!userData) throw new Error("User not found in database");
        setUser(userData);

        const [jobs, acceptedJobs, comments, ratings] = await Promise.all([
          client.models.Job.list({ filter: { userid: { eq: userData.sub } } }),
          client.models.AcceptedJob.list({ filter: { userid: { eq: userData.id } } }),
          client.models.Comment.list({ filter: { userid: { eq: userData.sub } } }),
          client.models.Rating.list({ filter: { rateduserid: { eq: userData.sub } } }),
        ]);

        setJobsPosted(jobs.data?.length || 0);
        setJobsUndertaken(acceptedJobs.data?.length || 0);
        setCommentsCount(comments.data?.length || 0);

        // Calculate average user rating
        const ratingValues = ratings.data?.map((r) => r.rating) || [];
        if (ratingValues.length > 0) {
          const avg = Math.round(ratingValues.reduce((sum, r) => sum + r, 0) / ratingValues.length);
          setAverageUserRating(avg);
        }

        // Calculate average comment rating
        const commentIds = comments.data?.map((c) => c.id) || [];
        if (commentIds.length > 0) {
          const commentRatingsRes = await client.models.CommentRating.list();
          const commentRatings = commentRatingsRes.data?.filter((r) =>
            commentIds.includes(r.commentid)
          ) || [];

          const commentRatingValues = commentRatings.map((r) => r.rating);
          if (commentRatingValues.length > 0) {
            const avgComment = Math.round(
              commentRatingValues.reduce((sum, r) => sum + r, 0) / commentRatingValues.length
            );
            setAverageCommentRating(avgComment);
          }
        }
      } catch (err: any) {
        console.error("Error loading user:", err);
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
                {averageUserRating !== null ? "⭐".repeat(averageUserRating) : "No Ratings"}
              </div>

              <p>Average Comment Rating:</p>
              <div className="stars">
                {averageCommentRating !== null ? "⭐".repeat(averageCommentRating) : "No Ratings"}
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
