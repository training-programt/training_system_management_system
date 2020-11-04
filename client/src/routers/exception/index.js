import Exce403 from "../../pages/Exception/403";
import Exce404 from "../../pages/Exception/404";
import Exce500 from "../../pages/Exception/500";

export default [
  {
    path: '/exception',
    roles: 1,
    childRoutes: [
      {
        path: '/exception/403',
        name: '403',
        roles: 1,
        component: Exce403
      },
      {
        path: '/exception/404',
        name: '404',
        roles: 1,
        component: Exce404
      },
      {
        path: '/exception/500',
        name: '500',
        roles: 1,
        component: Exce500
      }
    ]
  }
]
