"use client";

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../app.css";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function UpdateProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [college, setCollege] = useState("");
  const [areaofstudy, setAreaOfStudy] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const session = await fetchAuthSession();
        const userEmail = String(session.tokens?.idToken?.payload.email);


        if (!userEmail) throw new Error("No email found in session");

        const result = await client.models.User.list({
          filter: { email: { eq: userEmail } },
        });

        const user = result.data?.[0];
        if (!user) throw new Error("User not found");

        setUserId(user.id);
        setEmail(user.email);
        setUsername(user.username);
        setFirstname(user.firstname || "");
        setSurname(user.surname || "");
        setCollege(user.college || "");
        setAreaOfStudy(user.areaofstudy || "");
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    loadUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updated = await client.models.User.update({
        id: userId,
        email,
        username,
        firstname,
        surname,
        college,
        areaofstudy,
      });

      console.log("User updated:", updated);
      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Update failed: " + (err as Error).message);
    }
  };

  return (
    <main className="container">

      <div className="form-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>First Name</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />

          <label>Surname</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />

          <label>College</label>
          <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} />

          <label>Area of Study</label>
          <input type="text" value={areaofstudy} onChange={(e) => setAreaOfStudy(e.target.value)} />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </main>
  );
}
