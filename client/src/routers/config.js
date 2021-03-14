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

const routesConfig = [
  // 子路由
  ...major,
  ...teacher,
  ...course,
  ...grade,
  ...infoView,
  ...teachRoom,
  ...trainingProject,
  ...trainingObject,
  ...graduatoinRequirement,
  ...courseLeader,
  ...teachingManagement,
  ...setting,
  ...publish,
  ...exception,
]
export default routesConfig;