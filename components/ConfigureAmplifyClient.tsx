"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth"; // Import methods
import outputs from "../amplify_outputs.json"; // Your generated amplify outputs

export default function ConfigureAmplifyClient() {
  useEffect(() => {
    // Configure Amplify with the outputs object directly
    Amplify.configure(outputs);

    // Check session manually (to handle offline)
    const checkAuth = async () => {
      try {
        // Retrieve the current authenticated user
        const currentUser = await getCurrentUser();
        console.log("User is still authenticated:", currentUser);

        // Optionally, fetch session data (tokens) if needed
        const session = await fetchAuthSession();
        console.log("Session details:", session);
      } catch (error) {
        console.log("User not authenticated or session expired:", error);
      }
    };

    checkAuth(); // Run the authentication check
  }, []); // Empty dependency array ensures this runs only once on mount

  return null;
}
