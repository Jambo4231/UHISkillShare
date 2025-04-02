"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from "aws-amplify/auth";
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
      if (!params.id) return;
      try {
        const response = await client.models.Job.get({ id: params.id });
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
  }, [params.id]);

  // Handle Job Application Submission
  async function handleJobSubmit() {
    if (!job) return;

    try {
      // Get Cognito user's sub
      const { userId: sub } = await getCurrentUser();

      // Look up User model using sub
      const userRes = await client.models.User.list({
        filter: { sub: { eq: sub } },
      });

      const user = userRes.data?.[0];

      if (!user) {
        alert("Could not find your user profile. Please contact support.");
        return;
      }

      // Submit application
      const response = await client.models.AcceptedJob.create({
        jobid: job.id,
        userid: user.id, // ← your internal user ID
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

  if (error) return <p className="error">{error}</p>;
  if (!job) return <p>Loading job details...</p>;

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
          <a href="/notifications-page">Notifications</a>
          <button onClick={() => router.push("/create-new-job")}>+ New Job</button>
        </div>
      </nav>

      <div className="job-details">
        <h2>{job.title}</h2>
        <p className="poster">
          Posted by: {job.userid || "Unknown"} • {job.subject || "No Subject"}
        </p>
        <p className="job-body">
          Do you wish to apply for this job? If the job poster accepts your application,
          your UHI email addresses will be shared with each other to allow for further
          communication.
        </p>

        {/* Application Form */}
        <div className="comment-section">
          <h3>
            If you have not already communicated in comments, you may choose to provide
            information or explanation here so that the job poster can see why your
            application is relevant to their issue.
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
