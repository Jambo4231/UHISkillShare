import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== Define Job Table Instead of Todo =======================================
This schema defines the Job database table with fields matching your MySQL 
schema. The authorization rule allows public API key access (for testing).
=========================================================================*/
const schema = a.schema({
  Job: a
    .model({
      userid: a.string(), // User ID (Foreign Key equivalent)
      title: a.string().required(), // Job title (VARCHAR 30)
      description: a.string().required(), // Job description (VARCHAR 60)
      deadline: a.date(), // Deadline date (AWSDate)
      status: a.integer().default(1), // Status (1 = open, 0 = closed)
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
