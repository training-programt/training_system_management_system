import {
  ProcessApproval,
  ProcessExamine,
  ShowProcessApproval,
  ShowProcessExamine,
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
    path: '/progress/examine/showExamine',
    name: '查看审核表',
    component: ShowProcessExamine,
  },
  {
    path: '/progress/approval/showApproval',
    name: '查看审批表',
    component: ShowProcessApproval,
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