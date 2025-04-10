"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import "../app.css";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function ManageJobPage({ params }: { params: { id: string } }) {
        const id = params.id;
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
     title: "",
        description: "",
     subject: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchUserAndJob = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user.userId);

        const result = await client.models.Job.get({ id: id as string });
        if (result?.data) {
          setJob(result.data);
          setFormData({
              title: result.data.title,
            description: result.data.description,
            subject: result.data.subject ?? "",
            deadline: result.data.deadline ?? "",
          });
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
              setLoading(false);
      }
    };

    fetchUserAndJob();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await client.models.Job.update({
        id: id as string,
        ...formData,
      });
      alert("Job has Been Updated successfully.");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to Update Job.");
    }
  };

  const handleComplete = async () => {
    const confirm = window.confirm("Mark Job as Complete?");
    if (!confirm) return;

    try {
      await client.models.Job.update({
        id: id as string,
        status: 2, // Assuming 2 = complete???
      });
      alert("Job Marked as Complete.");
      router.push("/my-jobs");
    } catch (err) {
      console.error("Error Marking Complete", err);
      alert("Failed to Mark Job as Complete.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      await client.models.Job.delete({ id: id as string });
      alert("Job deleted.");
      router.push("/my-jobs");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete job.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!job) return <p>Job not found or you don’t have permission.</p>;

  return (
    <div className="container">
      <h2>Edit Job</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Job Title"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Job Description"
      />
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        placeholder="Subject"
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleInputChange}
      />
      <div className="actions">
        <button onClick={handleUpdate}>Save Changes</button>
        <button onClick={handleComplete}>Mark as Complete</button>
        <button onClick={handleDelete} className="danger">
          Delete Job
        </button>
      </div>
    </div>
  );
}