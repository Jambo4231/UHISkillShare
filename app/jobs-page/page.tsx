"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type JobWithExtras = Schema["Job"]["type"] & {
  commentCount: number;
  posterFullName?: string;
};

const subjectOptions = [
  "Advanced databases",
  "Designing web-based applications",
  "Cyber security",
  "Server technologies",
  "Network and information security",
  "Artificial intelligence",
  "Software construction",
  "Mobile applications development",
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobWithExtras[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const router = useRouter();

  async function listJobs() {
    try {
      const [jobRes, commentRes, userRes] = await Promise.all([
        client.models.Job.list(),
        client.models.Comment.list(),
        client.models.User.list(),
      ]);
  
      const jobs = (jobRes.data ?? []).filter((j): j is NonNullable<typeof j> => j !== null);
      const comments = (commentRes.data ?? []).filter((c): c is NonNullable<typeof c> => c !== null);
      const users = (userRes.data ?? []).filter((u): u is NonNullable<typeof u> => u !== null);
  
      const userMap = new Map<string, string>();
      users.forEach((user) => {
        const fullName = `${user.firstname ?? ""} ${user.surname ?? ""}`.trim();
        if (user.id) {
          userMap.set(user.id, fullName || "Unnamed user");
        }
      });
  
      const commentCounts = comments.reduce((acc, comment) => {
        if (comment.jobid) {
          acc[comment.jobid] = (acc[comment.jobid] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
  
      const enrichedJobs = jobs.map((job) => {
        const posterFullName = job.userid && userMap.has(job.userid)
          ? userMap.get(job.userid)
          : "Unknown user";
  
        return {
          ...job,
          commentCount: commentCounts[job.id] || 0,
          posterFullName,
        };
      });
  
      setJobs(enrichedJobs);
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
    }
  }
  

  async function handleLogout() {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  useEffect(() => {
    listJobs();
  }, []);

  function handleSubjectToggle(subject: string) {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }

  const filteredJobs = jobs.filter((job) => {
    return (
      selectedSubjects.length === 0 ||
      selectedSubjects.includes(job.subject || "")
    );
  });

  return (
    <main className="container">
       <nav className="navbar">
		<a href="/jobs-page"><img src="../Media/logo.png" id='logo' alt='UHI Skill Share' title="UHI Skill Share"/></a>
		<div className="nav-links">
			<button onClick={() => router.push("/create-new-job")}>+ New Job</button>
				<a href="/my-jobs">My Jobs</a>
				<a href="/notifications-page">Notifications</a>
				<a href="/profile"><img src="../Media/DefaultProfile.png" alt='Your Profile' id='NavbarProfile' title="Your Profile"/></a>
				<button onClick={handleLogout} className="logout-button">Logout</button>
		</div>
	</nav>

      <div className="layout">
        <aside className="sidebar">
          <h2>Sort by Course/Subject</h2>
          <ul>
            {subjectOptions.map((subject) => (
              <li key={subject}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                  />
                  {subject}
                </label>
              </li>
            ))}
          </ul>
        </aside>

        <section className="jobs-list-container">
          <div className="jobs-list">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="job-card"
                onClick={() => router.push(`/job-details/${job.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <p className="poster">
                    Posted by: {job.posterFullName || "Unknown user"} • Subject:{" "}
                    {job.subject || "N/A"}
                  </p>
                </div>
                <p className="job-body">{job.description}</p>
                <div className="job-footer">
                  <span
                    className={`status ${job.status === 1 ? "open" : "closed"}`}
                  >
                    {job.status === 1 ? "Unresolved" : "Resolved"}
                  </span>
                  {job.status === 1 && (
                    <button
                      className="apply-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        router.push(`/job-application/${job.id}`);
                      }}
                    >
                      Apply Now
                    </button>
                  )}
                  <p className="comments">
                    {job.commentCount} Comment
                    {job.commentCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
