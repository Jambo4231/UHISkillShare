"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { getCurrentUser } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useRouter } from "next/navigation";
import "../app.css";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function MyJobsPage() {
  const router = useRouter();
  const [myJobs, setMyJobs] = useState<Schema["Job"]["type"][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyJobs() {
      try {
        setLoading(true);

        // Get Cognito user sub
        const { userId: sub } = await getCurrentUser();

        // Lookup matching User record in DB
        const userRes = await client.models.User.list({
          filter: { sub: { eq: sub } },
        });

        const user = userRes.data?.[0];
        if (!user) throw new Error("User record not found");

        // Fetch jobs created by this user
        const jobRes = await client.models.Job.list({
          filter: { userid: { eq: user.id } },
        });

        setMyJobs(jobRes.data);
      } catch (err: any) {
        console.error("Failed to load jobs:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchMyJobs();
  }, []);

  function handleEdit(jobId: string) {
    router.push(`/edit-job/${jobId}`);
  }

  function handleView(jobId: string) {
    router.push(`/job-details/${jobId}`);
  }

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
          <a href="/my-jobs">My Jobs</a>
          <a href="/notifications-page">Notifications</a>
          <button onClick={() => router.push("/create-new-job")}>+ New Job</button>
        </div>
      </nav>

      <section className="content">
        <h2>My Jobs</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {myJobs.length === 0 && !loading && (
          <p>You haven't created any jobs yet.</p>
        )}

        <div className="jobs-list">
          {myJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={job.status === 1 ? "open" : "closed"}>
                  {job.status === 1 ? "Unresolved" : "Resolved"}
                </span>
              </p>
              <div className="job-actions">
                <button onClick={() => handleView(job.id)}>View</button>
                <button onClick={() => handleEdit(job.id)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
