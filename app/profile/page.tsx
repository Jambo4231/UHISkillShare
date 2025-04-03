"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "../app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";


Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function CreateNewJob() {
	const router = useRouter();

  return (
    <main className="container">
        <nav className="navbar">
        <img
          src="/logo.png"
          alt="UHI Skill Share"
          className="logo"
          onClick={() => router.push("/jobs-page")}
          style={{ cursor: "pointer" }}
        />
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="/notifications-page">Notifications</a>
          <button onClick={() => router.push("/create-new-job")}>
            + New Job
          </button>
        </div>
      </nav>
      <div className="content">
        <div className="flex gap-6">
          {/* Profile Picture */}
			<div className="profile-header">
		{/* Profile Picture */}
			<div className="profile-picture">
			  Profile Picture
        </div>
          
          {/* User Info */}
          <div className="user-info">
          <p>Screen Name:</p>
          <div className="user-name">Pull User name from database</div>

            
            {/* User Ratings Create table for ratings of jobs done and comments. a rating should range from 1-5 and reference the id of the entry and the users. Calculate the mean of all ratings for user and display them here*/}
            <p>User Rating:</p>
          <div className="stars">⭐⭐⭐★★</div>

          <p>Average Comment Rating:</p>
          <div className="stars">⭐⭐⭐★★</div>
        </div>
          </div>
        </div>

        {/* Account Statistics - Update user table to include counts for each job post, job taken and comment. Display these counts here */}
        <div className="stats">
			<p>Jobs Posted: <span>0</span></p>
			<p>Jobs Undertaken: <span>0</span></p>
			<p>Comments: <span>0</span></p>
		</div>
      </div>
    </main>
  );
}
 
