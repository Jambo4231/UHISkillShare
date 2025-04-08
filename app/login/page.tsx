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
import Link from "next/link";
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

      // ✅ Step 2: Wait for tokens to be available
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session.tokens?.accessToken) {
        throw new Error("Authentication failed: No access token found.");
      }
      console.log("🧠 Auth session ready");

      // 👤 Step 3: Get Cognito sub
      const { userId: sub } = await getCurrentUser();

      // 🔍 Step 4: Check for existing user in DB
      const result = await client.models.User.list({
        filter: { sub: { eq: sub } },
      });

      if (result.data.length === 0) {
        // 🆕 Step 5: Add user with sub
        await client.models.User.create({
          sub,              // ✅ Required by schema
          username: sub,    // Use sub as a default username
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

      // ✅ Step 6: Redirect
      router.push("/jobs-page");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      setError(err.message || "Login failed");
    }
  }

  return (
    <main className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>UHI Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 👇 Register Link Below Login Button */}
        <p style={{ marginTop: "1rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#ffc107", textDecoration: "underline" }}>
            Register here.
          </Link>
        </p>
      </div>
    </main>
  );
}
