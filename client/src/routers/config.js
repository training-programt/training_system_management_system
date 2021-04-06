import course from './course';
import exception from './exception'
import major from './major';
import publish from './publish';
import teacher from './teacher';
import grade from './grade';
import setting from './setting';
import infoView from './infoView';
import teachRoom from './teachRoom';
import trainingProject from './trainingProject';
import trainingObject from './trainingObject';
import graduatoinRequirement from './graduatoinRequirement';
import courseLeader from './courseLeader'
import teachingManagement from './teachingManagement'
import courseType from './courseType';
import courseSystem from './courseSystem';
import teachingInfo from './teachingInfo';
import teachingList from './teachingTeacher/teachingList';
// import ShowAudit from './TeachingTeacher/TeachingList/auditShow';
// import ShowApproval from './teachingTeacher/teachingList';
import auditApproval from './teachingTeacher/auditApproval';
import researchTeacher from './researchTeacher';

const routesConfig = [
  // 子路由
  ...major,
  ...teacher,
  ...course,
  ...grade,
  ...infoView,
  ...teachRoom,
  ...courseType,
  ...courseSystem,
  ...trainingProject,
  ...trainingObject,
  ...graduatoinRequirement,
  ...courseLeader,
  ...teachingManagement,
  ...teachingInfo,
  ...teachingList,
  ...auditApproval,
  ...researchTeacher,
  ...setting,
  ...publish,
  ...exception,
]
export default routesConfig;