"use client";

import { confirmSignUp, signIn, getCurrentUser } from "aws-amplify/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import { resendSignUpCode } from "aws-amplify/auth";

const client = generateClient<Schema>();

export default function ConfirmPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Step 1: Confirm user with the code
      await confirmSignUp({ username: email, confirmationCode: code });

      // Step 2: Sign the user in
      await signIn({ username: email, password: "" });

      // Step 3: Get Cognito user ID (sub)
      const { userId: sub } = await getCurrentUser();

      // Step 4: Retrieve stored user info from localStorage
      const stored = localStorage.getItem("pendingUser");
      if (!stored) {
        throw new Error("User registration details missing");
      }

      const { username, firstname, surname, college, areaofstudy } =
        JSON.parse(stored);

      // Step 5: Create User model entry
      await client.models.User.create({
        sub,
        username,
        firstname,
        surname,
        college,
        email,
        areaofstudy,
      });

      // Step 6: Clean up and redirect
      localStorage.removeItem("pendingUser");
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      console.error("❌ Confirmation error:", err);
      setError(err.message || "Confirmation failed");
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
        <h2>Confirm Your Email</h2>
        <form onSubmit={handleSubmit}>
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
            Confirmation Code
            <input
              type="text"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <button type="submit">Confirm</button>
        </form>

        <button
          type="button"
          onClick={async () => {
            try {
              await resendSignUpCode({ username: email });
              alert("Confirmation code re-sent!");
            } catch (err) {
              console.error("Error resending code:", err);
              alert("Failed to resend confirmation code");
            }
          }}
        >
          Resend Code
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>
            ✅ Email confirmed! Redirecting to login...
          </p>
        )}
      </div>
    </main>
  );
}
