import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import { useSelector } from 'react-redux';
import Logo from '../../public/images/logo.png';
import Logo_1 from '../../public/images/logo_1.png';
import './index.less'
import tabs from '../tabs'

const SideMenu = props => {

  const typeColor = useSelector(state => state.user.typeColor);
  // let menus = useSelector(state => state.menu);

  const addPane = item => {
    const panes = props.panes.slice();
    const activeMenu = item.key;
    //如果标签页不存在就添加一个
    if (!panes.find(i => i.key === activeMenu)) {
      panes.push({
        name: item.name,
        key: item.key,
        content: tabs[item.key] || item.name
      })
    }
    props.changeState({
      panes,
      activeMenu
    });
  };
  
  const renderMenuItem = menus => {
    if (Array.isArray(menus)) {
      return menus.map(item => {
        if (!item.children || !item.children.length) {
          return (
            <Menu.Item key={item.key || item.name}>
              <div onClick={() => addPane(item)}>
              {/* <div> */}
                <span><i className={'menu-icon iconfont ' + item.icon}></i></span>
                <span>{item.name}</span>
              </div>
            </Menu.Item>
          )
        } else {
          return (
            <Menu.SubMenu
              key={item.key}
              title={
                <div>
                  <span><i className={'menu-icon iconfont ' + item.icon}></i></span>
                  <span>{item.name}</span>
                </div>
              }
            >
              {renderMenuItem(item.children)}
            </Menu.SubMenu>
          )
        }
      })
    }
  }
  
  return (
    <Layout.Sider
      className='main-left-slider'
      theme={typeColor ? 'light' : 'dark'}
    >
      <Link to="/home">
        <Row type="flex" align="middle" className="main-logo">
          <img className='logo' src={typeColor ? Logo : Logo_1} alt='攀枝花学院' />
        </Row>
      </Link>
      <Menu
        theme={typeColor ? 'light' : 'dark'}
        mode='inline'
        // openKeys={openKeys}
        selectedKeys={props.activeMenu}
      >
        {renderMenuItem(props.menus)}
      </Menu>
    </Layout.Sider>
  )

}

export default SideMenu;