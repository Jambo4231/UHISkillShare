import { redirect } from "next/navigation";

export default function Home() {
  redirect("/jobs-page"); // Automatically sends users to jobs-page
  return null; // Prevents rendering anything
}
