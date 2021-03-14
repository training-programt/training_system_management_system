import { TeachingRecord, CourseAssessment, AddCourseAssessment } from "@/pages";
export default [
  {
    path: '/teachingRecord',
    name: '授课记录',
    icon: 'icon-teacher',
    component: TeachingRecord,
  },
  {
    path: '/courseAssessment',
    name: '课程考核',
    icon: 'icon-teacher',
    component: CourseAssessment,
  },
  {
    path: '/courseAssessment/add',
    name: '新增课程考核',
    icon: 'icon-teacher',
    component: AddCourseAssessment,
  },
]