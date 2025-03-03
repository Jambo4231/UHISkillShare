"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../pages/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function CreateNewJob() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await client.models.Job.create({
      title,
      subject,
      description,
      status: 1, // Default to 'unresolved'
      userid: "test-user", // Replace with actual user ID
    });
    router.push("/pages/jobs-page"); // Redirect back to jobs page
  }

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="#">Notifications</a>
          <button onClick={() => router.push("/pages/jobs-page")}>Back</button>
        </div>
      </nav>
      <div className="form-container">
        <h2>Submit a new job or ask a question of other students</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Job Title/Question <span className="required">*Required</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Course or Subject <span className="required">*Required</span>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </label>
          <label>
            Further Explanation and Description <span className="required">*Required</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}