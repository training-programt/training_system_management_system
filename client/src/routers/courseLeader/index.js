import {Syllabus,SyllabusAdd,ShowCourse,HeaderCourse,ProjectShow,SyllabusShows,testMethod,Book} from "@/pages";
//课程负责人
export default [
  {
    path:'/testMethods',
    name:'考核环节设置',
    icon:'icon-icon-test8',
    component:testMethod
  },
  {
    path:'/referenceBooks',
    name:'建议教材及参考大纲设置',
    icon:'icon-icon-test8',
    component:Book
  },
  {
    path: '/syllabus',
    name: '教学大纲管理',
    icon: 'icon-icon-test7',
    component: Syllabus,
  },
  {
    path: '/syllabus/management',
    name: '教学大纲管理',
    icon: 'icon-icon-test7',
    component: Syllabus,
  },
  
  {
    path: '/syllabus/add',
    name: '新增教学大纲',
    component: SyllabusAdd,
  },
  {
    path: '/syllabus/edit',
    name: '编辑教学大纲',
    component: SyllabusAdd,
  },
  {
    path: '/syllabus/show',
    name: '查看教学大纲',
    component: SyllabusShows,
  },
  {
    path: '/trainingShow',
    name: '培养方案查看',
    component: ProjectShow,
  },
  {
    path: '/headerCourse',
    name: '课程关系绑定',
    component: HeaderCourse,
  },
  {
    path: '/syllabus/showCourse',
    name: '指定课程查看',
    component: ShowCourse,
  },
]