import {TeachingList, ShowAudit,ShowApproval}from "@/pages";
export default [
  {
    path: '/teachingList',
    name: '授课列表',
    component: TeachingList,
  },
  {
    path: '/teachingList/showAudit',
    name: '查看审核表',
    component: ShowAudit,
  },
  {
    path: '/teachingList/showApproval',
    name: '查看审批表',
    component: ShowApproval,
  },
]