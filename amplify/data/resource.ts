import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Job: a
    .model({
      userid: a.string(),
      title: a.string().required(),
      subject: a.string(),
      description: a.string().required(),
      deadline: a.date(),
      status: a.integer().default(1),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  User: a
    .model({
      sub: a.string().required(), // Added for linking to Cognito user
      username: a.string().required(),
      usertype: a.integer().default(2),
      firstname: a.string(),
      surname: a.string(),
      college: a.string(),
      email: a.string().required(),
      areaofstudy: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated(), // Full access for signed-in users
      allow.publicApiKey().to(["read"]), // Read-only for API key users
    ]),

  Skill: a
    .model({
      skill: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  AcceptedJob: a
    .model({
      jobid: a.string().required(),
      userid: a.string().required(),
      applytext: a.string(),
      status: a.string().default("pending"),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  Notification: a
    .model({
      userid: a.string().required(),
      notiftitle: a.string(),
      notifdescription: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  Rating: a
    .model({
      jobid: a.string().required(),
      rateduserid: a.string().required(),
      ratinguserid: a.string().required(),
      rating: a.integer().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  Comment: a
    .model({
      jobid: a.string().required(),
      userid: a.string().required(),
      commenttext: a.string().required(),
      commenttime: a.timestamp().required(),
      parentid: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  CommentRating: a
    .model({
      commentid: a.string().required(),
      ratinguserid: a.string().required(),
      rating: a.integer().required(), // 1 to 5
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  Mention: a
    .model({
      commentid: a.string().required(),
      userid: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  Course: a
    .model({
      coursename: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  Subject: a
    .model({
      courseid: a.string().required(),
      subjectname: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  UserSkill: a
    .model({
      skillid: a.string().required(),
      userid: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  JobSkill: a
    .model({
      skillid: a.string().required(),
      jobid: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),

  SubjectJob: a
    .model({
      subjectid: a.string().required(),
      jobid: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.publicApiKey().to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
