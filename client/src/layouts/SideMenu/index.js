import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import Logo from '../../public/images/logo.png';
import Logo_1 from '../../public/images/logo_1.png';

import './index.less'
import { useMappedState } from 'redux-react-hook';

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

  const mapSate = useCallback(state => ({
    typeColor: state.user.typeColor
  }), [typeColor])

  const { typeColor } = useMappedState(mapSate);

  return (
    <Layout.Sider
      className='main-left-slider'
      theme={typeColor ? 'light' : 'dark'}
    >
      <Link to="/">
        <Row type="flex" align="middle" className="main-logo">
          <img className='logo' src={typeColor ? Logo : Logo_1} alt='攀枝花学院' />
        </Row>
      </Link>
      <Menu
        theme={typeColor ? 'light' : 'dark'}
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