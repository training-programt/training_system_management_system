import {
  lazy
} from 'react';

import {
  BlankLayout,
  BasicLayout,
} from '../layouts'

const config = [{
  path: '/',
  component: BlankLayout,
  childRoutes: [
    // 子菜单路由
    {
      path: '/login', // 路径
      name: '登录', // 菜单名称
      component:  lazy(() => import('@/pages/Login')), // 懒加载, 路由组件
    },
    
    {
      path: '/',
      component: BasicLayout,
      childRoutes: [
        // 子路由
        {
          path: '/',
          exact: true,
          // redirect: '/home',
          icon: 'HomeOutlined',
          component: lazy(() => import('@/pages/Home'))
        },
        {
          path: '/userInfo',
          exact: true,
          component: lazy(() => import('@/pages/UserInfo')),
        },
        {
          path: '/notification',
          exact: true,
          component: lazy(() => import('@/pages/Notification')),
        },
        {
          path: '/major',
          name: '专业管理',
          childRoutes: [
            {
              path: '/major/add',
              name: '添加专业',
              exact: true,
              component: lazy(() => import('@/pages/Major/Add')),
            },
            {
              path: '/major/del',
              name: '删除专业',
              exact: true,
              component: lazy(() => import('@/pages/Major/Del')),
            }
          ]
        },
        {
          path: '/class',
          name: '班级管理',
          exact: true, 
          component: lazy(() => import('@/pages/Class')),
        },
        {
          path: '/course',
          name: '课程管理',
          exact: true,
          component: lazy(() => import('@/pages/Course')),
        },
        {
          path: '/exception',
          childRoutes: [
            {
              path: '/exception/403',
              name: '403',
              component: lazy(() => import('@/pages/Exception/403'))
            }, 
            {
              path: '/exception/404',
              name: '404',
              component: lazy(() => import('@/pages/Exception/404'))
            },
            {
              path: '/exception/500',
              name: '500',
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