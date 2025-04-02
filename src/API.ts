/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateJobInput = {
  id?: string | null,
  userid: string,
  title: string,
  subject?: string | null,
  description: string,
  deadline?: string | null,
  status?: number | null,
};

export type ModelJobConditionInput = {
  userid?: ModelStringInput | null,
  title?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  description?: ModelStringInput | null,
  deadline?: ModelStringInput | null,
  status?: ModelIntInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Job = {
  __typename: "Job",
  id: string,
  userid: string,
  title: string,
  subject?: string | null,
  description: string,
  deadline?: string | null,
  status?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateJobInput = {
  id: string,
  userid?: string | null,
  title?: string | null,
  subject?: string | null,
  description?: string | null,
  deadline?: string | null,
  status?: number | null,
};

export type DeleteJobInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  usertype?: number | null,
  firstname?: string | null,
  surname?: string | null,
  college?: string | null,
  email: string,
  areaofstudy?: string | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  usertype?: ModelIntInput | null,
  firstname?: ModelStringInput | null,
  surname?: ModelStringInput | null,
  college?: ModelStringInput | null,
  email?: ModelStringInput | null,
  areaofstudy?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  usertype?: number | null,
  firstname?: string | null,
  surname?: string | null,
  college?: string | null,
  email: string,
  areaofstudy?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  usertype?: number | null,
  firstname?: string | null,
  surname?: string | null,
  college?: string | null,
  email?: string | null,
  areaofstudy?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateSkillInput = {
  id?: string | null,
  skill: string,
};

export type ModelSkillConditionInput = {
  skill?: ModelStringInput | null,
  and?: Array< ModelSkillConditionInput | null > | null,
  or?: Array< ModelSkillConditionInput | null > | null,
  not?: ModelSkillConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Skill = {
  __typename: "Skill",
  id: string,
  skill: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSkillInput = {
  id: string,
  skill?: string | null,
};

export type DeleteSkillInput = {
  id: string,
};

export type CreateAcceptedJobInput = {
  id?: string | null,
  jobid: string,
  userid: string,
  applytext?: string | null,
};

export type ModelAcceptedJobConditionInput = {
  jobid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  applytext?: ModelStringInput | null,
  and?: Array< ModelAcceptedJobConditionInput | null > | null,
  or?: Array< ModelAcceptedJobConditionInput | null > | null,
  not?: ModelAcceptedJobConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type AcceptedJob = {
  __typename: "AcceptedJob",
  id: string,
  jobid: string,
  userid: string,
  applytext?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAcceptedJobInput = {
  id: string,
  jobid?: string | null,
  userid?: string | null,
  applytext?: string | null,
};

export type DeleteAcceptedJobInput = {
  id: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  userid: string,
  notiftitle?: string | null,
  notifdescription?: string | null,
};

export type ModelNotificationConditionInput = {
  userid?: ModelStringInput | null,
  notiftitle?: ModelStringInput | null,
  notifdescription?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  userid: string,
  notiftitle?: string | null,
  notifdescription?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNotificationInput = {
  id: string,
  userid?: string | null,
  notiftitle?: string | null,
  notifdescription?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type CreateRatingInput = {
  id?: string | null,
  jobid: string,
  rateduserid: string,
  ratinguserid: string,
  rating: number,
};

export type ModelRatingConditionInput = {
  jobid?: ModelStringInput | null,
  rateduserid?: ModelStringInput | null,
  ratinguserid?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelRatingConditionInput | null > | null,
  or?: Array< ModelRatingConditionInput | null > | null,
  not?: ModelRatingConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Rating = {
  __typename: "Rating",
  id: string,
  jobid: string,
  rateduserid: string,
  ratinguserid: string,
  rating: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRatingInput = {
  id: string,
  jobid?: string | null,
  rateduserid?: string | null,
  ratinguserid?: string | null,
  rating?: number | null,
};

export type DeleteRatingInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  jobid: string,
  userid: string,
  commenttext: string,
  commenttime: string,
};

export type ModelCommentConditionInput = {
  jobid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  commenttext?: ModelStringInput | null,
  commenttime?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  jobid: string,
  userid: string,
  commenttext: string,
  commenttime: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCommentInput = {
  id: string,
  jobid?: string | null,
  userid?: string | null,
  commenttext?: string | null,
  commenttime?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateMentionInput = {
  id?: string | null,
  commentid: string,
  userid: string,
};

export type ModelMentionConditionInput = {
  commentid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  and?: Array< ModelMentionConditionInput | null > | null,
  or?: Array< ModelMentionConditionInput | null > | null,
  not?: ModelMentionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Mention = {
  __typename: "Mention",
  id: string,
  commentid: string,
  userid: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMentionInput = {
  id: string,
  commentid?: string | null,
  userid?: string | null,
};

export type DeleteMentionInput = {
  id: string,
};

export type CreateCourseInput = {
  id?: string | null,
  coursename?: string | null,
};

export type ModelCourseConditionInput = {
  coursename?: ModelStringInput | null,
  and?: Array< ModelCourseConditionInput | null > | null,
  or?: Array< ModelCourseConditionInput | null > | null,
  not?: ModelCourseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Course = {
  __typename: "Course",
  id: string,
  coursename?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCourseInput = {
  id: string,
  coursename?: string | null,
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateSubjectInput = {
  id?: string | null,
  courseid: string,
  subjectname: string,
};

export type ModelSubjectConditionInput = {
  courseid?: ModelStringInput | null,
  subjectname?: ModelStringInput | null,
  and?: Array< ModelSubjectConditionInput | null > | null,
  or?: Array< ModelSubjectConditionInput | null > | null,
  not?: ModelSubjectConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Subject = {
  __typename: "Subject",
  id: string,
  courseid: string,
  subjectname: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSubjectInput = {
  id: string,
  courseid?: string | null,
  subjectname?: string | null,
};

export type DeleteSubjectInput = {
  id: string,
};

export type CreateUserSkillInput = {
  id?: string | null,
  skillid: string,
  userid: string,
};

export type ModelUserSkillConditionInput = {
  skillid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  and?: Array< ModelUserSkillConditionInput | null > | null,
  or?: Array< ModelUserSkillConditionInput | null > | null,
  not?: ModelUserSkillConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UserSkill = {
  __typename: "UserSkill",
  id: string,
  skillid: string,
  userid: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserSkillInput = {
  id: string,
  skillid?: string | null,
  userid?: string | null,
};

export type DeleteUserSkillInput = {
  id: string,
};

export type CreateJobSkillInput = {
  id?: string | null,
  skillid: string,
  jobid: string,
};

export type ModelJobSkillConditionInput = {
  skillid?: ModelStringInput | null,
  jobid?: ModelStringInput | null,
  and?: Array< ModelJobSkillConditionInput | null > | null,
  or?: Array< ModelJobSkillConditionInput | null > | null,
  not?: ModelJobSkillConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type JobSkill = {
  __typename: "JobSkill",
  id: string,
  skillid: string,
  jobid: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateJobSkillInput = {
  id: string,
  skillid?: string | null,
  jobid?: string | null,
};

export type DeleteJobSkillInput = {
  id: string,
};

export type CreateSubjectJobInput = {
  id?: string | null,
  subjectid: string,
  jobid: string,
};

export type ModelSubjectJobConditionInput = {
  subjectid?: ModelStringInput | null,
  jobid?: ModelStringInput | null,
  and?: Array< ModelSubjectJobConditionInput | null > | null,
  or?: Array< ModelSubjectJobConditionInput | null > | null,
  not?: ModelSubjectJobConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type SubjectJob = {
  __typename: "SubjectJob",
  id: string,
  subjectid: string,
  jobid: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSubjectJobInput = {
  id: string,
  subjectid?: string | null,
  jobid?: string | null,
};

export type DeleteSubjectJobInput = {
  id: string,
};

export type ModelJobFilterInput = {
  id?: ModelIDInput | null,
  userid?: ModelStringInput | null,
  title?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  description?: ModelStringInput | null,
  deadline?: ModelStringInput | null,
  status?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  or?: Array< ModelJobFilterInput | null > | null,
  not?: ModelJobFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelJobConnection = {
  __typename: "ModelJobConnection",
  items:  Array<Job | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  usertype?: ModelIntInput | null,
  firstname?: ModelStringInput | null,
  surname?: ModelStringInput | null,
  college?: ModelStringInput | null,
  email?: ModelStringInput | null,
  areaofstudy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSkillFilterInput = {
  id?: ModelIDInput | null,
  skill?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSkillFilterInput | null > | null,
  or?: Array< ModelSkillFilterInput | null > | null,
  not?: ModelSkillFilterInput | null,
};

export type ModelSkillConnection = {
  __typename: "ModelSkillConnection",
  items:  Array<Skill | null >,
  nextToken?: string | null,
};

export type ModelAcceptedJobFilterInput = {
  id?: ModelIDInput | null,
  jobid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  applytext?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAcceptedJobFilterInput | null > | null,
  or?: Array< ModelAcceptedJobFilterInput | null > | null,
  not?: ModelAcceptedJobFilterInput | null,
};

export type ModelAcceptedJobConnection = {
  __typename: "ModelAcceptedJobConnection",
  items:  Array<AcceptedJob | null >,
  nextToken?: string | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  userid?: ModelStringInput | null,
  notiftitle?: ModelStringInput | null,
  notifdescription?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type ModelRatingFilterInput = {
  id?: ModelIDInput | null,
  jobid?: ModelStringInput | null,
  rateduserid?: ModelStringInput | null,
  ratinguserid?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRatingFilterInput | null > | null,
  or?: Array< ModelRatingFilterInput | null > | null,
  not?: ModelRatingFilterInput | null,
};

export type ModelRatingConnection = {
  __typename: "ModelRatingConnection",
  items:  Array<Rating | null >,
  nextToken?: string | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  jobid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  commenttext?: ModelStringInput | null,
  commenttime?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type ModelMentionFilterInput = {
  id?: ModelIDInput | null,
  commentid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMentionFilterInput | null > | null,
  or?: Array< ModelMentionFilterInput | null > | null,
  not?: ModelMentionFilterInput | null,
};

export type ModelMentionConnection = {
  __typename: "ModelMentionConnection",
  items:  Array<Mention | null >,
  nextToken?: string | null,
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null,
  coursename?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
};

export type ModelSubjectFilterInput = {
  id?: ModelIDInput | null,
  courseid?: ModelStringInput | null,
  subjectname?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSubjectFilterInput | null > | null,
  or?: Array< ModelSubjectFilterInput | null > | null,
  not?: ModelSubjectFilterInput | null,
};

export type ModelSubjectConnection = {
  __typename: "ModelSubjectConnection",
  items:  Array<Subject | null >,
  nextToken?: string | null,
};

export type ModelUserSkillFilterInput = {
  id?: ModelIDInput | null,
  skillid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserSkillFilterInput | null > | null,
  or?: Array< ModelUserSkillFilterInput | null > | null,
  not?: ModelUserSkillFilterInput | null,
};

export type ModelUserSkillConnection = {
  __typename: "ModelUserSkillConnection",
  items:  Array<UserSkill | null >,
  nextToken?: string | null,
};

export type ModelJobSkillFilterInput = {
  id?: ModelIDInput | null,
  skillid?: ModelStringInput | null,
  jobid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelJobSkillFilterInput | null > | null,
  or?: Array< ModelJobSkillFilterInput | null > | null,
  not?: ModelJobSkillFilterInput | null,
};

export type ModelJobSkillConnection = {
  __typename: "ModelJobSkillConnection",
  items:  Array<JobSkill | null >,
  nextToken?: string | null,
};

export type ModelSubjectJobFilterInput = {
  id?: ModelIDInput | null,
  subjectid?: ModelStringInput | null,
  jobid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSubjectJobFilterInput | null > | null,
  or?: Array< ModelSubjectJobFilterInput | null > | null,
  not?: ModelSubjectJobFilterInput | null,
};

export type ModelSubjectJobConnection = {
  __typename: "ModelSubjectJobConnection",
  items:  Array<SubjectJob | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionJobFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userid?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  deadline?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionJobFilterInput | null > | null,
  or?: Array< ModelSubscriptionJobFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  usertype?: ModelSubscriptionIntInput | null,
  firstname?: ModelSubscriptionStringInput | null,
  surname?: ModelSubscriptionStringInput | null,
  college?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  areaofstudy?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionSkillFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  skill?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSkillFilterInput | null > | null,
  or?: Array< ModelSubscriptionSkillFilterInput | null > | null,
};

export type ModelSubscriptionAcceptedJobFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  jobid?: ModelSubscriptionStringInput | null,
  userid?: ModelSubscriptionStringInput | null,
  applytext?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAcceptedJobFilterInput | null > | null,
  or?: Array< ModelSubscriptionAcceptedJobFilterInput | null > | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userid?: ModelSubscriptionStringInput | null,
  notiftitle?: ModelSubscriptionStringInput | null,
  notifdescription?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
};

export type ModelSubscriptionRatingFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  jobid?: ModelSubscriptionStringInput | null,
  rateduserid?: ModelSubscriptionStringInput | null,
  ratinguserid?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRatingFilterInput | null > | null,
  or?: Array< ModelSubscriptionRatingFilterInput | null > | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  jobid?: ModelSubscriptionStringInput | null,
  userid?: ModelSubscriptionStringInput | null,
  commenttext?: ModelSubscriptionStringInput | null,
  commenttime?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
};

export type ModelSubscriptionMentionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  commentid?: ModelSubscriptionStringInput | null,
  userid?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMentionFilterInput | null > | null,
  or?: Array< ModelSubscriptionMentionFilterInput | null > | null,
};

export type ModelSubscriptionCourseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  coursename?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCourseFilterInput | null > | null,
  or?: Array< ModelSubscriptionCourseFilterInput | null > | null,
};

export type ModelSubscriptionSubjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  courseid?: ModelSubscriptionStringInput | null,
  subjectname?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSubjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionSubjectFilterInput | null > | null,
};

export type ModelSubscriptionUserSkillFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  skillid?: ModelSubscriptionStringInput | null,
  userid?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserSkillFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserSkillFilterInput | null > | null,
};

export type ModelSubscriptionJobSkillFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  skillid?: ModelSubscriptionStringInput | null,
  jobid?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionJobSkillFilterInput | null > | null,
  or?: Array< ModelSubscriptionJobSkillFilterInput | null > | null,
};

export type ModelSubscriptionSubjectJobFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  subjectid?: ModelSubscriptionStringInput | null,
  jobid?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSubjectJobFilterInput | null > | null,
  or?: Array< ModelSubscriptionSubjectJobFilterInput | null > | null,
};

export type CreateJobMutationVariables = {
  input: CreateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type CreateJobMutation = {
  createJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateJobMutationVariables = {
  input: UpdateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type UpdateJobMutation = {
  updateJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteJobMutationVariables = {
  input: DeleteJobInput,
  condition?: ModelJobConditionInput | null,
};

export type DeleteJobMutation = {
  deleteJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSkillMutationVariables = {
  input: CreateSkillInput,
  condition?: ModelSkillConditionInput | null,
};

export type CreateSkillMutation = {
  createSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSkillMutationVariables = {
  input: UpdateSkillInput,
  condition?: ModelSkillConditionInput | null,
};

export type UpdateSkillMutation = {
  updateSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSkillMutationVariables = {
  input: DeleteSkillInput,
  condition?: ModelSkillConditionInput | null,
};

export type DeleteSkillMutation = {
  deleteSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAcceptedJobMutationVariables = {
  input: CreateAcceptedJobInput,
  condition?: ModelAcceptedJobConditionInput | null,
};

export type CreateAcceptedJobMutation = {
  createAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAcceptedJobMutationVariables = {
  input: UpdateAcceptedJobInput,
  condition?: ModelAcceptedJobConditionInput | null,
};

export type UpdateAcceptedJobMutation = {
  updateAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAcceptedJobMutationVariables = {
  input: DeleteAcceptedJobInput,
  condition?: ModelAcceptedJobConditionInput | null,
};

export type DeleteAcceptedJobMutation = {
  deleteAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRatingMutationVariables = {
  input: CreateRatingInput,
  condition?: ModelRatingConditionInput | null,
};

export type CreateRatingMutation = {
  createRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRatingMutationVariables = {
  input: UpdateRatingInput,
  condition?: ModelRatingConditionInput | null,
};

export type UpdateRatingMutation = {
  updateRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRatingMutationVariables = {
  input: DeleteRatingInput,
  condition?: ModelRatingConditionInput | null,
};

export type DeleteRatingMutation = {
  deleteRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMentionMutationVariables = {
  input: CreateMentionInput,
  condition?: ModelMentionConditionInput | null,
};

export type CreateMentionMutation = {
  createMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMentionMutationVariables = {
  input: UpdateMentionInput,
  condition?: ModelMentionConditionInput | null,
};

export type UpdateMentionMutation = {
  updateMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMentionMutationVariables = {
  input: DeleteMentionInput,
  condition?: ModelMentionConditionInput | null,
};

export type DeleteMentionMutation = {
  deleteMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type CreateCourseMutation = {
  createCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type DeleteCourseMutation = {
  deleteCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSubjectMutationVariables = {
  input: CreateSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type CreateSubjectMutation = {
  createSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubjectMutationVariables = {
  input: UpdateSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type UpdateSubjectMutation = {
  updateSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubjectMutationVariables = {
  input: DeleteSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type DeleteSubjectMutation = {
  deleteSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserSkillMutationVariables = {
  input: CreateUserSkillInput,
  condition?: ModelUserSkillConditionInput | null,
};

export type CreateUserSkillMutation = {
  createUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserSkillMutationVariables = {
  input: UpdateUserSkillInput,
  condition?: ModelUserSkillConditionInput | null,
};

export type UpdateUserSkillMutation = {
  updateUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserSkillMutationVariables = {
  input: DeleteUserSkillInput,
  condition?: ModelUserSkillConditionInput | null,
};

export type DeleteUserSkillMutation = {
  deleteUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateJobSkillMutationVariables = {
  input: CreateJobSkillInput,
  condition?: ModelJobSkillConditionInput | null,
};

export type CreateJobSkillMutation = {
  createJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateJobSkillMutationVariables = {
  input: UpdateJobSkillInput,
  condition?: ModelJobSkillConditionInput | null,
};

export type UpdateJobSkillMutation = {
  updateJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteJobSkillMutationVariables = {
  input: DeleteJobSkillInput,
  condition?: ModelJobSkillConditionInput | null,
};

export type DeleteJobSkillMutation = {
  deleteJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSubjectJobMutationVariables = {
  input: CreateSubjectJobInput,
  condition?: ModelSubjectJobConditionInput | null,
};

export type CreateSubjectJobMutation = {
  createSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubjectJobMutationVariables = {
  input: UpdateSubjectJobInput,
  condition?: ModelSubjectJobConditionInput | null,
};

export type UpdateSubjectJobMutation = {
  updateSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubjectJobMutationVariables = {
  input: DeleteSubjectJobInput,
  condition?: ModelSubjectJobConditionInput | null,
};

export type DeleteSubjectJobMutation = {
  deleteSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      userid: string,
      title: string,
      subject?: string | null,
      description: string,
      deadline?: string | null,
      status?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      usertype?: number | null,
      firstname?: string | null,
      surname?: string | null,
      college?: string | null,
      email: string,
      areaofstudy?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSkillQueryVariables = {
  id: string,
};

export type GetSkillQuery = {
  getSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSkillsQueryVariables = {
  filter?: ModelSkillFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSkillsQuery = {
  listSkills?:  {
    __typename: "ModelSkillConnection",
    items:  Array< {
      __typename: "Skill",
      id: string,
      skill: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAcceptedJobQueryVariables = {
  id: string,
};

export type GetAcceptedJobQuery = {
  getAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAcceptedJobsQueryVariables = {
  filter?: ModelAcceptedJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAcceptedJobsQuery = {
  listAcceptedJobs?:  {
    __typename: "ModelAcceptedJobConnection",
    items:  Array< {
      __typename: "AcceptedJob",
      id: string,
      jobid: string,
      userid: string,
      applytext?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      userid: string,
      notiftitle?: string | null,
      notifdescription?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRatingQueryVariables = {
  id: string,
};

export type GetRatingQuery = {
  getRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRatingsQueryVariables = {
  filter?: ModelRatingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRatingsQuery = {
  listRatings?:  {
    __typename: "ModelRatingConnection",
    items:  Array< {
      __typename: "Rating",
      id: string,
      jobid: string,
      rateduserid: string,
      ratinguserid: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      jobid: string,
      userid: string,
      commenttext: string,
      commenttime: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMentionQueryVariables = {
  id: string,
};

export type GetMentionQuery = {
  getMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMentionsQueryVariables = {
  filter?: ModelMentionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMentionsQuery = {
  listMentions?:  {
    __typename: "ModelMentionConnection",
    items:  Array< {
      __typename: "Mention",
      id: string,
      commentid: string,
      userid: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseQueryVariables = {
  id: string,
};

export type GetCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      coursename?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSubjectQueryVariables = {
  id: string,
};

export type GetSubjectQuery = {
  getSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubjectsQueryVariables = {
  filter?: ModelSubjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubjectsQuery = {
  listSubjects?:  {
    __typename: "ModelSubjectConnection",
    items:  Array< {
      __typename: "Subject",
      id: string,
      courseid: string,
      subjectname: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserSkillQueryVariables = {
  id: string,
};

export type GetUserSkillQuery = {
  getUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserSkillsQueryVariables = {
  filter?: ModelUserSkillFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserSkillsQuery = {
  listUserSkills?:  {
    __typename: "ModelUserSkillConnection",
    items:  Array< {
      __typename: "UserSkill",
      id: string,
      skillid: string,
      userid: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetJobSkillQueryVariables = {
  id: string,
};

export type GetJobSkillQuery = {
  getJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListJobSkillsQueryVariables = {
  filter?: ModelJobSkillFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobSkillsQuery = {
  listJobSkills?:  {
    __typename: "ModelJobSkillConnection",
    items:  Array< {
      __typename: "JobSkill",
      id: string,
      skillid: string,
      jobid: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSubjectJobQueryVariables = {
  id: string,
};

export type GetSubjectJobQuery = {
  getSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubjectJobsQueryVariables = {
  filter?: ModelSubjectJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubjectJobsQuery = {
  listSubjectJobs?:  {
    __typename: "ModelSubjectJobConnection",
    items:  Array< {
      __typename: "SubjectJob",
      id: string,
      subjectid: string,
      jobid: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    id: string,
    userid: string,
    title: string,
    subject?: string | null,
    description: string,
    deadline?: string | null,
    status?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    usertype?: number | null,
    firstname?: string | null,
    surname?: string | null,
    college?: string | null,
    email: string,
    areaofstudy?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSkillSubscriptionVariables = {
  filter?: ModelSubscriptionSkillFilterInput | null,
};

export type OnCreateSkillSubscription = {
  onCreateSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSkillSubscriptionVariables = {
  filter?: ModelSubscriptionSkillFilterInput | null,
};

export type OnUpdateSkillSubscription = {
  onUpdateSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSkillSubscriptionVariables = {
  filter?: ModelSubscriptionSkillFilterInput | null,
};

export type OnDeleteSkillSubscription = {
  onDeleteSkill?:  {
    __typename: "Skill",
    id: string,
    skill: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAcceptedJobSubscriptionVariables = {
  filter?: ModelSubscriptionAcceptedJobFilterInput | null,
};

export type OnCreateAcceptedJobSubscription = {
  onCreateAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAcceptedJobSubscriptionVariables = {
  filter?: ModelSubscriptionAcceptedJobFilterInput | null,
};

export type OnUpdateAcceptedJobSubscription = {
  onUpdateAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAcceptedJobSubscriptionVariables = {
  filter?: ModelSubscriptionAcceptedJobFilterInput | null,
};

export type OnDeleteAcceptedJobSubscription = {
  onDeleteAcceptedJob?:  {
    __typename: "AcceptedJob",
    id: string,
    jobid: string,
    userid: string,
    applytext?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    userid: string,
    notiftitle?: string | null,
    notifdescription?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRatingSubscriptionVariables = {
  filter?: ModelSubscriptionRatingFilterInput | null,
};

export type OnCreateRatingSubscription = {
  onCreateRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRatingSubscriptionVariables = {
  filter?: ModelSubscriptionRatingFilterInput | null,
};

export type OnUpdateRatingSubscription = {
  onUpdateRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRatingSubscriptionVariables = {
  filter?: ModelSubscriptionRatingFilterInput | null,
};

export type OnDeleteRatingSubscription = {
  onDeleteRating?:  {
    __typename: "Rating",
    id: string,
    jobid: string,
    rateduserid: string,
    ratinguserid: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    jobid: string,
    userid: string,
    commenttext: string,
    commenttime: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMentionSubscriptionVariables = {
  filter?: ModelSubscriptionMentionFilterInput | null,
};

export type OnCreateMentionSubscription = {
  onCreateMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMentionSubscriptionVariables = {
  filter?: ModelSubscriptionMentionFilterInput | null,
};

export type OnUpdateMentionSubscription = {
  onUpdateMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMentionSubscriptionVariables = {
  filter?: ModelSubscriptionMentionFilterInput | null,
};

export type OnDeleteMentionSubscription = {
  onDeleteMention?:  {
    __typename: "Mention",
    id: string,
    commentid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnCreateCourseSubscription = {
  onCreateCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?:  {
    __typename: "Course",
    id: string,
    coursename?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSubjectSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectFilterInput | null,
};

export type OnCreateSubjectSubscription = {
  onCreateSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubjectSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectFilterInput | null,
};

export type OnUpdateSubjectSubscription = {
  onUpdateSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubjectSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectFilterInput | null,
};

export type OnDeleteSubjectSubscription = {
  onDeleteSubject?:  {
    __typename: "Subject",
    id: string,
    courseid: string,
    subjectname: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSkillSubscriptionVariables = {
  filter?: ModelSubscriptionUserSkillFilterInput | null,
};

export type OnCreateUserSkillSubscription = {
  onCreateUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSkillSubscriptionVariables = {
  filter?: ModelSubscriptionUserSkillFilterInput | null,
};

export type OnUpdateUserSkillSubscription = {
  onUpdateUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSkillSubscriptionVariables = {
  filter?: ModelSubscriptionUserSkillFilterInput | null,
};

export type OnDeleteUserSkillSubscription = {
  onDeleteUserSkill?:  {
    __typename: "UserSkill",
    id: string,
    skillid: string,
    userid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateJobSkillSubscriptionVariables = {
  filter?: ModelSubscriptionJobSkillFilterInput | null,
};

export type OnCreateJobSkillSubscription = {
  onCreateJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateJobSkillSubscriptionVariables = {
  filter?: ModelSubscriptionJobSkillFilterInput | null,
};

export type OnUpdateJobSkillSubscription = {
  onUpdateJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteJobSkillSubscriptionVariables = {
  filter?: ModelSubscriptionJobSkillFilterInput | null,
};

export type OnDeleteJobSkillSubscription = {
  onDeleteJobSkill?:  {
    __typename: "JobSkill",
    id: string,
    skillid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSubjectJobSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectJobFilterInput | null,
};

export type OnCreateSubjectJobSubscription = {
  onCreateSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubjectJobSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectJobFilterInput | null,
};

export type OnUpdateSubjectJobSubscription = {
  onUpdateSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubjectJobSubscriptionVariables = {
  filter?: ModelSubscriptionSubjectJobFilterInput | null,
};

export type OnDeleteSubjectJobSubscription = {
  onDeleteSubjectJob?:  {
    __typename: "SubjectJob",
    id: string,
    subjectid: string,
    jobid: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
