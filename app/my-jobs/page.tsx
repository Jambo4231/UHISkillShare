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

        // Get Cognito user sub directly
        const { userId: sub } = await getCurrentUser();

        const jobRes = await client.models.Job.list({
          filter: { userid: { eq: sub } },
        });

        setMyJobs(jobRes.data ?? []);
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
    router.push(`/manage-jobs/[id]/${jobId}`);
  }

  function handleView(jobId: string) {
    router.push(`/trackapplications/${jobId}`);
  }
  

  return (
    <main className="container">
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
                <button onClick={() => handleView(job.id)}>View Applications</button>
                <button onClick={() => handleEdit(job.id)}>Manage Job</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
