import React from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';

import './index.less';

const BasicLayout = ({ route, children }) => {

  const isLogin = useSelector(state => state.user.isLogin);
  return (
    isLogin
      ?
      <Layout className='main-layout'>
        <SideMenu routes={route.childRoutes} />
        <Layout className='main-layout-right'>
          <MainHeader />
          <Layout.Content className='main-layout-content'>
            <div className="content-box">
              {children}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
      : <Redirect to='/login' />
  )
}

export default BasicLayout;