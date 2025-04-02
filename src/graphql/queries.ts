/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getJob = /* GraphQL */ `query GetJob($id: ID!) {
  getJob(id: $id) {
    id
    userid
    title
    subject
    description
    deadline
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetJobQueryVariables, APITypes.GetJobQuery>;
export const listJobs = /* GraphQL */ `query ListJobs($filter: ModelJobFilterInput, $limit: Int, $nextToken: String) {
  listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userid
      title
      subject
      description
      deadline
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListJobsQueryVariables, APITypes.ListJobsQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    usertype
    firstname
    surname
    college
    email
    areaofstudy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      usertype
      firstname
      surname
      college
      email
      areaofstudy
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getSkill = /* GraphQL */ `query GetSkill($id: ID!) {
  getSkill(id: $id) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSkillQueryVariables, APITypes.GetSkillQuery>;
export const listSkills = /* GraphQL */ `query ListSkills(
  $filter: ModelSkillFilterInput
  $limit: Int
  $nextToken: String
) {
  listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      skill
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSkillsQueryVariables,
  APITypes.ListSkillsQuery
>;
export const getAcceptedJob = /* GraphQL */ `query GetAcceptedJob($id: ID!) {
  getAcceptedJob(id: $id) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAcceptedJobQueryVariables,
  APITypes.GetAcceptedJobQuery
>;
export const listAcceptedJobs = /* GraphQL */ `query ListAcceptedJobs(
  $filter: ModelAcceptedJobFilterInput
  $limit: Int
  $nextToken: String
) {
  listAcceptedJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      jobid
      userid
      applytext
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAcceptedJobsQueryVariables,
  APITypes.ListAcceptedJobsQuery
>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userid
      notiftitle
      notifdescription
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const getRating = /* GraphQL */ `query GetRating($id: ID!) {
  getRating(id: $id) {
    id
    jobid
    rateduserid
    ratinguserid
    rating
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRatingQueryVariables, APITypes.GetRatingQuery>;
export const listRatings = /* GraphQL */ `query ListRatings(
  $filter: ModelRatingFilterInput
  $limit: Int
  $nextToken: String
) {
  listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      jobid
      rateduserid
      ratinguserid
      rating
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRatingsQueryVariables,
  APITypes.ListRatingsQuery
>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    jobid
    userid
    commenttext
    commenttime
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      jobid
      userid
      commenttext
      commenttime
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const getMention = /* GraphQL */ `query GetMention($id: ID!) {
  getMention(id: $id) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMentionQueryVariables,
  APITypes.GetMentionQuery
>;
export const listMentions = /* GraphQL */ `query ListMentions(
  $filter: ModelMentionFilterInput
  $limit: Int
  $nextToken: String
) {
  listMentions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      commentid
      userid
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMentionsQueryVariables,
  APITypes.ListMentionsQuery
>;
export const getCourse = /* GraphQL */ `query GetCourse($id: ID!) {
  getCourse(id: $id) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCourseQueryVariables, APITypes.GetCourseQuery>;
export const listCourses = /* GraphQL */ `query ListCourses(
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      coursename
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoursesQueryVariables,
  APITypes.ListCoursesQuery
>;
export const getSubject = /* GraphQL */ `query GetSubject($id: ID!) {
  getSubject(id: $id) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSubjectQueryVariables,
  APITypes.GetSubjectQuery
>;
export const listSubjects = /* GraphQL */ `query ListSubjects(
  $filter: ModelSubjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      courseid
      subjectname
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSubjectsQueryVariables,
  APITypes.ListSubjectsQuery
>;
export const getUserSkill = /* GraphQL */ `query GetUserSkill($id: ID!) {
  getUserSkill(id: $id) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserSkillQueryVariables,
  APITypes.GetUserSkillQuery
>;
export const listUserSkills = /* GraphQL */ `query ListUserSkills(
  $filter: ModelUserSkillFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      skillid
      userid
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserSkillsQueryVariables,
  APITypes.ListUserSkillsQuery
>;
export const getJobSkill = /* GraphQL */ `query GetJobSkill($id: ID!) {
  getJobSkill(id: $id) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetJobSkillQueryVariables,
  APITypes.GetJobSkillQuery
>;
export const listJobSkills = /* GraphQL */ `query ListJobSkills(
  $filter: ModelJobSkillFilterInput
  $limit: Int
  $nextToken: String
) {
  listJobSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      skillid
      jobid
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJobSkillsQueryVariables,
  APITypes.ListJobSkillsQuery
>;
export const getSubjectJob = /* GraphQL */ `query GetSubjectJob($id: ID!) {
  getSubjectJob(id: $id) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSubjectJobQueryVariables,
  APITypes.GetSubjectJobQuery
>;
export const listSubjectJobs = /* GraphQL */ `query ListSubjectJobs(
  $filter: ModelSubjectJobFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubjectJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      subjectid
      jobid
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSubjectJobsQueryVariables,
  APITypes.ListSubjectJobsQuery
>;
