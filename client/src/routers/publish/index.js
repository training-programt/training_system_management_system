import { Home, UserInfo, Notification,  } from "@/pages";
import Error404 from "@/pages/Exception/404"
export default [
  {
    path: '/',
    component: Home
  },
  
  {
    path: '/userInfo',
    component:UserInfo
  },
  {
    path: '/notification',
    component: Notification
  },
  {
    path: '*',
    component: Error404
  },
]