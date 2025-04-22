"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmResetPassword } from "@aws-amplify/auth";
import "../app.css";

export default function ConfirmResetPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await confirmResetPassword({
        username: email.trim().toLowerCase(),
        confirmationCode: code,
        newPassword,
      });

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      console.error("❌ Reset confirm error:", err);
      setError(err.message || "Reset failed");
    }
  }

  return (
    <main className="container">
      <div className="form-container">
        <h2>Reset Your Password</h2>
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

          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <button type="submit">Confirm Reset</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>
            ✅ Password updated. Redirecting to login...
          </p>
        )}
      </div>
    </main>
  );
}
