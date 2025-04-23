"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/context/AuthContext";

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
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userSub, loading: authLoading } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (loading || authLoading) return;
    setLoading(true);

    try {
      if (!userSub) {
        alert("You're not logged in. Please log in and try again.");
        setLoading(false);
        return;
      }

      console.log("Looking up user with sub:", userSub);

      const userResult = await client.models.User.list({
        filter: { sub: { eq: userSub } },
      });

      const user = userResult.data?.[0];

      if (!user) {
        console.error("User not found in database for sub:", userSub);
        alert(
          "Your user profile could not be found. Please log out and try again."
        );
        setLoading(false);
        return;
      }

      console.log("Matched user:", user);

      await client.models.Job.create({
        title,
        subject,
        description,
        deadline: deadline || undefined,
        status: 1,
        userid: user.sub,
      });

      console.log("Job created successfully");
      router.push("/jobs-page");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Something went wrong while creating the job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="form-container">
        <h2>Submit a new job or ask a question of other students</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Job Title/Question <span className="required">*Required</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

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
            Further Explanation and Description{" "}
            <span className="required">*Required</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Completion Date (optional)</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button type="submit" disabled={loading || authLoading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
