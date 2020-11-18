import { BlankLayout, BasicLayout, } from '../layouts'
import { Login } from "@/pages";
import course from './course';
import exception from './exception'
import major from './major';
import publish from './publish';
import teacher from './teacher';
import grade from './grade';

const routesConfig = [{
  path: '/',
  component: BlankLayout,
  roles: 1,
  childRoutes: [
    // 子菜单路由
    {
      path: '/login', // 路径
      name: '登录', // 菜单名称
      roles: 1, // 权限等级  4: 教学领导(所有权限) 3：教务处主任  2：课程负责人 1：授课教师, 数字越大，权限越高
      component: Login, // 懒加载, 路由组件
    },
    {
      path: '/',
      component: BasicLayout,
      roles: 1,
      childRoutes: [
        // 子路由
        ...teacher,
        ...course,
        ...major,
        ...grade,
        ...publish,
        ...exception,

      ]
    },
    
  ]
}]

export default routesConfig;