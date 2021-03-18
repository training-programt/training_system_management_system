import {Syllabus,SyllabusAdd,HeaderCourse,ProjectShow,SyllabusShows} from "@/pages";
//课程负责人
export default [
  {
    path: '/syllabus',
    name: '教学大纲',
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
]