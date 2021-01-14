import React, { useMemo, useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';
import MainContent from '../MainContent';
import axios from '../../https';
import './index.less';
import { getSession, setSession } from '../../utils';

const BasicLayout = () => {

  const dispatch = useDispatch();
  const [panes, setPanes] = useState([]);
  const [activeMenu, setActiveMenu] = useState('');
  const [menus, setMenus] = useState([]);

  const changeState = obj => {
    setSession('tabs', JSON.stringify(obj))
    // console.log(JSON.parse(getSession('tabs')))
    setPanes(obj.panes);
    setActiveMenu(obj.activeMenu);
  }

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
      const res = await React.$axios.get(`/menu?role=${JSON.parse(getSession('userInfo')).role}`)
      if (res && res.isSucceed) {
        setMenus(res.data)
        dispatch({
          type: 'SET_MENUS',
          menus: res.data
        })
      }
    }
    fetchData();
  }, [])

  return (
    <Layout className='main-layout'>
      <SideMenu
        menus={menus}
        panes={panes}
        activeMenu={activeMenu}
        changeState={changeState} />
      <Layout className='main-layout-right'>
        {/* <MainHeader /> */}
        <Layout.Content className='main-layout-content'>
          {/* <div className="content-box">
            {children}
          </div> */}
          <MainContent 
          style={{ height: '100%', width: '100%' }} 
          menus={menus} 
          panes={panes} 
          activeMenu={activeMenu} 
          changeState={changeState} />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout;