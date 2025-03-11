"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "@/app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [job, setJob] = useState<Schema["Job"]["type"] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchJob() {
      if (!id) return;
      try {
        console.log("Fetching job with ID:", id);
        const response = await client.models.Job.get({ id });

        if (!response || !response.data) {
          console.error("Job data is undefined or null:", response);
          return;
        }

        console.log("Fetched Job Data:", response.data);
        setJob(response.data); 
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    }
    fetchJob();
  }, [id]);

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
        <p className="poster">Posted by: {job.userid || "Unknown"} • {job.subject || "No Subject"}</p>
        <p className="job-body">{job.description}</p>

        <div className="comment-section">
          <h3>Leave a comment</h3>
          <textarea placeholder="Write a comment..."></textarea>
          <button>Submit Comment</button>
        </div>

        <div className="comments">
          <h3>Comments</h3>
          <p>No comments yet.</p> {}
        </div>
      </div>
    </main>
  );
}
