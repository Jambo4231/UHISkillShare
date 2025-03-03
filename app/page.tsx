"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function JobsPage() {
  const [jobs, setJobs] = useState<Array<Schema["Job"]["type"]>>([]);

  function listJobs() {
    client.models.Job.observeQuery().subscribe({
      next: (data) => setJobs([...data.items]),
    });
  }

  useEffect(() => {
    listJobs();
  }, []);

  function createJob() {
    const title = window.prompt("Enter job title:");
    const description = window.prompt("Enter job description:");
    const deadline = window.prompt("Enter deadline (YYYY-MM-DD):");
    if (title && description && deadline) {
      client.models.Job.create({
        title,
        description,
        deadline,
        status: 1, // Default to 'open'
        userid: "test-user", // Placeholder, replace with actual user ID from authentication
      });
    }
  }

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="#">Notifications</a>
          <button onClick={createJob}>+ New Job</button>
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
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <p className="poster">User: {job.userid} • Subject/Course</p>
                </div>
                <p className="job-body">{job.description}</p>
                <div className="job-footer">
                  <span className={`status ${job.status === 1 ? "open" : "closed"}`}>{job.status === 1 ? "Unresolved" : "Resolved"}</span>
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
