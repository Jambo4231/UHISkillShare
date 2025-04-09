"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from "aws-amplify/auth";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "../../app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TrackApplicationsPage({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const [applications, setApplications] = useState<
    { applicantId: string; applicationText: string }[]
  >([]);
  const [jobTitle, setJobTitle] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId: sub } = await getCurrentUser();

        const jobRes = await client.models.Job.get({ id: jobId });
        const job = jobRes.data;

        if (!job) {
          setError("Job not found.");
          return;
        }

        setJobTitle(job.title ?? "Unknown Job");

        // Check if the job belongs to the current user
        if (job.userid !== sub) {
          setError("You do not have permission to view applications for this job.");
          return;
        }

        const acceptedRes = await client.models.AcceptedJob.list({
          filter: { jobid: { eq: jobId } },
        });

        const acceptedApps = acceptedRes.data?.filter(Boolean) ?? [];

        const appList = acceptedApps.map((app) => ({
          applicantId: app.userid ?? "Unknown user",
          applicationText: app.applytext ?? "",
        }));

        setApplications(appList);
      } catch (err: any) {
        console.error("Error loading applications:", err);
        setError(err.message || "Failed to load applications.");
      }
    }

    fetchData();
  }, [jobId]);

  return (
    <main className="container">
      <section className="content">
        <h2>Applications for: {jobTitle}</h2>
        {error && <p className="error">{error}</p>}
        {!error && applications.length === 0 && (
          <p>No one has applied to this job yet.</p>
        )}
        {!error &&
          applications.map((app, index) => (
            <div key={index} className="notif-card">
              <p>
                <strong>{app.applicantId}</strong> applied to this job.
                <br />
                <br />
                <em>{app.applicationText}</em>
              </p>
            </div>
          ))}
      </section>
    </main>
  );
}
