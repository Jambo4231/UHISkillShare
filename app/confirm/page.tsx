"use client";

import {
  confirmSignUp,
  signIn,
  getCurrentUser,
  resendSignUpCode,
} from "aws-amplify/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";

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
      // Step 1: Confirm user
      await confirmSignUp({ username: email, confirmationCode: code });

      // Step 2: Get pending user info from localStorage
      const stored = localStorage.getItem("pendingUser");
      if (!stored) throw new Error("User registration details missing");

      const parsed = JSON.parse(stored);
      const {
        username,
        firstname,
        surname,
        college,
        areaofstudy,
        password,
        email: storedEmail,
      } = parsed;

      if (
        !username ||
        !firstname ||
        !surname ||
        !college ||
        !storedEmail ||
        !areaofstudy ||
        !password
      ) {
        console.warn("Incomplete user data:", parsed);
        throw new Error("Some registration fields are missing");
      }

      // Step 3: Sign in to get session (required before getCurrentUser)
      await signIn({ username: email, password });

      // Step 4: Get Cognito sub and cache it
      const { userId: sub } = await getCurrentUser();
      console.log("Creating user with sub:", sub);
      localStorage.setItem("cachedSub", sub); // ✅ store for offline support

      // Step 5: Create user in database
      await client.models.User.create({
        sub,
        username,
        firstname,
        surname,
        college,
        email: storedEmail,
        areaofstudy,
      });

      // Step 6: Clean up and redirect
      localStorage.removeItem("pendingUser");
      setSuccess(true);

      setTimeout(async () => {
        const { signOut } = await import("aws-amplify/auth");
        await signOut();
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      console.error("❌ Confirmation error:", err);
      setError(err.message || "Confirmation failed");
    }
  }

  return (
    <main className="container">
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
