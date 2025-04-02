"use client";

import "../../amplify/configureAmplify";
import { signUp } from "aws-amplify/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [screenName, setScreenName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("📤 Attempting to register:", { email, screenName });

    try {
      // Step 1: Register user with Amplify Auth
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
            preferred_username: screenName,
          },
        },
      });

      console.log("✅ signUp success:", result);
    } catch (error) {
      console.error("❌ signUp failed:", error);
      alert("Sign up failed: " + (error as Error).message);
      return;
    }

    try {
      // Step 2: Save additional user data into the database
      const newUser = await client.models.User.create({
        username: screenName,
        email: email,
        college: "UHI",
        areaofstudy: "",
      });

      console.log("✅ User saved to DB:", newUser);
      alert("Registration successful! Please verify your email.");
      router.push("/login");
    } catch (error) {
      console.error("❌ Saving user to DB failed:", error);
      alert("Saving user data failed: " + (error as Error).message);
    }
  }

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="/login">Login</a>
        </div>
      </nav>

      <div className="form-container">
        <h2>Create a New Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            UHI Email <span className="required">*Required</span>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Screen Name <span className="required">*Required</span>
            <input
              type="text"
              value={screenName}
              required
              onChange={(e) => setScreenName(e.target.value)}
            />
          </label>

          <label>
            Password <span className="required">*Required</span>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}