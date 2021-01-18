import React, { useMemo, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import SideMenu from '../SideMenu';
import MainContent from '../MainContent';
import './index.less';
import { getSession, setSession } from '@/utils';
import MainHeader from '../MainHeader';
const { Sider, Content } = Layout
const BasicLayout = () => {

  const dispatch = useDispatch();
  const [menus, setMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false)

  // useEffect(() => {
  //   const router = JSON.parse(getSession('tabs'))
  //   console.log(router)

  //   setPanes(router.panes)
  // }, [])
  // useEffect(() => {
  //   if (panes.length === 0) return
  //   console.log(panes,JSON.parse(getSession('tabs')).activeMenu)
  //   setActiveMenu(JSON.parse(getSession('tabs')).activeMenu)

  // }, [panes])

  useMemo(() => {
    const fetchData = async () => {
      const res = await React.$axios.get(`/menu?role=${JSON.parse(getSession('userInfo')).role}`,)
      if (res && res.isSucceed) {
        setSession('userMenu', res.data); // 将菜单存储到sessionStorage
        setMenus(res.data);
        dispatch({
          type: 'SET_MENUS',
          menus: res.data
        })
      }
    }
    fetchData();
  }, [])

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapsed} style={{ height: '100vh' }}><SideMenu menus={menus} />
      </Sider>
      <Layout>
        <MainHeader />
        <Content>
          <MainContent menus={menus} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout;