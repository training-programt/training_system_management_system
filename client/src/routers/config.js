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
import graduatoinRequirement from './graduatoinRequirement';
import courseLeader from './courseLeader'
const routesConfig = [
  // 子路由
  ...major,
  ...teacher,
  ...course,
  ...grade,
  ...infoView,
  ...teachRoom,
  ...trainingProject,
  ...graduatoinRequirement,
  ...courseLeader,
  ...setting,
  ...publish,
  ...exception,
]
export default routesConfig;