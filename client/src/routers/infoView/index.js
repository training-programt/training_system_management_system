import { InfoView } from '@/pages'

export default [
  {
    path: '/infoView',
    name: '信息查看',
    icon: 'icon-show',
    roles: 3,
    childRoutes: [
      {
        path: '/infoView/statisticalList',
        name: '统计名单',
        icon: 'icon-tongji',
        roles: 3,
        exact: true,
        component: InfoView,
      },
    ]
  }
]