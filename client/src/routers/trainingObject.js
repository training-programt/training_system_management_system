import { TrainingObject, EditTrainingObject } from "@/pages";
export default [
  {
    path: '/trainingObject',
    name: '培养目标',
    icon: 'icon-icon-test8',
    component: TrainingObject,
  },
  {
    path: '/trainingObject/add',
    name: '编辑培养目标',
    icon: 'icon-teacher',
    component: EditTrainingObject,
  },
  {
    path: '/trainingObject/edit/:id',
    name: '编辑培养目标',
    icon: 'icon-teacher',
    component: EditTrainingObject,
  },
]