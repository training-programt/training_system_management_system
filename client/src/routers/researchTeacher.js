import {
  ProcessApproval,
  ProcessExamine,
  ResearchTeacherRequirement,
  ResearchTeacherPoint,
} from "@/pages";
export default [
  {
    path: '/progress/approval',
    name: '审批',
    component: ProcessApproval,
  },
  {
    path: '/progress/examine',
    name: '审核',
    component: ProcessExamine,
  },
  {
    path: '/achievement/requirement',
    name: '毕业要求',
    component: ResearchTeacherRequirement,
  },
  {
    path: '/achievement/point',
    name: '指标点',
    component: ResearchTeacherPoint,
  },
]