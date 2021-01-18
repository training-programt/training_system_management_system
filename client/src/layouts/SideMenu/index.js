import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import Logo from '../../public/images/logo.png';
import Logo_1 from '../../public/images/logo_1.png';
import './index.less'

const SideMenu = props => {

  const typeColor = useSelector(state => state.user.typeColor);
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const onOpenChange = (openKeys) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys(openKeys)
      return
    }
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys(openKeys)
    } else {
      setOpenKeys(latestOpenKey)
    }
  }

  const renderMenuItem = item => {
    return (
      <Menu.Item key={item.key}>
        <Link to={item.path}>
          <span><i style={styles.icon} className={'iconfont ' + item.icon}></i></span>
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    )
  }

  const renderSubMenu = item => {
    return (
      <Menu.SubMenu key={item.key} title={<span><i style={styles.icon} className={'iconfont ' + item.icon}></i><span>{item.name}</span></span>}>
        {
          item.children && item.children.map(c => {
            return c.children && c.children.length > 0 ? renderSubMenu(c) : renderMenuItem(c)
          })
        }
      </Menu.SubMenu>
    )
  }

  const styles = {
    logo: {
      height: '32px',
      margin: '16px',
      width: '100%'
    },

    img: {
      height: '32px',
    },

    icon: {
      fontWeight: 700,
      marginRight: '12px'
    }
  }

  return (
    <div>
      <Link to="/"> <div style={styles.logo}><img style={styles.img} src={typeColor ? Logo : Logo_1} alt='攀枝花学院' /></div></Link>
      <Menu
        theme={typeColor ? 'light' : 'dark'}
        mode='inline'
        onOpenChange={onOpenChange}
        onClick={({ key }) => setSelectedKeys(key)}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        {
          props.menus && props.menus.map(item => {
            return item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
          })
        }
      </Menu>
    </div>
  )

}

export default withRouter(SideMenu);