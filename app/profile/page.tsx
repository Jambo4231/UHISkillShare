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
        <h1>UHI Skill Share</h1>
        <div className="nav-links">
          <a href="#">My Jobs</a>
          <a href="#">Notifications</a>
          <button onClick={() => router.push("/jobs-page")}>Back</button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 mt-6 rounded-lg">
        <div className="flex gap-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm">
            Profile Picture
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <p className="text-gray-700 font-semibold">Screen Name:</p>
            <div className="bg-gray-300 text-gray-700 p-2 rounded">Pull User name from database</div>
            
            {/* User Ratings Create table for ratings of jobs done and comments. a rating should range from 1-5 and reference the id of the entry and the users. Calculate the mean of all ratings for user and display them here*/}
            <p className="text-gray-700 mt-2">User Rating:</p>
            <div className="text-lg">⭐⭐⭐★★</div>

            <p className="text-gray-700 mt-2">Average Comment Rating:</p>
            <div className="text-lg">⭐⭐⭐★★</div>
          </div>
        </div>

        {/* Account Statistics - Update user table to include counts for each job post, job taken and comment. Display these counts here */}
        <div className="bg-gray-300 p-4 mt-6 rounded">
          <p className="text-gray-700">Jobs Posted: <span className="float-right">0</span></p>
          <p className="text-gray-700">Jobs Undertaken: <span className="float-right">0</span></p>
          <p className="text-gray-700">Comments: <span className="float-right">0</span></p>
        </div>
      </div>
    </main>
  );
}

