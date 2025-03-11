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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Array<Schema["Job"]["type"]>>([]);
  const router = useRouter();

  async function listJobs() {
    if (!client.models?.Job) {
      console.error("Job model is not available.");
      return;
    }

    try {
      const { data } = await client.models.Job.list();
      console.log("Jobs data received:", data);

      // Check if any jobs are missing the subject field
      data.forEach((job) => {
        if (!job.subject) {
          console.error(`Job with ID ${job.id} is missing a subject!`, job);
        }
      });

      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  }

  useEffect(() => {
    listJobs();
  }, []);

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="#">Notifications</a>
          <button onClick={() => router.push("/create-new-job")}>+ New Job</button>
        </div>
      </nav>
      <div className="layout">
        <aside className="sidebar">
          <h2>Sort by Course/Subject</h2>
          <ul>
            <li><input type="checkbox" /> Subject 1</li>
            <li><input type="checkbox" /> Subject 2</li>
            <li><input type="checkbox" /> Subject 3</li>
          </ul>
        </aside>
        <section className="content">
          <div className="jobs-list">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="job-card"
                onClick={() => router.push(`/job-details/${job.id}`)} // Redirects to Job Details
                style={{ cursor: "pointer" }}
              >
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <p className="poster">User: {job.userid} • Subject: {job.subject || "N/A"}</p>
                </div>
                <p className="job-body">{job.description}</p>
                <div className="job-footer">
                  <span className={`status ${job.status === 1 ? "open" : "closed"}`}>
                    {job.status === 1 ? "Unresolved" : "Resolved"}
                  </span>
                  <p className="comments">0 Comments</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
