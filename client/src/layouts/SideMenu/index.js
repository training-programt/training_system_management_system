import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Logo from '../../public/images/logo.png';
import Logo_1 from '../../public/images/logo_1.png';
import './index.less'
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../https';

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
          <Link to={item.path} replace>
            <span>
              <span><i className={'menu-icon iconfont ' + item.icon}></i></span>
              <span>{item.name}</span>
            </span>
          </Link>
        </Menu.Item>

      )
    })
}

// const addPane = (item) => {
//   const panes = this.props.panes.slice();
//   const activeMenu = item.key;
//   //如果标签页不存在就添加一个
//   if (!panes.find(i => i.key === activeMenu)) {
//     panes.push({
//       name: item.name,
//       key: item.key,
//       content: tabs[item.key] || item.name
//     })
//   }
//   this.props.onChangeState({
//     panes,
//     activeMenu
//   });
// };

const renderMenu = menus => {
  console.log(menus)
  if (Array.isArray(menus)) {
    return menus.map(item => {
      if (!item.children || !item.children.length) {
        return (
          <Menu.Item key={item.key || item.name}>
            {/* <div onClick={() => addPane(item)}> */}
            <div>
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
            {renderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
    })
  }
}

const SideMenu = () => {
  // const SideMenu = ({ routes }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const typeColor = useSelector(state => state.user.typeColor);
  let menus;
  const dispatch = useDispatch();

  useMemo(() => {
    const fetchData = async () => {
      const res = await axios.get('/menu')
      // dispatch({
      //   type: 'SET_MENUS',
      //   menus: res.data
      // })
      menus = res.data
    }
    fetchData();
  }, [])

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
        openKeys={openKeys}
        onOpenChange={keys => setOpenKeys(keys)}
      >
        {renderMenu(menus)}
        {/* {renderMenuItem(routes)} */}
      </Menu>
    </Layout.Sider>
  )

}

export default SideMenu;