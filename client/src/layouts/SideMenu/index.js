import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import Logo from '../../public/images/logo.png';

import './index.less'

const renderMenuItem = routes => {
  return routes
    .filter(item => item.path && item.name)
    .map(item => {
      if (item.childRoutes !== undefined && !!item.childRoutes.find(child => child.path && child.name)) {
        return (
          <Menu.SubMenu
            key={item.path}
            title={
              <div>
                <span><i className={'menu-icon iconfont ' + item.icon}></i></span>
                <span>{item.name}</span>
              </div>
            }
          >
            {renderMenuItem(item.childRoutes)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>
            <span>
            <span><i className={'menu-icon iconfont ' + item.icon}></i></span>
              <span>{item.name}</span>
            </span>
          </Link> 
        </Menu.Item>
      )
    })
}



const SideMenu = ({routes}) => {

  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = keys => {
    setOpenKeys(keys);
  }
  return (
    <Layout.Sider
      className='main-left-slider'
      theme='light'
    >
      <Link to="/">
        <Row type="flex" align="middle" className="main-logo">
          <img className='logo' src={Logo} alt='攀枝花学院' />
        </Row>
      </Link>
      <Menu
        theme='light'
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {renderMenuItem(routes)}
      </Menu>
    </Layout.Sider>
  )
}

export default SideMenu;