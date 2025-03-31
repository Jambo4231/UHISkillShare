"use client";

import "../amplify/configureAmplify";
import { Auth } from "@aws-amplify/auth";
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
  const [studentNumber, setStudentNumber] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // Step 1: Register user with Amplify Auth
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      });

      // Step 2: Save additional user data into the database
      await client.models.User.create({
        username: screenName,
        email: email,
        college: "UHI", // Adjust as needed
        areaofstudy: "", // Optional placeholder
      });

      alert("Registration successful! Please verify your email.");
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. See console for details.");
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
            Student Number <span className="required">*Required</span>
            <input
              type="text"
              value={studentNumber}
              required
              onChange={(e) => setStudentNumber(e.target.value)}
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
