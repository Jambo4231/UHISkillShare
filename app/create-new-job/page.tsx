"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from "aws-amplify/auth"; 
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const client = generateClient<Schema>();

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

export default function CreateNewJob() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(subjectOptions[0]);
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const { userId: sub } = await getCurrentUser();

      console.log("🔍 Looking up user with sub:", sub);

      const userResult = await client.models.User.list({
        filter: { sub: { eq: sub } },
      });

      const user = userResult.data?.[0];

      if (!user) {
        console.error("❌ User not found in database for sub:", sub);
        alert("Your user profile could not be found. Please log out and try again.");
        return;
      }

      console.log("✅ Matched user:", user);

      await client.models.Job.create({
        title,
        subject,
        description,
        status: 1,
        userid: user.id, // internal User model ID
      });

      console.log("📬 Job created successfully");
      router.push("/jobs-page");
    } catch (error) {
      console.error("❌ Error creating job:", error);
      alert("Something went wrong while creating the job.");
    }
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
          <a href="/notifications-page">Notifications</a>
          <button onClick={() => router.push("/create-new-job")}>
            + New Job
          </button>
        </div>
      </nav>

      <div className="form-container">
        <h2>Submit a new job or ask a question of other students</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Job Title/Question <span className="required">*Required</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Course or Subject <span className="required">*Required</span>
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label>
            Further Explanation and Description <span className="required">*Required</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
