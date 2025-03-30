"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import Auth from "aws-amplify/auth";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "../../app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [applicationMessage, setApplicationMessage] = useState("");

  // Fetch Job Details
  useEffect(() => {
    async function fetchJob() {
      if (!params.id) return; // Ensure we have an ID
      try {
        console.log("Fetching job with ID:", params.id);
        const response = await client.models.Job.get({ id: params.id });

        if (!response?.data) {
          console.error("Job data is undefined or null:", response);
          setError("Job not found");
          return;
        }

        console.log("Fetched Job Data:", response.data);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details.");
      }
    }
    fetchJob();
  }, [params.id]);

  // Handle Job Application Submission
  async function handleJobSubmit() {
    if (!job) return;

    try {
      console.log("Fetching logged-in user details...");

      // Fetch current user
      const user = await Auth.getCurrentUser();
      const username = user.username;

      console.log("Submitting application for job ID:", job.id, "by user:", username);

      // Create an entry in the AcceptedJob table
      const response = await client.models.AcceptedJob.create({
        jobid: job.id,
        userid: username,
        applytext: applicationMessage,
      });

      console.log("Application submitted successfully:", response);
      alert("Your application has been submitted successfully!");

      setApplicationMessage("");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    }
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

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
        <p className="poster">
          Posted by: {job.userid || "Unknown"} • {job.subject || "No Subject"}
        </p>
        <p className="job-body">
          Do you wish to apply for this job? If the job poster accepts your application, your UHI email addresses will be shared with each other to allow for further communication.
        </p>

        {/* Application Form */}
        <div className="comment-section">
          <h3>
            If you have not already communicated in comments, you may choose to provide information or explanation here so that the job poster can see why your application is relevant to their issue.
          </h3>
          <textarea
            placeholder="Write your application"
            value={applicationMessage}
            onChange={(e) => setApplicationMessage(e.target.value)}
          ></textarea>
          <button onClick={handleJobSubmit}>Submit</button>
        </div>
      </div>
    </main>
  );
}