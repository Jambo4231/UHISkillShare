"use client";

import "./app.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="container">
      <nav className="navbar">
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <button onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/register")}>Register</button>
          <button onClick={() => router.push("/jobs-page")}>Jobs Page</button>
        </div>
      </nav>

      <div className="layout">
        <section className="content">
          <h2>Welcome to UHI Skill Share</h2>
          <p>
            Connect with fellow UHI students to share knowledge, get assistance on projects, and collaborate on short-term university-related tasks.
          </p>
        </section>
      </div>
    </main>
  );
}
