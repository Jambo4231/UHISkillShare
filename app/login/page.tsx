"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

import { signIn, getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";

const client = generateClient<Schema>();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn({ username: email, password });
      console.log("✅ Logged in");

      const { userId, signInDetails } = await getCurrentUser();
      const userAttributes = signInDetails?.loginId || email;

      const existing = await client.models.User.list({
        filter: {
          email: { eq: email }
        }
      });

      if (existing.data.length === 0) {
        console.log("🆕 Creating user record...");

        await client.models.User.create({
          username: userId,
          email,
          firstname: "", // Optional: fetch from custom attributes if stored
          surname: "",
          college: "",
          areaofstudy: "",
        });

        console.log("✅ User profile saved to DB");
      } else {
        console.log("👤 User already exists in DB");
      }

      router.push("/jobs-page");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed");
    }
  }

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="/register">Register</a>
        </div>
      </nav>

      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            UHI Email
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
}
