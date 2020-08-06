import React from 'react';
import { Layout } from 'antd';
import SideMenu from '../SideMenu';
import MainHeader from '../MainHeader';

import './index.less';

const BasicLayout = ({route, children}) => {
  return (
    <Layout className='main-layout'>
      <SideMenu routes={ route.childRoutes } />
      <Layout className='main-layout-right'>
        <MainHeader />
        <Layout.Content className='main-layout-content'> 
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )  
}

export default BasicLayout;