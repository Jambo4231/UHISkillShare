"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

import { signUp } from "aws-amplify/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [college, setCollege] = useState("");
  const [areaofstudy, setAreaOfStudy] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("📤 Attempting to register:", { email, username });

    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email: email,
            preferred_username: username,
            given_name: firstname,
            family_name: surname,
          },
        },
      });

      console.log("signUp success:", result);

      // Store extra details locally so they can be saved in User table after confirmation
      localStorage.setItem(
        "pendingUser",
        JSON.stringify({
          username,
          firstname,
          surname,
          college,
          email,
          areaofstudy,
          password,
        })
      );

      alert(
        "Registration successful! Please verify your email before logging in."
      );
      router.push("/confirm");
    } catch (error) {
      console.error("signUp failed:", error);
      alert("Sign up failed: " + (error as Error).message);
    }
  }

  return (
    <main className="container">
      <div className="form-container">
        <h2>Create a New Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email <span className="required">*Required</span>
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            Username <span className="required">*Required</span>
          </label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>
            First Name <span className="required">*Required</span>
          </label>
          <input
            type="text"
            value={firstname}
            required
            onChange={(e) => setFirstname(e.target.value)}
          />

          <label>
            Surname <span className="required">*Required</span>
          </label>
          <input
            type="text"
            value={surname}
            required
            onChange={(e) => setSurname(e.target.value)}
          />

          <label>
            College <span className="required">*Required</span>
          </label>
          <input
            type="text"
            value={college}
            required
            onChange={(e) => setCollege(e.target.value)}
          />

          <label>
            Area of Study <span className="required">*Required</span>
          </label>
          <input
            type="text"
            value={areaofstudy}
            required
            onChange={(e) => setAreaOfStudy(e.target.value)}
          />

          <label>
            Password <span className="required">*Required</span>
          </label>
          <small className="password-policy">
            Must be at least 8 characters, including upper and lower case
            letters, numbers, and a special character.
          </small>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}
