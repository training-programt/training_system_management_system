import React, { useMemo, useState } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';
import MainContent from '../MainContent';
import axios from '../../https';
import './index.less';

const BasicLayout = () => {

  const dispatch = useDispatch();
  const [panes, setPanes] = useState([]);
  const [activeMenu, setActiveMenu] = useState('');
  const [menus, setMenus] = useState([]);

  const changeState = obj => {
    setPanes(obj.panes);
    setActiveMenu(obj.activeMenu);
  }

  useMemo(() => {
    const fetchData = async () => {
      const res = await axios.get('/menu')
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
      <SideMenu menus={menus} panes={panes} activeMenu={activeMenu} changeState={changeState} />
      <Layout className='main-layout-right'>
        {/* <MainHeader /> */}
        <Layout.Content className='main-layout-content'>
          {/* <div className="content-box">
            {children}
          </div> */}
          <MainContent style={{height: '100%', width: '100%'}} menus={menus} panes={panes} activeMenu={activeMenu} changeState={changeState} />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout;