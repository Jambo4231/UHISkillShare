"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

import {
  signIn,
  getCurrentUser,
  fetchAuthSession
} from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";

// ✅ Auth mode set globally for the client
const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      // 🔐 Step 1: Sign in
      await signIn({ username: email, password });
      console.log("✅ Logged in");

      // ✅ Step 2: Explicitly wait for auth tokens to be ready
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session.tokens?.accessToken) {
        throw new Error("Authentication failed: No access token found.");
      }
      console.log("🧠 Auth session ready");

      // 👤 Step 3: Get user ID
      const { userId } = await getCurrentUser();

      // 🔍 Step 4: Check for user in DB
      const result = await client.models.User.list({
        filter: { email: { eq: email } }
      });

      if (result.data.length === 0) {
        // 🆕 Step 5: Add user
        await client.models.User.create({
          username: userId,
          email,
          firstname: "",
          surname: "",
          college: "",
          areaofstudy: "",
        });

        console.log("✅ User created in DB");
      } else {
        console.log("👤 User already in DB");
      }

      // ✅ Go to jobs page
      router.push("/jobs-page");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
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
