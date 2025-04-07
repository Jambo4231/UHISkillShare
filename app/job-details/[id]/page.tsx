"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "../../app.css";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [job, setJob] = useState<Schema["Job"]["type"] | null>(null);
  const [posterName, setPosterName] = useState<string>("Loading...");
  const [comments, setComments] = useState<
    (Schema["Comment"]["type"] & { fullName?: string })[]
  >([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch Job Details
  useEffect(() => {
    async function fetchJob() {
      if (!id) return;
      try {
        const response = await client.models.Job.get({ id });
        if (!response?.data) {
          setError("Job not found");
          return;
        }
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details.");
      }
    }
    fetchJob();
  }, [id]);

  // Fetch Full Name of Poster
  useEffect(() => {
    async function fetchPosterName() {
      if (!job?.userid) return;
      try {
        const result = await client.models.User.list({
          filter: { sub: { eq: job.userid } },
        });

        const user = result.data?.[0];
        const firstname = user?.firstname ?? "";
        const surname = user?.surname ?? "";
        const fullName = [firstname, surname].filter(Boolean).join(" ").trim();

        setPosterName(fullName || "Unknown user");
      } catch (error) {
        console.error("Error fetching poster name:", error);
        setPosterName("Unknown user");
      }
    }
    fetchPosterName();
  }, [job?.userid]);

  // Fetch Comments and commenter names
  useEffect(() => {
    async function fetchComments() {
      if (!id) return;
      try {
        const response = await client.models.Comment.list({
          filter: { jobid: { eq: id } },
        });
        const rawComments = response?.data?.filter(Boolean) ?? [];

        const enrichedComments = await Promise.all(
          rawComments.map(async (comment) => {
            try {
              const userRes = await client.models.User.list({
                filter: { sub: { eq: comment.userid } },
              });
              const user = userRes.data?.[0];
              const firstname = user?.firstname ?? "";
              const surname = user?.surname ?? "";
              const fullName = [firstname, surname]
                .filter(Boolean)
                .join(" ")
                .trim();
              return { ...comment, fullName: fullName || "Unknown user" };
            } catch {
              return { ...comment, fullName: "Unknown user" };
            }
          })
        );

        setComments(enrichedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments.");
      }
    }
    fetchComments();
  }, [id]);

  // Handle Posting a Comment
  async function handleCommentSubmit() {
    if (!newComment.trim()) return;
    try {
      const { userId } = await getCurrentUser(); // Cognito sub

      const userRes = await client.models.User.list({
        filter: { sub: { eq: userId } },
      });

      const currentUser = userRes.data?.[0];
      const timestamp = Date.now();

      const response = await client.models.Comment.create({
        jobid: id,
        userid: userId,
        commenttext: newComment,
        commenttime: timestamp,
      });

      if (!response?.data) return;

      const newPostedComment = {
        ...response.data,
        commenttime: timestamp,
        fullName:
          [currentUser?.firstname, currentUser?.surname]
            .filter(Boolean)
            .join(" ")
            .trim() || "Unknown user",
      };

      setComments((prev) => [...prev, newPostedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment.");
    }
  }

  if (error) return <p className="error">{error}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <main className="container">
      <div className="job-details">
        <h2>{job.title}</h2>
        <p className="poster">
          Posted by: <strong>{posterName}</strong> •{" "}
          {job.subject || "No Subject"}
        </p>
        <p className="job-body">{job.description}</p>

        <div className="comment-section">
          <h3>Leave a comment</h3>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>

        <button
          className="apply-button"
          onClick={() => router.push(`/job-application/${id}`)}
        >
          Apply for Job / Share UHI Email
        </button>

        <div className="comments">
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.fullName}</strong>: {comment.commenttext}
                  <br />
                  <span className="timestamp">
                    {typeof comment.commenttime === "number"
                      ? new Date(comment.commenttime).toLocaleString()
                      : "Unknown time"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
