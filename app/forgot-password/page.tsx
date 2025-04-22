"use client";

import { Amplify } from "aws-amplify";
import { resetPassword } from "@aws-amplify/auth";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import "../app.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialise useRouter

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword({ username: email });
      setMessage("Password reset email sent. Redirecting...");
      router.push(`/confirm-reset?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <main className="container">
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <label>Enter your UHI email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Code</button>
        </form>

        {message && (
          <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>
        )}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </main>
  );
}
