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

type ApplicationWithExtras = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  applicationText: string;
  status: string;
};

export default function TrackApplicationsPage({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const [applications, setApplications] = useState<ApplicationWithExtras[]>([]);
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

        if (job.userid !== sub) {
          setError("You do not have permission to view applications for this job.");
          return;
        }

        const [acceptedRes, usersRes] = await Promise.all([
          client.models.AcceptedJob.list({ filter: { jobid: { eq: jobId } } }),
          client.models.User.list(),
        ]);

        const acceptedApps = acceptedRes.data?.filter(Boolean) ?? [];
        const users = usersRes.data?.filter(Boolean) ?? [];

        const userMap = new Map<string, { fullName: string; email: string }>();
        users.forEach((user) => {
          const fullName = `${user.firstname ?? ""} ${user.surname ?? ""}`.trim() || "Unnamed user";
          const email = user.email ?? "No email provided";
          if (user.sub) {
            userMap.set(user.sub, { fullName, email });
          }
        });

        const appList: ApplicationWithExtras[] = acceptedApps.map((app) => {
          const userInfo = userMap.get(app.userid ?? "") ?? {
            fullName: "Unknown user",
            email: "Unknown email",
          };

          return {
            id: app.id!,
            userId: app.userid ?? "unknown",
            fullName: userInfo.fullName,
            email: userInfo.email,
            applicationText: app.applytext ?? "",
            status: app.status ?? "pending",
          };
        });

        setApplications(appList);
      } catch (err: any) {
        console.error("Error loading applications:", err);
        setError(err.message || "Failed to load applications.");
      }
    }

    fetchData();
  }, [jobId]);

  async function handleDecision(
    appId: string,
    applicantId: string,
    action: "accepted" | "rejected"
  ) {
    try {
      await client.models.AcceptedJob.update({
        id: appId,
        status: action,
      });

      await client.models.Notification.create({
        userid: applicantId,
        notiftitle: `Your application was ${action}`,
        notifdescription: `Your application to "${jobTitle}" was ${action}.`,
      });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: action } : app
        )
      );
    } catch (err) {
      console.error(`Failed to ${action} application:`, err);
    }
  }

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
                <strong>{app.fullName}</strong> ({app.email}) applied to this job.
                <br />
                <br />
                <em>{app.applicationText}</em>
              </p>

              {app.status === "pending" ? (
                <div className="actions">
                  <button onClick={() => handleDecision(app.id, app.userId, "accepted")}>
                    Accept
                  </button>
                  <button onClick={() => handleDecision(app.id, app.userId, "rejected")}>
                    Reject
                  </button>
                </div>
              ) : (
                <p>
                  <strong>Status:</strong> {app.status === "accepted" ? "Accepted" : "Rejected"}
                </p>
              )}
            </div>
          ))}
      </section>
    </main>
  );
}
