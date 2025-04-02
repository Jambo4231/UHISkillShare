/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createJob = /* GraphQL */ `mutation CreateJob(
  $input: CreateJobInput!
  $condition: ModelJobConditionInput
) {
  createJob(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateJobMutationVariables,
  APITypes.CreateJobMutation
>;
export const updateJob = /* GraphQL */ `mutation UpdateJob(
  $input: UpdateJobInput!
  $condition: ModelJobConditionInput
) {
  updateJob(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateJobMutationVariables,
  APITypes.UpdateJobMutation
>;
export const deleteJob = /* GraphQL */ `mutation DeleteJob(
  $input: DeleteJobInput!
  $condition: ModelJobConditionInput
) {
  deleteJob(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteJobMutationVariables,
  APITypes.DeleteJobMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createSkill = /* GraphQL */ `mutation CreateSkill(
  $input: CreateSkillInput!
  $condition: ModelSkillConditionInput
) {
  createSkill(input: $input, condition: $condition) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSkillMutationVariables,
  APITypes.CreateSkillMutation
>;
export const updateSkill = /* GraphQL */ `mutation UpdateSkill(
  $input: UpdateSkillInput!
  $condition: ModelSkillConditionInput
) {
  updateSkill(input: $input, condition: $condition) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSkillMutationVariables,
  APITypes.UpdateSkillMutation
>;
export const deleteSkill = /* GraphQL */ `mutation DeleteSkill(
  $input: DeleteSkillInput!
  $condition: ModelSkillConditionInput
) {
  deleteSkill(input: $input, condition: $condition) {
    id
    skill
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSkillMutationVariables,
  APITypes.DeleteSkillMutation
>;
export const createAcceptedJob = /* GraphQL */ `mutation CreateAcceptedJob(
  $input: CreateAcceptedJobInput!
  $condition: ModelAcceptedJobConditionInput
) {
  createAcceptedJob(input: $input, condition: $condition) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAcceptedJobMutationVariables,
  APITypes.CreateAcceptedJobMutation
>;
export const updateAcceptedJob = /* GraphQL */ `mutation UpdateAcceptedJob(
  $input: UpdateAcceptedJobInput!
  $condition: ModelAcceptedJobConditionInput
) {
  updateAcceptedJob(input: $input, condition: $condition) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAcceptedJobMutationVariables,
  APITypes.UpdateAcceptedJobMutation
>;
export const deleteAcceptedJob = /* GraphQL */ `mutation DeleteAcceptedJob(
  $input: DeleteAcceptedJobInput!
  $condition: ModelAcceptedJobConditionInput
) {
  deleteAcceptedJob(input: $input, condition: $condition) {
    id
    jobid
    userid
    applytext
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAcceptedJobMutationVariables,
  APITypes.DeleteAcceptedJobMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $input: CreateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  createNotification(input: $input, condition: $condition) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $input: UpdateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  updateNotification(input: $input, condition: $condition) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $input: DeleteNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  deleteNotification(input: $input, condition: $condition) {
    id
    userid
    notiftitle
    notifdescription
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const createRating = /* GraphQL */ `mutation CreateRating(
  $input: CreateRatingInput!
  $condition: ModelRatingConditionInput
) {
  createRating(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRatingMutationVariables,
  APITypes.CreateRatingMutation
>;
export const updateRating = /* GraphQL */ `mutation UpdateRating(
  $input: UpdateRatingInput!
  $condition: ModelRatingConditionInput
) {
  updateRating(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRatingMutationVariables,
  APITypes.UpdateRatingMutation
>;
export const deleteRating = /* GraphQL */ `mutation DeleteRating(
  $input: DeleteRatingInput!
  $condition: ModelRatingConditionInput
) {
  deleteRating(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRatingMutationVariables,
  APITypes.DeleteRatingMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const createMention = /* GraphQL */ `mutation CreateMention(
  $input: CreateMentionInput!
  $condition: ModelMentionConditionInput
) {
  createMention(input: $input, condition: $condition) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMentionMutationVariables,
  APITypes.CreateMentionMutation
>;
export const updateMention = /* GraphQL */ `mutation UpdateMention(
  $input: UpdateMentionInput!
  $condition: ModelMentionConditionInput
) {
  updateMention(input: $input, condition: $condition) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMentionMutationVariables,
  APITypes.UpdateMentionMutation
>;
export const deleteMention = /* GraphQL */ `mutation DeleteMention(
  $input: DeleteMentionInput!
  $condition: ModelMentionConditionInput
) {
  deleteMention(input: $input, condition: $condition) {
    id
    commentid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMentionMutationVariables,
  APITypes.DeleteMentionMutation
>;
export const createCourse = /* GraphQL */ `mutation CreateCourse(
  $input: CreateCourseInput!
  $condition: ModelCourseConditionInput
) {
  createCourse(input: $input, condition: $condition) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCourseMutationVariables,
  APITypes.CreateCourseMutation
>;
export const updateCourse = /* GraphQL */ `mutation UpdateCourse(
  $input: UpdateCourseInput!
  $condition: ModelCourseConditionInput
) {
  updateCourse(input: $input, condition: $condition) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCourseMutationVariables,
  APITypes.UpdateCourseMutation
>;
export const deleteCourse = /* GraphQL */ `mutation DeleteCourse(
  $input: DeleteCourseInput!
  $condition: ModelCourseConditionInput
) {
  deleteCourse(input: $input, condition: $condition) {
    id
    coursename
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCourseMutationVariables,
  APITypes.DeleteCourseMutation
>;
export const createSubject = /* GraphQL */ `mutation CreateSubject(
  $input: CreateSubjectInput!
  $condition: ModelSubjectConditionInput
) {
  createSubject(input: $input, condition: $condition) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSubjectMutationVariables,
  APITypes.CreateSubjectMutation
>;
export const updateSubject = /* GraphQL */ `mutation UpdateSubject(
  $input: UpdateSubjectInput!
  $condition: ModelSubjectConditionInput
) {
  updateSubject(input: $input, condition: $condition) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSubjectMutationVariables,
  APITypes.UpdateSubjectMutation
>;
export const deleteSubject = /* GraphQL */ `mutation DeleteSubject(
  $input: DeleteSubjectInput!
  $condition: ModelSubjectConditionInput
) {
  deleteSubject(input: $input, condition: $condition) {
    id
    courseid
    subjectname
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSubjectMutationVariables,
  APITypes.DeleteSubjectMutation
>;
export const createUserSkill = /* GraphQL */ `mutation CreateUserSkill(
  $input: CreateUserSkillInput!
  $condition: ModelUserSkillConditionInput
) {
  createUserSkill(input: $input, condition: $condition) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserSkillMutationVariables,
  APITypes.CreateUserSkillMutation
>;
export const updateUserSkill = /* GraphQL */ `mutation UpdateUserSkill(
  $input: UpdateUserSkillInput!
  $condition: ModelUserSkillConditionInput
) {
  updateUserSkill(input: $input, condition: $condition) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserSkillMutationVariables,
  APITypes.UpdateUserSkillMutation
>;
export const deleteUserSkill = /* GraphQL */ `mutation DeleteUserSkill(
  $input: DeleteUserSkillInput!
  $condition: ModelUserSkillConditionInput
) {
  deleteUserSkill(input: $input, condition: $condition) {
    id
    skillid
    userid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserSkillMutationVariables,
  APITypes.DeleteUserSkillMutation
>;
export const createJobSkill = /* GraphQL */ `mutation CreateJobSkill(
  $input: CreateJobSkillInput!
  $condition: ModelJobSkillConditionInput
) {
  createJobSkill(input: $input, condition: $condition) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateJobSkillMutationVariables,
  APITypes.CreateJobSkillMutation
>;
export const updateJobSkill = /* GraphQL */ `mutation UpdateJobSkill(
  $input: UpdateJobSkillInput!
  $condition: ModelJobSkillConditionInput
) {
  updateJobSkill(input: $input, condition: $condition) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateJobSkillMutationVariables,
  APITypes.UpdateJobSkillMutation
>;
export const deleteJobSkill = /* GraphQL */ `mutation DeleteJobSkill(
  $input: DeleteJobSkillInput!
  $condition: ModelJobSkillConditionInput
) {
  deleteJobSkill(input: $input, condition: $condition) {
    id
    skillid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteJobSkillMutationVariables,
  APITypes.DeleteJobSkillMutation
>;
export const createSubjectJob = /* GraphQL */ `mutation CreateSubjectJob(
  $input: CreateSubjectJobInput!
  $condition: ModelSubjectJobConditionInput
) {
  createSubjectJob(input: $input, condition: $condition) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSubjectJobMutationVariables,
  APITypes.CreateSubjectJobMutation
>;
export const updateSubjectJob = /* GraphQL */ `mutation UpdateSubjectJob(
  $input: UpdateSubjectJobInput!
  $condition: ModelSubjectJobConditionInput
) {
  updateSubjectJob(input: $input, condition: $condition) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSubjectJobMutationVariables,
  APITypes.UpdateSubjectJobMutation
>;
export const deleteSubjectJob = /* GraphQL */ `mutation DeleteSubjectJob(
  $input: DeleteSubjectJobInput!
  $condition: ModelSubjectJobConditionInput
) {
  deleteSubjectJob(input: $input, condition: $condition) {
    id
    subjectid
    jobid
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSubjectJobMutationVariables,
  APITypes.DeleteSubjectJobMutation
>;
