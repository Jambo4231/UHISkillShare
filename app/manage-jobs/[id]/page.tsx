"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../src/context/AuthContext";
import { generateClient } from "aws-amplify/data";
import "../../app.css";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const subjectOptions = [
  "Advanced databases",
  "Designing web-based applications",
  "Cyber security",
  "Server technologies",
  "Network and information security",
  "Artificial intelligence",
  "Software construction",
  "Mobile applications development",
];

export default function ManageJobPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const { userSub } = useAuth();

  const [job, setJob] = useState<Schema["Job"]["type"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    subject: false,
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!userSub) return;

      try {
        const result = await client.models.Job.get({ id });
        if (result?.data && result.data.userid === userSub) {
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

    fetchJob();
  }, [id, userSub]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleUpdate = async () => {
    if (!userSub || !job) {
      alert("User ID or job data missing. Please refresh and try again.");
      return;
    }

    const newErrors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      subject: !formData.subject,
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.description || newErrors.subject) {
      return;
    }

    const updatePayload = {
      id,
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      deadline: formData.deadline || undefined,
      userid: userSub,
      status: job.status,
    };

    try {
      await client.models.Job.update(updatePayload);
      alert("Job has been updated successfully.");
      router.push("/my-jobs");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update job.");
    }
  };

  const handleComplete = async () => {
    if (!userSub) return;

    const confirm = window.confirm("Mark job as complete?");
    if (!confirm) return;

    try {
      await client.models.Job.update({
        id,
        status: 2,
        userid: userSub,
      });
      alert("Job marked as complete.");
      router.push("/my-jobs");
    } catch (err) {
      console.error("Error marking complete", err);
      alert("Failed to mark job as complete.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      await client.models.Job.delete({ id });
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
        className={errors.title ? "input-error" : ""}
      />
      {errors.title && <p className="error-text">Title is required.</p>}

      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Job Description"
        className={errors.description ? "input-error" : ""}
      />
      {errors.description && (
        <p className="error-text">Description is required.</p>
      )}

      <select
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        className={errors.subject ? "input-error" : ""}
      >
        <option value="">-- Select a Subject --</option>
        {subjectOptions.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      {errors.subject && <p className="error-text">Please select a subject.</p>}

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

      <style jsx>{`
        .input-error {
          border: 2px solid red;
        }

        .error-text {
          color: red;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        select.input-error {
          background-color: #2b2b2b;
          color: white;
        }
      `}</style>
    </div>
  );
}
