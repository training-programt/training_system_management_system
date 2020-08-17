import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { useMappedState } from 'redux-react-hook';
import { Redirect } from 'react-router-dom';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';

import './index.less';

const BasicLayout = ({route, children}) => {

  const mapState = useCallback(state => ({
    isLogin: state.user.isLogin,
    roles: state.user.roles,
  }), [isLogin, roles])
  const { isLogin, roles } = useMappedState(mapState);

  return (
    isLogin
    ? 
      <Layout className='main-layout'>
        <SideMenu routes={ route.childRoutes } />
        <Layout className='main-layout-right'>
          <MainHeader />
          <Layout.Content className='main-layout-content'> 
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    : <Redirect to='/login' />
  )  
}

export default BasicLayout;