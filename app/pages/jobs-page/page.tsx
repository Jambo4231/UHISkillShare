"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../pages/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function JobsPage() {
  const [jobs, setJobs] = useState<Array<Schema["Job"]["type"]>>([]);
  const router = useRouter();

  function listJobs() {
    client.models.Job.observeQuery().subscribe({
      next: (data) => setJobs([...data.items]),
    });
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
