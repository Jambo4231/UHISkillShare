"use client";

import { confirmSignUp } from "aws-amplify/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";

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
      await confirmSignUp({ username: email, confirmationCode: code });
      setSuccess(true);
      router.push("/login");
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

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>✅ Email confirmed! Redirecting to login...</p>}
      </div>
    </main>
  );
}
