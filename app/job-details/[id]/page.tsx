"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "../../app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [job, setJob] = useState<Schema["Job"]["type"] | null>(null);
  const [comments, setComments] = useState<Schema["Comment"]["type"][]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch Job Details
  useEffect(() => {
    async function fetchJob() {
      if (!id) return;
      try {
        console.log("Fetching job with ID:", id);
        const response = await client.models.Job.get({ id });

        if (!response?.data) {
          console.error("Job data is undefined or null:", response);
          setError("Job not found");
          return;
        }

        console.log("Fetched Job Data:", response.data);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details.");
      }
    }
    fetchJob();
  }, [id]);

  // Fetch Comments
  useEffect(() => {
    async function fetchComments() {
      if (!id) return;
      try {
        console.log("Fetching comments for job:", id);
        const response = await client.models.Comment.list({
          filter: { jobid: { eq: id } }, // Fetch only comments for this job
        });

        if (!response?.data || !Array.isArray(response.data)) {
          console.log("No comments found for this job.");
          setComments([]); // Ensure an empty array instead of null
          return;
        }

        console.log("Fetched Comments:", response.data);
        setComments(response.data.filter((comment) => comment !== null)); // Filter out null values
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
      const userId = "sample-user-id"; // Replace with actual user ID from auth
      const response = await client.models.Comment.create({
        jobid: id,
        userid: userId,
        commenttext: newComment,
        commenttime: Date.now(), // Ensure numeric timestamp
      });
  
      // Ensure response.data is valid before updating state
      if (!response?.data) {
        console.error("Comment creation failed.");
        return; // Exit if there's no valid comment data
      }
  
      console.log("Comment posted:", response.data);
  
      // Ensure only valid comments are stored, avoiding `null` at all costs
      setComments((prevComments = []) =>
        [...prevComments, response.data].filter((comment) => comment !== null)
      );
  
      setNewComment(""); // Clear input field
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment.");
    }
  }
  
  

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="#">Notifications</a>
          <button onClick={() => router.push("/jobs-page")}>Back</button>
        </div>
      </nav>

      <div className="job-details">
        <h2>{job.title}</h2>
        <p className="poster">
          Posted by: {job.userid || "Unknown"} • {job.subject || "No Subject"}
        </p>
        <p className="job-body">{job.description}</p>

        {/* Comment Form */}
        <div className="comment-section">
          <h3>Leave a comment</h3>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>

        {/* Comments List */}
        <div className="comments">
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.userid}</strong>: {comment.commenttext} <br />
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
