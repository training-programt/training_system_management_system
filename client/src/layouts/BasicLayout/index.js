import React, { useMemo, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
  const typeColor = useSelector(state => state.user.typeColor);

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

  const style = {
    siderStyle: {
      height: '100vh',
      backgroundColor: typeColor ? '#fff' : '',
      overflow: 'auto'
    }
  }

  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapsed} style={style.siderStyle}><SideMenu menus={menus} />
      </Sider>
      <Layout>
        <MainHeader />
        <Content style={{ height: '80vh', marginTop: '56px' }}>
          <MainContent menus={menus} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout;