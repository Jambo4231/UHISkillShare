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
  const [posterName, setPosterName] = useState("Loading...");
  const [comments, setComments] = useState<(Schema["Comment"]["type"] & { fullName?: string })[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
              const fullName = [firstname, surname].filter(Boolean).join(" ").trim();
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

  async function handleCommentSubmit() {
    if (!newComment.trim()) return;
    try {
      const { userId } = await getCurrentUser();

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
        parentid: replyTo ?? undefined,
      });

      if (!response?.data) return;

      const newPostedComment = {
        ...response.data,
        commenttime: timestamp,
        fullName:
          [currentUser?.firstname, currentUser?.surname].filter(Boolean).join(" ").trim() || "Unknown user",
      };

      setComments((prev) => [...prev, newPostedComment]);
      setNewComment("");
      setReplyTo(null);
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment.");
    }
  }

  if (error) return <p className="error">{error}</p>;
  if (!job) return <p>Loading job details...</p>;

  const topLevelComments = comments.filter((c) => !c.parentid);
  const repliesMap = comments.reduce((acc, comment) => {
    if (comment.parentid) {
      if (!acc[comment.parentid]) acc[comment.parentid] = [];
      acc[comment.parentid].push(comment);
    }
    return acc;
  }, {} as Record<string, typeof comments>);

  return (
    <main className="container">
      <div className="job-details">
        <h2>{job.title}</h2>
        <p className="poster">
          Posted by: <strong>{posterName}</strong> • {job.subject || "No Subject"}
        </p>
        <p className="job-body">{job.description}</p>

        <div className="comment-section">
          <h3>{replyTo ? "Reply to Comment" : "Leave a Comment"}</h3>
          <textarea
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleCommentSubmit}>
            {replyTo ? "Submit Reply" : "Submit Comment"}
          </button>
          {replyTo && (
            <button className="cancel-reply" onClick={() => setReplyTo(null)}>
              Cancel Reply
            </button>
          )}
        </div>

        <button className="apply-button" onClick={() => router.push(`/job-application/${id}`)}>
          Apply for Job / Share UHI Email
        </button>

        <div className="comments">
          <h3>Comments</h3>
          {topLevelComments.length > 0 ? (
            <ul>
              {topLevelComments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.fullName}</strong>: {comment.commenttext}
                  <br />
                  <span className="timestamp">
                    {typeof comment.commenttime === "number"
                      ? new Date(comment.commenttime).toLocaleString()
                      : "Unknown time"}
                  </span>
                  <div>
                    <button onClick={() => setReplyTo(comment.id)}>Reply</button>
                  </div>

                  {repliesMap[comment.id]?.length > 0 && (
                    <ul className="replies">
                      {repliesMap[comment.id].map((reply) => (
                        <li key={reply.id}>
                          <strong>{reply.fullName}</strong>: {reply.commenttext}
                          <br />
                          <span className="timestamp">
                            {typeof reply.commenttime === "number"
                              ? new Date(reply.commenttime).toLocaleString()
                              : "Unknown time"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
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
