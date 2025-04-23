"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useAuth } from "../../../src/context/AuthContext";
import "@aws-amplify/ui-react/styles.css";
import "../../app.css";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function PublicUserProfile({
  params,
}: {
  params: { id: string };
}) {
  const viewedUserSub = params.id;
  const router = useRouter();
  const { userSub } = useAuth();

  const [user, setUser] = useState<Schema["User"]["type"] | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [yourRating, setYourRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!userSub || !viewedUserSub) return;

      try {
        const userRes = await client.models.User.list({
          filter: { sub: { eq: viewedUserSub } },
        });

        const fetchedUser = userRes.data?.[0];
        if (!fetchedUser) {
          setError("User not found.");
          return;
        }

        setUser(fetchedUser);

        const ratingRes = await client.models.Rating.list({
          filter: { rateduserid: { eq: viewedUserSub } },
        });

        const ratingData = ratingRes.data ?? [];
        if (ratingData.length > 0) {
          const avg = Math.round(
            ratingData.reduce((sum, r) => sum + r.rating, 0) / ratingData.length
          );
          setAverageRating(avg);
        }

        const yourRatingRes = await client.models.Rating.list({
          filter: {
            rateduserid: { eq: viewedUserSub },
            ratinguserid: { eq: userSub },
          },
        });

        const existing = yourRatingRes.data?.[0];
        if (existing) setYourRating(existing.rating);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
      }
    }

    fetchUserData();
  }, [viewedUserSub, userSub]);

  async function handleRateUser(rating: number) {
    if (!userSub || !viewedUserSub) {
      alert("Cannot rate without valid user IDs.");
      return;
    }

    if (userSub === viewedUserSub) {
      alert("You can't rate yourself.");
      return;
    }

    try {
      const existingRes = await client.models.Rating.list({
        filter: {
          rateduserid: { eq: viewedUserSub },
          ratinguserid: { eq: userSub },
        },
      });

      const existing = existingRes.data?.[0];

      if (existing) {
        await client.models.Rating.update({ id: existing.id, rating });
      } else {
        await client.models.Rating.create({
          jobid: "n/a",
          rateduserid: viewedUserSub,
          ratinguserid: userSub,
          rating,
        });
      }

      setYourRating(rating);
      alert("Rating submitted.");
    } catch (err) {
      console.error("Failed to submit rating:", err);
      alert("There was an error submitting your rating.");
    }
  }

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <main className="container">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-6 mt-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">User Profile</h2>

        <div className="profile-header">
          <img
            src="/DefaultProfile.png"
            alt="Profile"
            className="profile-picture"
          />

          <div className="user-info">
            <p>
              <strong>Screen Name:</strong> {user.username}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {[user.firstname, user.surname].filter(Boolean).join(" ")}
            </p>
            <p>
              <strong>College:</strong> {user.college || "N/A"}
            </p>
            <p>
              <strong>Area of Study:</strong> {user.areaofstudy || "N/A"}
            </p>

            <p className="mt-3">
              <strong>Average Rating:</strong>
              <span className="stars">
                {averageRating !== null
                  ? " ⭐".repeat(averageRating)
                  : " No Ratings"}
              </span>
            </p>

            {userSub !== viewedUserSub && (
              <div className="rate-user mt-3">
                <p>
                  <strong>Rate this user:</strong>
                </p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: "pointer",
                      color: star <= (yourRating ?? 0) ? "#facc15" : "#d1d5db",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => handleRateUser(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
