import { InfoView } from '@/pages'

export default [
  {
    path: '/infoView',
    name: '信息查看',
    icon: 'icon-show',
    childRoutes: [
      {
        path: '/infoView/statisticalList',
        name: '统计名单',
        icon: 'icon-tongji',
        exact: true,
        component: InfoView,
      },
    ]
  }
]