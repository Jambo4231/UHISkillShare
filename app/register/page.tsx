"use client";

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
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [college, setCollege] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("📤 Attempting to register:", { email, username });

    try {
      // Step 1: Register user with Amplify Auth
      const result = await signUp({
        username: email, 
        password,
        options: {
          userAttributes: {
            email: email,
            preferred_username: username, 
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
      // Step 2: Save user data into the database
      const newUser = await client.models.User.create({
        username: username,  
        email: email,
        firstname: firstName,
        surname: surname,
        college: college || "UHI", // Default to "UHI" if college is not provided
        areaofstudy: areaOfStudy,
        usertype: 2, // Default to regular user type
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
            Username <span className="required">*Required</span>
            <input
              type="text"
              value={username}  
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label>
            Surname
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>

          <label>
            College
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </label>

          <label>
            Area of Study
            <input
              type="text"
              value={areaOfStudy}
              onChange={(e) => setAreaOfStudy(e.target.value)}
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
