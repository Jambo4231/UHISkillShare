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
  const router = useRouter();

  const [job, setJob] = useState<Schema["Job"]["type"] | null>(null);
  const [posterName, setPosterName] = useState("Loading...");
  const [comments, setComments] = useState<
    (Schema["Comment"]["type"] & { fullName?: string; averageRating?: number })[]
  >([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        const fullName = [user?.firstname, user?.surname].filter(Boolean).join(" ").trim();
        setPosterName(fullName || "Unknown user");
      } catch {
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
            const [userRes, ratingRes] = await Promise.all([
              client.models.User.list({ filter: { sub: { eq: comment.userid } } }),
              client.models.CommentRating.list({ filter: { commentid: { eq: comment.id } } }),
            ]);

            const user = userRes.data?.[0];
            const fullName = [user?.firstname, user?.surname].filter(Boolean).join(" ").trim() || "Unknown user";

            const ratings = ratingRes.data ?? [];
            const averageRating = ratings.length
              ? Math.round(ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length)
              : 0;

            return { ...comment, fullName, averageRating };
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

  async function handleRateComment(commentId: string, rating: number) {
    try {
      const { userId } = await getCurrentUser();

      const comment = comments.find((c) => c.id === commentId);
      if (!comment) return;

      if (comment.userid === userId) {
        alert("You can't rate your own comment.");
        return;
      }

      const existing = await client.models.CommentRating.list({
        filter: {
          commentid: { eq: commentId },
          ratinguserid: { eq: userId },
        },
      });

      if (existing.data?.[0]) {
        await client.models.CommentRating.update({
          id: existing.data[0].id,
          rating,
        });
      } else {
        await client.models.CommentRating.create({
          commentid: commentId,
          ratinguserid: userId,
          rating,
        });
      }

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, averageRating: rating } : c
        )
      );
    } catch (err) {
      console.error("Failed to rate comment:", err);
    }
  }

  async function handleCommentSubmit() {
    if (!newComment.trim()) return;
    try {
      const { userId } = await getCurrentUser();
      const userRes = await client.models.User.list({ filter: { sub: { eq: userId } } });
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

      const fullName =
        [currentUser?.firstname, currentUser?.surname].filter(Boolean).join(" ").trim() || "Unknown user";

      setComments((prev) => [
        ...prev,
        {
          ...(response.data as Schema["Comment"]["type"]),
          commenttime: timestamp,
          fullName,
          averageRating: 0,
        },
      ]);

      if (!replyTo && job?.userid && job.userid !== userId) {
        await client.models.Notification.create({
          userid: job.userid,
          notiftitle: "New comment on your job",
          notifdescription: `Someone commented on "${job.title}"`,
        });
      }

      if (replyTo) {
        const parent = comments.find((c) => c.id === replyTo);
        if (parent && parent.userid !== userId) {
          await client.models.Notification.create({
            userid: parent.userid,
            notiftitle: "You received a reply",
            notifdescription: `Someone replied to your comment on "${job?.title}"`,
          });
        }
      }

      setNewComment("");
      setReplyTo(null);
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment.");
    }
  }

  const topLevelComments = comments.filter((c) => !c.parentid);
  const repliesMap = comments.reduce(
    (acc, comment) => {
      if (comment.parentid) {
        if (!acc[comment.parentid]) acc[comment.parentid] = [];
        acc[comment.parentid].push(comment);
      }
      return acc;
    },
    {} as Record<string, typeof comments>
  );

  if (error) return <p className="error">{error}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <main className="container">
      <div className="job-details">
        <h2>{job.title}</h2>
        <p className="poster">
          Posted by: <strong>{posterName}</strong> • {job.subject || "No Subject"}
        </p>
        <p className="job-body">{job.description}</p>
        {job.deadline && (
          <p className="deadline">
            <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString("en-GB")}
          </p>
        )}

        <div className="comment-section">
          <h3>{replyTo ? "Reply to Comment" : "Leave a Comment"}</h3>
          <textarea
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
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
                      ? new Date(comment.commenttime).toLocaleString("en-GB")
                      : "Unknown time"}
                  </span>

                  <div className="stars" style={{ marginTop: "4px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          cursor: "pointer",
                          color: star <= (comment.averageRating ?? 0) ? "#facc15" : "#d1d5db",
                          fontSize: "1.2rem",
                        }}
                        onClick={() => handleRateComment(comment.id, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

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
                              ? new Date(reply.commenttime).toLocaleString("en-GB")
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
