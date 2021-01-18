import { LeaderMajor,DirectorMajor } from "@/pages";
// import leaderMajor from ''

export default [
  {
    path: '/leaderMajor',
    name: '专业管理',
    icon: 'icon-major',
    roles: 1,
    component: LeaderMajor,
  },
  {
    path: '/directorMajor',
    name: '专业查看',
    icon: 'icon-major',
    roles: 2,
    component: DirectorMajor,
  },
]