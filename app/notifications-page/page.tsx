"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { useAuth } from "../../src/context/AuthContext";
import "../app.css";

Amplify.configure(outputs);
const client = generateClient<Schema>();

type YourApplication = {
  jobTitle: string;
  jobId: string;
  applytext?: string | null;
  status?: string;
};

type ApplicationToYourJob = {
  jobTitle: string;
  applicantUsername: string;
  applytext?: string | null;
};

type JobCommentNotification = {
  jobTitle: string;
  commenter: string;
  commentText: string;
};

type CommentReplyNotification = {
  jobTitle: string;
  replier: string;
  replyText: string;
};

export default function NotificationsPage() {
  const { userSub } = useAuth();

  const [yourApplications, setYourApplications] = useState<YourApplication[]>(
    []
  );
  const [applicationsToYourJobs, setApplicationsToYourJobs] = useState<
    ApplicationToYourJob[]
  >([]);
  const [jobCommentNotifs, setJobCommentNotifs] = useState<
    JobCommentNotification[]
  >([]);
  const [commentReplyNotifs, setCommentReplyNotifs] = useState<
    CommentReplyNotification[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      if (!userSub) return;

      try {
        const [jobsRes, acceptedRes, usersRes, commentsRes] = await Promise.all(
          [
            client.models.Job.list(),
            client.models.AcceptedJob.list(),
            client.models.User.list(),
            client.models.Comment.list(),
          ]
        );

        const allJobs = jobsRes.data?.filter(Boolean) ?? [];
        const allApplications = acceptedRes.data?.filter(Boolean) ?? [];
        const allUsers = usersRes.data?.filter(Boolean) ?? [];
        const allComments = commentsRes.data?.filter(Boolean) ?? [];

        const userMap = new Map<string, string>();
        allUsers.forEach((user) => {
          if (user.sub && user.username) {
            userMap.set(user.sub, user.username);
          }
        });

        const myJobs = allJobs.filter((job) => job.userid === userSub);
        const myJobIds = myJobs.map((job) => job.id);

        const appsToYourJobs: ApplicationToYourJob[] = allApplications
          .filter((app) => myJobIds.includes(app.jobid))
          .map((app) => {
            const job = myJobs.find((j) => j.id === app.jobid);
            const applicantUsername = userMap.get(app.userid) || "Unknown user";
            return {
              jobTitle: job?.title || "Unknown job",
              applicantUsername,
              applytext: app.applytext ?? null,
            };
          });

        setApplicationsToYourJobs(appsToYourJobs);

        const yourApps: YourApplication[] = allApplications
          .filter((app) => app.userid === userSub)
          .map((app) => {
            const job = allJobs.find((j) => j.id === app.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
              jobId: app.jobid,
              applytext: app.applytext ?? null,
              status: app.status ?? "pending",
            };
          });

        setYourApplications(yourApps);

        const jobComments: JobCommentNotification[] = allComments
          .filter(
            (comment) =>
              myJobIds.includes(comment.jobid) && comment.userid !== userSub
          )
          .map((comment) => {
            const job = allJobs.find((j) => j.id === comment.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
              commenter: userMap.get(comment.userid) || "Unknown user",
              commentText: comment.commenttext,
            };
          });

        setJobCommentNotifs(jobComments);

        const yourComments = allComments.filter((c) => c.userid === userSub);
        const yourCommentIds = yourComments.map((c) => c.id);

        const repliesToYou: CommentReplyNotification[] = allComments
          .filter(
            (comment) =>
              comment.parentid &&
              yourCommentIds.includes(comment.parentid) &&
              comment.userid !== userSub
          )
          .map((comment) => {
            const job = allJobs.find((j) => j.id === comment.jobid);
            return {
              jobTitle: job?.title || "Unknown job",
              replier: userMap.get(comment.userid) || "Unknown user",
              replyText: comment.commenttext,
            };
          });

        setCommentReplyNotifs(repliesToYou);
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    }

    fetchData();
  }, [userSub]);

  return (
    <main className="container">
      <section className="content">
        <h2>Notifications</h2>

        <div className="notif-section">
          <h3>Applications to Your Jobs</h3>
          {applicationsToYourJobs.length === 0 ? (
            <p>No one has applied to your jobs yet.</p>
          ) : (
            applicationsToYourJobs.map((notif, index) => (
              <div key={index} className="notif-card">
                <p>
                  <strong>{notif.applicantUsername}</strong> applied to your job{" "}
                  <em>{notif.jobTitle}</em>.
                </p>
                {notif.applytext && (
                  <p>
                    <strong>Application message:</strong> {notif.applytext}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="notif-section">
          <h3>Your Job Applications</h3>
          {yourApplications.length === 0 ? (
            <p>You haven't applied to any jobs yet.</p>
          ) : (
            yourApplications.map((app, index) => (
              <div key={index} className="notif-card">
                <p>
                  You applied to job <strong>{app.jobTitle}</strong>.
                </p>
                {app.applytext && (
                  <p>
                    <strong>Message:</strong> {app.applytext}
                  </p>
                )}
                <p>
                  <strong>Status:</strong>{" "}
                  {app.status === "accepted" ? (
                    <span className="accepted">Accepted</span>
                  ) : app.status === "rejected" ? (
                    <span className="rejected">Rejected</span>
                  ) : (
                    <span className="pending">Pending</span>
                  )}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="notif-section">
          <h3>Comments on Your Jobs</h3>
          {jobCommentNotifs.length === 0 ? (
            <p>No comments on your jobs yet.</p>
          ) : (
            jobCommentNotifs.map((notif, index) => (
              <div key={index} className="notif-card">
                <p>
                  <strong>{notif.commenter}</strong> commented on your job{" "}
                  <em>{notif.jobTitle}</em>:
                </p>
                <p>
                  <em>"{notif.commentText}"</em>
                </p>
              </div>
            ))
          )}
        </div>

        <div className="notif-section">
          <h3>Replies to Your Comments</h3>
          {commentReplyNotifs.length === 0 ? (
            <p>No replies to your comments yet.</p>
          ) : (
            commentReplyNotifs.map((notif, index) => (
              <div key={index} className="notif-card">
                <p>
                  <strong>{notif.replier}</strong> replied to your comment on{" "}
                  <em>{notif.jobTitle}</em>:
                </p>
                <p>
                  <em>"{notif.replyText}"</em>
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
