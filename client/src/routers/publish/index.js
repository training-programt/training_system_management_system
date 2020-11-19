import { Home, UserInfo, Notification } from "@/pages";

export default [
  {
    path: '/home',
    exact: true,
    roles: 1,
    component: Home
  },
  
  {
    path: '/userInfo',
    exact: true,
    roles: 1,
    component:UserInfo
  },
  {
    path: '/notification',
    exact: true,
    roles: 1,
    component: Notification
  },
  {
    path: '*',
    exact: true,
    redirect: '/exception/404'
  },
]