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

export default function TrackApplicationsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [yourApplications, setYourApplications] = useState<
    Schema["AcceptedJob"]["type"][]
  >([]);
  const [applicationsToYourJobs, setApplicationsToYourJobs] = useState<
    { jobTitle: string; applicantId: string; applicationText: string }[]
  >([]);
  const [applicationsToOtherJobs, setApplicationsToOtherJobs] = useState<
    { jobTitle: string; applicationText: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { userId: sub } = await getCurrentUser();

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

        const [jobRes, acceptedRes] = await Promise.all([
          client.models.Job.list(),
          client.models.AcceptedJob.list(),
        ]);

        const allJobs = jobRes.data;
        const allApplications = acceptedRes.data;

        const yourApps = allApplications.filter(
          (app) => app.userid === currentUserId
        );
        setYourApplications(yourApps);

        const yourJobs = allJobs.filter((job) => job.userid === currentUserId);

        const appsToYourJobs = allApplications
          .filter((app) => yourJobs.some((job) => job.id === app.jobid))
          .map((app) => {
            const job = yourJobs.find((j) => j.id === app.jobid);
            return {
              jobTitle: job?.title ?? "Unknown job",
              applicantId: app.userid ?? "Unknown user",
              applicationText: app.applytext ?? "",
            };
          });

        const appsToOtherJobs = yourApps.map((app) => {
          const job = allJobs.find((j) => j.id === app.jobid);
          return {
            jobTitle: job?.title ?? "Unknown job",
            applicationText: app.applytext ?? "",
          };
        });

        setApplicationsToYourJobs(appsToYourJobs);
        setApplicationsToOtherJobs(appsToOtherJobs);
      } catch (error) {
        console.error("Error loading applications:", error);
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
        <h2>All Applications</h2>

        {/* Applications to your jobs */}
        <div className="notif-section">
          {applicationsToYourJobs.length === 0 ? (
            <p>No one has applied to your jobs yet.</p>
          ) : (
            applicationsToYourJobs.map((notif, index) => (
              <div key={index} className="notif-card">
                <h3>{notif.jobTitle}</h3>
                <p>
                  <strong>{notif.applicantId}</strong> applied to your job.
                  <br /><br />
                  <em>{notif.applicationText}</em>
                </p>
              </div>
            ))
          )}
        </div>

        {/* Applications to other jobs */}
        <div className="notif-section">
          {applicationsToOtherJobs.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            applicationsToOtherJobs.map((application, index) => (
              <div key={index} className="notif-card">
                <p>
                  You applied to job: <strong>{application.jobTitle}</strong>.
                  <br /><br />
                  <em>{application.applicationText}</em>
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
