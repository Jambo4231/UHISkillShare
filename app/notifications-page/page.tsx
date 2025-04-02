"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import "../app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function NotificationsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [yourApplications, setYourApplications] = useState<
    Schema["AcceptedJob"]["type"][]
  >([]);
  const [applicationsToYourJobs, setApplicationsToYourJobs] = useState<
    { jobTitle: string; applicantId: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        // 👤 Get Cognito user ID (sub)
        const { userId: sub } = await getCurrentUser();

        // 🔍 Look up user in User table by sub
        const userRes = await client.models.User.list({
          filter: { sub: { eq: sub } },
        });

        const user = userRes.data?.[0];
        if (!user) {
          console.error("No user found with matching sub");
          return;
        }

        const currentUserId = user.id;
        setUserId(currentUserId);

        // 📥 Fetch all jobs and accepted applications
        const [jobRes, acceptedRes] = await Promise.all([
          client.models.Job.list(),
          client.models.AcceptedJob.list(),
        ]);

        const allJobs = jobRes.data;
        const allApplications = acceptedRes.data;

        // 💼 Applications BY this user
        const yourApps = allApplications.filter(
          (app) => app.userid === currentUserId
        );
        setYourApplications(yourApps);

        // 📄 Jobs CREATED BY this user
        const yourJobs = allJobs.filter((job) => job.userid === currentUserId);

        // 📩 Applications TO your jobs
        const appsToYourJobs = allApplications
          .filter((app) => yourJobs.some((job) => job.id === app.jobid))
          .map((app) => {
            const job = yourJobs.find((j) => j.id === app.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
              applicantId: app.userid,
            };
          });

        setApplicationsToYourJobs(appsToYourJobs);
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    }

    fetchData();
  }, []);

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
          <button onClick={() => router.push("/create-new-job")}>
            + New Job
          </button>
        </div>
      </nav>

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
                  <strong>{notif.applicantId}</strong> applied to your job{" "}
                  <em>{notif.jobTitle}</em>.
                </p>
              </div>
            ))
          )}
        </div>

        <div className="notif-section">
          <h3>Your Job Applications</h3>
          {yourApplications.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            yourApplications.map((app) => (
              <div key={app.id} className="notif-card">
                <p>
                  You applied to job <strong>{app.jobid}</strong>.
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
