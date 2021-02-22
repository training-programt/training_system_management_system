import { UserInfo,Syllabus,TrainingScheme } from '@/pages'

export default [
  {
    path: '/infoView/syllabus',
    name: '教学大纲',
    icon: 'icon-icon-test7',
    component: Syllabus,
  },
  {
    path: '/infoView/trainingScheme',
    name: '培养方案',
    icon: 'icon-icon-test8',
    component: TrainingScheme,
  },
  {
    path: '/infoView/userInfo',
    name: '个人信息',
    icon: 'icon-user',
    component: UserInfo,
  },
]