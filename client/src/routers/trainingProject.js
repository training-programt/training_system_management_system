import { TrainingProject, AddTrainingProject, EditTrainingProject } from "@/pages";
export default [
  {
    path: '/trainingProject',
    name: '培养方案',
    icon: 'icon-teacher',
    component: TrainingProject,
  },
  {
    path: '/trainingProject/details/:id',
    name: '培养方案详情',
    icon: 'icon-teacher',
    component: AddTrainingProject,
  },
  {
    path: '/trainingProject/add',
    name: '新增培养方案',
    icon: 'icon-teacher',
    component: AddTrainingProject,
  },
]