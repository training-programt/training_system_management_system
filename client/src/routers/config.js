import { lazy } from 'react';

import { BlankLayout, BasicLayout, } from '../layouts'

const config = [{
  path: '/',
  component: BlankLayout,
  roles: ['001', '002', '003', '004'],
  childRoutes: [
    // 子菜单路由
    {
      path: '/login', // 路径
      name: '登录', // 菜单名称
      roles: ['001', '002', '003', '004'], // 权限等级  001: 教学领导 002：教务处主任  003：课程负责人 004：授课教师
      component:  lazy(() => import('@/pages/Login')), // 懒加载, 路由组件
      // component: Login,
    },
    
    {
      path: '/',
      component: BasicLayout,
      roles: ['001', '002', '003', '004'],
      childRoutes: [
        // 子路由
        {
          path: '/',
          exact: true,
          // redirect: '/home',
          roles: ['001', '002', '003', '004'],
          component: lazy(() => import('@/pages/Home'))
        },
        {
          path: '/userInfo',
          exact: true,
          roles: ['001', '002', '003', '004'],
          component: lazy(() => import('@/pages/UserInfo')),
        },
        {
          path: '/notification',
          exact: true,
          roles: ['001', '002', '003', '004'],
          component: lazy(() => import('@/pages/Notification')),
        },
        {
          path: '/major',
          name: '专业管理',
          icon: 'icon-user',
          roles: ['004'], // 权限等级  001: 教学领导 002：教务处主任  003：课程负责人 004：授课教师
          childRoutes: [
            {
              path: '/major/add',
              name: '添加专业',
              icon: 'icon-icon-test',
              roles: ['004'],
              exact: true,
              component: lazy(() => import('@/pages/Major/Add')),
            },
            {
              path: '/major/del',
              name: '删除专业',
              icon: 'icon-icon-test1',
              roles: ['004'],
              exact: true,
              component: lazy(() => import('@/pages/Major/Del')),
            }
          ]
        },
        {
          path: '/class',
          name: '班级管理',
          icon: 'icon-icon-test18',
          roles: ['001', '003'],
          exact: true, 
          component: lazy(() => import('@/pages/Class')),
        },
        {
          path: '/course',
          name: '课程管理',
          icon: 'icon-home',
          roles: ['004'],
          exact: true,
          component: lazy(() => import('@/pages/Course')),
        },
        {
          path: '/exception',
          roles: ['001', '002', '003', '004'],
          childRoutes: [
            {
              path: '/exception/403',
              name: '403',
              roles: ['001', '002', '003', '004'],
              component: lazy(() => import('@/pages/Exception/403'))
            }, 
            {
              path: '/exception/404',
              name: '404',
              roles: ['001', '002', '003', '004'],
              component: lazy(() => import('@/pages/Exception/404'))
            },
            {
              path: '/exception/500',
              name: '500',
              roles: ['001', '002', '003', '004'],
              component: lazy(() => import('@/pages/Exception/500'))
            }
          ]
        },
        
        {
          path: '*',
          exact: true,
          redirect: '/exception/404'
        },
      ]
    },
    
  ]
}]

export default config;