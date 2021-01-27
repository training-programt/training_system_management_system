import { TrainingProject, AddTrainingProject, EditTrainingProject } from "@/pages";
export default [
  {
    path: '/trainingProject',
    name: '培养方案',
    icon: 'icon-teacher',
    component: TrainingProject,
  },
  {
    path: '/trainingProject/add',
    name: '新增培养方案',
    icon: 'icon-teacher',
    component: AddTrainingProject,
  },
  {
    path: '/trainingProject/edit',
    name: '编辑培养方案',
    icon: 'icon-teacher',
    component: EditTrainingProject,
  },
]