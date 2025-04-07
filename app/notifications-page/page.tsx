"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";
import "../app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type YourApplication = {
  jobTitle: string;
  jobId: string;
  applytext?: string | null;
};

type ApplicationToYourJob = {
  jobTitle: string;
  applicantUsername: string;
  applytext?: string | null;
};

export default function NotificationsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [yourApplications, setYourApplications] = useState<YourApplication[]>([]);
  const [applicationsToYourJobs, setApplicationsToYourJobs] = useState<ApplicationToYourJob[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId: sub } = await getCurrentUser();
        setUserId(sub);

        const [jobRes, acceptedRes, userRes] = await Promise.all([
          client.models.Job.list(),
          client.models.AcceptedJob.list(),
          client.models.User.list(),
        ]);

        const allJobs = jobRes.data ?? [];
        const allApplications = acceptedRes.data ?? [];
        const allUsers = userRes.data ?? [];

        const userMap = new Map<string, string>();
        allUsers.forEach((user) => {
          if (user.sub && user.username) {
            userMap.set(user.sub, user.username);
          }
        });

        // Jobs posted by current user
        const yourJobs = allJobs.filter((job) => job.userid === sub);

        // Applications to your jobs
        const appsToYourJobs: ApplicationToYourJob[] = allApplications
          .filter((app) => yourJobs.some((job) => job.id === app.jobid))
          .map((app) => {
            const job = yourJobs.find((j) => j.id === app.jobid);
            const username = userMap.get(app.userid) || app.userid;
            return {
              jobTitle: job?.title || "Unknown job",
              applicantUsername: username,
              applytext: app.applytext ?? null,
            };
          });

        setApplicationsToYourJobs(appsToYourJobs);

        // Applications you made
        const yourApps: YourApplication[] = allApplications
          .filter((app) => app.userid === sub)
          .map((app) => {
            const job = allJobs.find((j) => j.id === app.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
              jobId: app.jobid,
              applytext: app.applytext ?? null,
            };
          });

        setYourApplications(yourApps);
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="container">
      <section className="content">
        <h2>Notifications</h2>

        <div className="notif-section">
          <h3>Applications to Your Jobs</h3>
          {applicationsToYourJobs.length === 0 ? (
            <p>No one has applied to your jobs yet.</p>
          ) : (
            applicationsToYourJobs.map((notif, index) => (
              <div key={index} className="notif-card">
                <p>
                  <strong>{notif.applicantUsername}</strong> applied to your job{" "}
                  <em>{notif.jobTitle}</em>.
                </p>
                {notif.applytext && (
                  <p>
                    <strong>Application message:</strong> {notif.applytext}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="notif-section">
          <h3>Your Job Applications</h3>
          {yourApplications.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            yourApplications.map((app, index) => (
              <div key={index} className="notif-card">
                <p>
                  You applied to job <strong>{app.jobTitle}</strong>.
                </p>
                {app.applytext && (
                  <p>
                    <strong>Message:</strong> {app.applytext}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
