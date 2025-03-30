"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type JobWithComments = Schema["Job"]["type"] & { commentCount: number };

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobWithComments[]>([]);
  const router = useRouter();

  async function listJobs() {
    if (!client.models?.Job || !client.models?.Comment) {
      console.error("Models are not available.");
      return;
    }

    try {
      const [jobRes, commentRes] = await Promise.all([
        client.models.Job.list(),
        client.models.Comment.list(),
      ]);

      const jobs = jobRes.data;
      const comments = commentRes.data;

      console.log("Jobs:", jobs);
      console.log("Comments:", comments);

      // Build jobid → count map
      const commentCounts = comments.reduce(
        (acc, comment) => {
          acc[comment.jobid] = (acc[comment.jobid] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Attach count to each job
      const jobsWithComments = jobs.map((job) => ({
        ...job,
        commentCount: commentCounts[job.id] || 0,
      }));

      setJobs(jobsWithComments);
    } catch (err) {
      console.error("Error fetching jobs or comments:", err);
    }
  }

  useEffect(() => {
    listJobs();
  }, []);

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
          <button onClick={() => router.push("/notifications-page")}>
            Notifications
          </button>
          <button onClick={() => router.push("/create-new-job")}>
            + New Job
          </button>
        </div>
      </nav>
      <div className="layout">
        <aside className="sidebar">
          <h2>Sort by Course/Subject</h2>
          <ul>
            <li>
              <input type="checkbox" /> Subject 1
            </li>
            <li>
              <input type="checkbox" /> Subject 2
            </li>
            <li>
              <input type="checkbox" /> Subject 3
            </li>
          </ul>
        </aside>
        <section className="content">
          <div className="jobs-list">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="job-card"
                onClick={() => router.push(`/job-details/${job.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <p className="poster">
                    User: {job.userid} • Subject:{" "}
                    {job.subject ? job.subject : "N/A"}
                  </p>
                </div>
                <p className="job-body">{job.description}</p>
                <div className="job-footer">
                  <span
                    className={`status ${job.status === 1 ? "open" : "closed"}`}
                  >
                    {job.status === 1 ? "Unresolved" : "Resolved"}
                  </span>
                  {job.status === 1 && (
                    <button
                      className="apply-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        router.push(`/job-application/${job.id}`);
                      }}
                    >
                      Apply Now
                    </button>
                  )}
                  <p className="comments">
                    {job.commentCount} Comment
                    {job.commentCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
