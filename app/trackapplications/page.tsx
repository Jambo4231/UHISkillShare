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
        // Get Cognito user ID (sub)
        const { userId: sub } = await getCurrentUser();

        // Look up user in User table by sub
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

        // Fetch all jobs and accepted applications
        const [jobRes, acceptedRes] = await Promise.all([
          client.models.Job.list(),
          client.models.AcceptedJob.list(),
        ]);

        const allJobs = jobRes.data;
        const allApplications = acceptedRes.data;
		
		
		// Applications made BY this user
        const yourApps = allApplications.filter(
          (app) => app.userid === currentUserId
        );
        setYourApplications(yourApps);

        // Jobs created BY this user
        const yourJobs = allJobs.filter((job) => job.userid === currentUserId);

        // Applications TO your jobs
        const appsToYourJobs = allApplications
          .filter((app) =>
            yourJobs.some((job) => job.id === app.jobid)
          )
          .map((app) => {
            const job = yourJobs.find((j) => j.id === app.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
              applicantId: app.userid,
			  applicationText: app.applytext,
            };
          });
		  
		 // Jobs YOU applied to
		 const appsToOtherJobs = allApplications
          .filter((app) =>
            yourApps.some((app) => app.userid === currentUserId)
          )
          .map((app) => {
            const job = allJobs.find((j) => j.id === app.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
			  applicationText: app.applytext,
            };
          });

        setApplicationsToYourJobs(appsToYourJobs);
      } catch (error) {
        console.error("Error loading people's applications:", error);
      }
	  setApplicationsToOtherJobs(appsToOtherJobs);
      } catch (error) {
        console.error("Error loading your applications:", error);
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

		// Applications to your jobs
        <div className="notif-section">
          {applicationsToYourJobs.length === 0 ? (
            <p>No one has applied to your jobs yet.</p>
          ) : (
            applicationsToYourJobs.map((notif, index) => (
              <div key={index} className="notif-card">
				<h3>{notif.jobTitle}</h3>
                <p>
                  <strong>{notif.applicantId}</strong> applied to your job.
				  <br><br>
                  <em>{notif.applicationText}</em>
                </p>
              </div>
            ))
          )}
        </div>

		// Applications to other jobs
        <div className="notif-section">
          {appsToOtherJobs.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            appsToOtherJobs.map((job, app) => (
              <div key={app.id} className="notif-card">
                <p>
                  You applied to job: <strong>{job.jobTitle}</strong>.
				  <br><br>
                  <em>{app.applicationText}</em>
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}