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
    <main>
      <header>
        <h1>UHI Skill Share</h1>
        <button onClick={createJob}>+ New Job</button>
      </header>
      <section className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p className="poster">User ID: {job.userid}</p>
            <p>{job.description}</p>
            <p className="deadline">Deadline: {job.deadline}</p>
            <span className={`status ${job.status === 1 ? "open" : "closed"}`}>{job.status === 1 ? "Unresolved" : "Resolved"}</span>
          </div>
        ))}
      </section>
    </main>
  );
}

