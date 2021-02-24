import {Syllabus,SyllabusAdd} from "@/pages";
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
]