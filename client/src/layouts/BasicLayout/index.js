import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';
import axios from '../../https';
import './index.less';

// const BasicLayout = ({ route, children }) => {
const BasicLayout = () => {

  const isLogin = useSelector(state => state.user.isLogin);
  


  console.log(isLogin)
  return (
    // isLogin
    // ?
    <Layout className='main-layout'>
      <SideMenu />
      {/* <SideMenu routes={route.childRoutes} /> */}
      <Layout className='main-layout-right'>
        <MainHeader />
        <Layout.Content className='main-layout-content'>
          <div className="content-box">
            {/* {children} */}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
    // : <Redirect to='/login' />
  )
}

export default BasicLayout;