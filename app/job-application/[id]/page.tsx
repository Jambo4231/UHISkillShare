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
  const [job, setJob] = useState<Schema["Job"]["type"] | null>(null);
  const [posterName, setPosterName] = useState("Loading...");
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

  // Fetch Full Name of Poster
  useEffect(() => {
    async function fetchPosterName() {
      if (!job?.userid) return;
      try {
        const result = await client.models.User.list({
          filter: { sub: { eq: job.userid } },
        });
        const user = result.data?.[0];
        const firstname = user?.firstname ?? "";
        const surname = user?.surname ?? "";
        const fullName = [firstname, surname].filter(Boolean).join(" ").trim();
        setPosterName(fullName || "Unknown user");
      } catch (error) {
        console.error("Error fetching poster name:", error);
        setPosterName("Unknown user");
      }
    }
    fetchPosterName();
  }, [job?.userid]);

  // Handle Job Application Submission
  async function handleJobSubmit() {
    if (!job) return;

    try {
      const { userId: sub } = await getCurrentUser();

      await client.models.AcceptedJob.create({
        jobid: job.id,
        userid: sub, 
        applytext: applicationMessage,
      });

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
      <div className="job-details">
        <h2>{job.title}</h2>
        <p className="poster">
          Posted by: <strong>{posterName}</strong> • {job.subject || "No Subject"}
        </p>
        <p className="job-body">
          Do you wish to apply for this job? If the job poster accepts your application,
          your UHI email addresses will be shared with each other to allow for further
          communication.
        </p>

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
