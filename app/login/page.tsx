"use client";

import "../../amplify/configureAmplify";
import { signIn } from 'aws-amplify/auth';
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn({ username: email, password });
      router.push("/jobs-page"); // Redirect user if successful
    } catch (err: any) {
      console.error("Login error:", err);
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