import Login from './login';
import LeaderTeacher from './Teacher/leaderTeacher';
import LeaderCourse from './Course/leaderCourse';
import LeaderMajor from './Major/leaderMajor';
import DirectorMajor from './Major/directorMajor';
import Home from './Home';
import Grade from './Grade';
import Notification from './Notification'
import UserInfo from "./InfoView/UserInfo";
import SyllabusShow from "./InfoView/SyllabusShow";
import TrainingScheme from "./InfoView/TrainingScheme";
import TeachRoom from "./TeachRoom";
import SectionDetails from "./TeachRoom/sectionDetails";
import TrainingProject from './TrainingProject';
import TrainingObject from './TrainingObject';
import EditTrainingObject from './TrainingObject/detail';
import AddTrainingProject from './TrainingProject/add';
import EditTrainingProject from './TrainingProject/edit';
import ShowProject from './TrainingProject/showProject';

import Syllabus from "./CourseLeader/Syllabus";
import testMethod from './CourseLeader/testMethod';
import Book from './CourseLeader/Book';
import SyllabusAdd from './CourseLeader/Syllabus/add';
import SyllabusShows from './CourseLeader/Syllabus/show';
import HeaderCourse from "./CourseLeader/HeaderCourse/headerCourse";
import ProjectShow from "./CourseLeader/ProjectShow/projectShow"
import ShowCourse from './CourseLeader/Syllabus/showCourse';

import TeachingRecord from './TeachingRecord';
import CourseAssessment from './CourseAssessment';
import AddCourseAssessment from './CourseAssessment/add';

import Audit from "./TeachingTeacher/AuditApproval/audit";
import Approval from "./TeachingTeacher/AuditApproval/approval";
import ApprovalDetail from "./TeachingTeacher/AuditApproval/approvalDetail";
import AuditDetail from "./TeachingTeacher/AuditApproval/auditDetail";
import TeachingList from "./TeachingTeacher/TeachingList";

import ProcessApproval from './ResearchTeacher/Progress/approval'
import ShowProcessApproval from './ResearchTeacher/Progress/approvalShow'
import ProcessExamine from "./ResearchTeacher/Progress/examine";
import ShowProcessExamine  from "./ResearchTeacher/Progress/auditShow";
import ProcessSyllabus  from "./ResearchTeacher/Progress/syllabus";
import ShowProcessSyllabus  from "./ResearchTeacher/Progress/showSyllabus";

import ResearchTeacherRequirement from "./ResearchTeacher/Achievement/requirement";
import ResearchTeacherPoint from "./ResearchTeacher/Achievement/point";

import ShowApproval from "./TeachingTeacher/TeachingList/approvalShow";
import ShowAudit from "./TeachingTeacher/TeachingList/auditShow";

export {
  Login,
  Home,
  LeaderTeacher,
  LeaderCourse,
  testMethod,
  Notification,
  LeaderMajor,
  ShowApproval,
  ShowAudit,
  DirectorMajor,
  TeachingList,
  Grade,
  UserInfo,
  TeachRoom,
  Book,
  SectionDetails,
  ShowCourse,
  SyllabusShows,
  SyllabusShow,
  Syllabus,
  SyllabusAdd,
  HeaderCourse,
  ProjectShow,
  TrainingProject,
  TrainingObject,
  EditTrainingObject,
  TrainingScheme,
  AddTrainingProject,
  EditTrainingProject,
  TeachingRecord,
  CourseAssessment,
  AddCourseAssessment,
  Audit,
  Approval,
  ApprovalDetail,
  AuditDetail,
  ProcessApproval,
  ShowProcessApproval,
  ProcessExamine,
  ShowProcessExamine,
  ResearchTeacherRequirement,
  ResearchTeacherPoint,
  ProcessSyllabus,
  ShowProcessSyllabus,
  ShowProject,
}