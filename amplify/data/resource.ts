import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== Define Job, User, Skill, AcceptedJob, Notification, Rating, Comment, Rating, Course, Subject, UserSkill, JobSkill and SubjectJob Tables =====================================
This schema defines the Job, User, Skill, AcceptedJob, Notification, Rating, Comment, Rating, Course, Subject, UserSkill, JobSkill and SubjectJob tables for Amplify.
=============================================================================*/
const schema = a.schema({
  Job: a
    .model({
      userid: a.string(), // User ID
      title: a.string().required(), // Job title
      subject: a.string(), // Course or Subject
      description: a.string().required(), // Job description
      deadline: a.date(), // Deadline date
      status: a.integer().default(1), // Status (1 = open, 0 = closed)
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  User: a
    .model({
      username: a.string().required(), // Unique username
      usertype: a.integer().default(2), // User type (1 = admin, 2 = regular)
      firstname: a.string(), // First name
      surname: a.string(), // Surname
      college: a.string(), // College
      email: a.string().required(), // Email
      areaofstudy: a.string(), // Area of Study
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Skill: a
    .model({
      skill: a.string().required(), // Unique skill
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  AcceptedJob: a
    .model({
      jobid: a.string().required(), // Job ID
      userid: a.string().required(), // User ID
      applytext: a.string(), // Application Text
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Notification: a
    .model({
      userid: a.string().required(), // User ID
      notiftitle: a.string(), // Notification Title
      notifdescription: a.string(), // Notification Description
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Rating: a
    .model({
      jobid: a.string().required(), // Job ID
      rateduserid: a.string().required(), // Rated User ID
      ratinguserid: a.string().required(), // Rating User ID
      rating: a.integer().required(), // Rating (1 - 5)
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Comment: a
    .model({
      jobid: a.string().required(), // Job ID
      userid: a.string().required(), // User ID
      commenttext: a.string().required(), // Comment text
      commenttime: a.timestamp().required(), // Ensure this is provided manually
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Mention: a
    .model({
      commentid: a.string().required(), // Comment ID
      userid: a.string().required(), // User ID
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Course: a
    .model({
      coursename: a.string(), // Course Name
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  Subject: a
    .model({
      courseid: a.string().required(), // Course ID
      subjectname: a.string().required(), // Subject Name
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  UserSkill: a
    .model({
      skillid: a.string().required(), // Skill ID
      userid: a.string().required(), // User ID
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  JobSkill: a
    .model({
      skillid: a.string().required(), // Skill ID
      jobid: a.string().required(), // Job ID
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed

  SubjectJob: a
    .model({
      subjectid: a.string().required(), // Subject ID
      jobid: a.string().required(), // Job ID
    })
    .authorization((allow) => [allow.publicApiKey()]), // Adjust as needed
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});




/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
