import { TeachRoom, SectionDetails } from "@/pages";
export default [
  {
    path: '/teachRoom',
    name: '教研室管理',
    icon: 'icon-teacher',
    component: TeachRoom
  },
  {
    path: '/teachRoom/details/:id',
    name: '教研室详情',
    icon: 'icon-teacher',
    component: SectionDetails,
  },
]