/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateJob = /* GraphQL */ `subscription OnCreateJob($filter: ModelSubscriptionJobFilterInput) {
  onCreateJob(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateJobSubscriptionVariables,
  APITypes.OnCreateJobSubscription
>;
export const onUpdateJob = /* GraphQL */ `subscription OnUpdateJob($filter: ModelSubscriptionJobFilterInput) {
  onUpdateJob(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateJobSubscriptionVariables,
  APITypes.OnUpdateJobSubscription
>;
export const onDeleteJob = /* GraphQL */ `subscription OnDeleteJob($filter: ModelSubscriptionJobFilterInput) {
  onDeleteJob(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteJobSubscriptionVariables,
  APITypes.OnDeleteJobSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateSkill = /* GraphQL */ `subscription OnCreateSkill($filter: ModelSubscriptionSkillFilterInput) {
  onCreateSkill(filter: $filter) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSkillSubscriptionVariables,
  APITypes.OnCreateSkillSubscription
>;
export const onUpdateSkill = /* GraphQL */ `subscription OnUpdateSkill($filter: ModelSubscriptionSkillFilterInput) {
  onUpdateSkill(filter: $filter) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSkillSubscriptionVariables,
  APITypes.OnUpdateSkillSubscription
>;
export const onDeleteSkill = /* GraphQL */ `subscription OnDeleteSkill($filter: ModelSubscriptionSkillFilterInput) {
  onDeleteSkill(filter: $filter) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSkillSubscriptionVariables,
  APITypes.OnDeleteSkillSubscription
>;
export const onCreateAcceptedJob = /* GraphQL */ `subscription OnCreateAcceptedJob(
  $filter: ModelSubscriptionAcceptedJobFilterInput
) {
  onCreateAcceptedJob(filter: $filter) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAcceptedJobSubscriptionVariables,
  APITypes.OnCreateAcceptedJobSubscription
>;
export const onUpdateAcceptedJob = /* GraphQL */ `subscription OnUpdateAcceptedJob(
  $filter: ModelSubscriptionAcceptedJobFilterInput
) {
  onUpdateAcceptedJob(filter: $filter) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAcceptedJobSubscriptionVariables,
  APITypes.OnUpdateAcceptedJobSubscription
>;
export const onDeleteAcceptedJob = /* GraphQL */ `subscription OnDeleteAcceptedJob(
  $filter: ModelSubscriptionAcceptedJobFilterInput
) {
  onDeleteAcceptedJob(filter: $filter) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAcceptedJobSubscriptionVariables,
  APITypes.OnDeleteAcceptedJobSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onCreateNotification(filter: $filter) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onUpdateNotification(filter: $filter) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onDeleteNotification(filter: $filter) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onCreateRating = /* GraphQL */ `subscription OnCreateRating($filter: ModelSubscriptionRatingFilterInput) {
  onCreateRating(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRatingSubscriptionVariables,
  APITypes.OnCreateRatingSubscription
>;
export const onUpdateRating = /* GraphQL */ `subscription OnUpdateRating($filter: ModelSubscriptionRatingFilterInput) {
  onUpdateRating(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRatingSubscriptionVariables,
  APITypes.OnUpdateRatingSubscription
>;
export const onDeleteRating = /* GraphQL */ `subscription OnDeleteRating($filter: ModelSubscriptionRatingFilterInput) {
  onDeleteRating(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRatingSubscriptionVariables,
  APITypes.OnDeleteRatingSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
  onCreateComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
  onUpdateComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
  onDeleteComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreateMention = /* GraphQL */ `subscription OnCreateMention($filter: ModelSubscriptionMentionFilterInput) {
  onCreateMention(filter: $filter) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMentionSubscriptionVariables,
  APITypes.OnCreateMentionSubscription
>;
export const onUpdateMention = /* GraphQL */ `subscription OnUpdateMention($filter: ModelSubscriptionMentionFilterInput) {
  onUpdateMention(filter: $filter) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMentionSubscriptionVariables,
  APITypes.OnUpdateMentionSubscription
>;
export const onDeleteMention = /* GraphQL */ `subscription OnDeleteMention($filter: ModelSubscriptionMentionFilterInput) {
  onDeleteMention(filter: $filter) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMentionSubscriptionVariables,
  APITypes.OnDeleteMentionSubscription
>;
export const onCreateCourse = /* GraphQL */ `subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
  onCreateCourse(filter: $filter) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCourseSubscriptionVariables,
  APITypes.OnCreateCourseSubscription
>;
export const onUpdateCourse = /* GraphQL */ `subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
  onUpdateCourse(filter: $filter) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCourseSubscriptionVariables,
  APITypes.OnUpdateCourseSubscription
>;
export const onDeleteCourse = /* GraphQL */ `subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
  onDeleteCourse(filter: $filter) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCourseSubscriptionVariables,
  APITypes.OnDeleteCourseSubscription
>;
export const onCreateSubject = /* GraphQL */ `subscription OnCreateSubject($filter: ModelSubscriptionSubjectFilterInput) {
  onCreateSubject(filter: $filter) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSubjectSubscriptionVariables,
  APITypes.OnCreateSubjectSubscription
>;
export const onUpdateSubject = /* GraphQL */ `subscription OnUpdateSubject($filter: ModelSubscriptionSubjectFilterInput) {
  onUpdateSubject(filter: $filter) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSubjectSubscriptionVariables,
  APITypes.OnUpdateSubjectSubscription
>;
export const onDeleteSubject = /* GraphQL */ `subscription OnDeleteSubject($filter: ModelSubscriptionSubjectFilterInput) {
  onDeleteSubject(filter: $filter) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSubjectSubscriptionVariables,
  APITypes.OnDeleteSubjectSubscription
>;
export const onCreateUserSkill = /* GraphQL */ `subscription OnCreateUserSkill($filter: ModelSubscriptionUserSkillFilterInput) {
  onCreateUserSkill(filter: $filter) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSkillSubscriptionVariables,
  APITypes.OnCreateUserSkillSubscription
>;
export const onUpdateUserSkill = /* GraphQL */ `subscription OnUpdateUserSkill($filter: ModelSubscriptionUserSkillFilterInput) {
  onUpdateUserSkill(filter: $filter) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSkillSubscriptionVariables,
  APITypes.OnUpdateUserSkillSubscription
>;
export const onDeleteUserSkill = /* GraphQL */ `subscription OnDeleteUserSkill($filter: ModelSubscriptionUserSkillFilterInput) {
  onDeleteUserSkill(filter: $filter) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSkillSubscriptionVariables,
  APITypes.OnDeleteUserSkillSubscription
>;
export const onCreateJobSkill = /* GraphQL */ `subscription OnCreateJobSkill($filter: ModelSubscriptionJobSkillFilterInput) {
  onCreateJobSkill(filter: $filter) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJobSkillSubscriptionVariables,
  APITypes.OnCreateJobSkillSubscription
>;
export const onUpdateJobSkill = /* GraphQL */ `subscription OnUpdateJobSkill($filter: ModelSubscriptionJobSkillFilterInput) {
  onUpdateJobSkill(filter: $filter) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJobSkillSubscriptionVariables,
  APITypes.OnUpdateJobSkillSubscription
>;
export const onDeleteJobSkill = /* GraphQL */ `subscription OnDeleteJobSkill($filter: ModelSubscriptionJobSkillFilterInput) {
  onDeleteJobSkill(filter: $filter) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJobSkillSubscriptionVariables,
  APITypes.OnDeleteJobSkillSubscription
>;
export const onCreateSubjectJob = /* GraphQL */ `subscription OnCreateSubjectJob(
  $filter: ModelSubscriptionSubjectJobFilterInput
) {
  onCreateSubjectJob(filter: $filter) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSubjectJobSubscriptionVariables,
  APITypes.OnCreateSubjectJobSubscription
>;
export const onUpdateSubjectJob = /* GraphQL */ `subscription OnUpdateSubjectJob(
  $filter: ModelSubscriptionSubjectJobFilterInput
) {
  onUpdateSubjectJob(filter: $filter) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSubjectJobSubscriptionVariables,
  APITypes.OnUpdateSubjectJobSubscription
>;
export const onDeleteSubjectJob = /* GraphQL */ `subscription OnDeleteSubjectJob(
  $filter: ModelSubscriptionSubjectJobFilterInput
) {
  onDeleteSubjectJob(filter: $filter) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSubjectJobSubscriptionVariables,
  APITypes.OnDeleteSubjectJobSubscription
>;
