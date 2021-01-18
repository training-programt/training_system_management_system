import Menu from "@/pages/Setting/Menu";
import Role from "@/pages/Setting/Role";

export default [
  {
    path: '/setting/menu',
    name: '菜单管理',
    icon: 'icon-major',
    component: Menu,
  },
  {
    path: '/setting/role',
    name: '用户管理',
    icon: 'icon-role',
    component: Role,
  }
]