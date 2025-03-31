"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
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
  const [isSubmitting, setIsSubmitting] = useState(false); 

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
  if (!job || !applicationMessage.trim()) {
    alert("Application message cannot be empty.");
    return;
  }

  setIsSubmitting(true); // Disable submit to prevent multiple entries

  try {
    console.log("Fetching logged-in user details...");

    // Fetch the current authenticated user
    const user = await Auth.currentAuthenticatedUser();
    const username = user.username;

    console.log("Submitting application for job ID:", job.id, "by user:", username);

    // Create an entry in the Accepted Job table
    await client.models.AcceptedJob.create({
      jobid: job.id,
      userid: username,
      applytext: applicationMessage.trim(),
    });

    console.log("Application submitted successfully");
    alert("Your application has been submitted successfully!");

    setApplicationMessage(""); 
    router.push("/jobs-page"); // Redirect to the jobs page

  } catch (error) {
    console.error("Error submitting application:", error);
    alert("Failed to submit application.");
  } finally {
    setIsSubmitting(false);
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