import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Menu, Dropdown, Avatar, Badge, message } from 'antd'
import { UserOutlined, BellFilled, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import './index.less'
import { logout, getSession } from '../../utils';

const MainHeader = () => {
  const [fullScreen, setFullScreen] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()
  const changeType = (type) => {
    dispatch({
      type: 'CHANGE_TYPE',
      typeColor: type,
    })
  }

  const handleLogout = () => {
    logout();
    message.success('退出登录')
    history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to='/userInfo'>
          <div style={{ margin: '10px' }}>
            <div><strong>伍涛</strong></div>
            <div style={{ fontSize: '12px', color: '#bbb' }}>系统管理员</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to='/userInfo'>
          <span>个人中心</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <div>
          <span>主题切换</span>
          <span><button onClick={() => changeType(true)} style={{ outline: 'none', width: '16px', border: 'none', height: '16px', margin: '0 8px', backgroundColor: 'blue' }}></button></span>
          <span><button onClick={() => changeType(false)} style={{ outline: 'none', width: '16px', border: 'none', height: '16px', backgroundColor: 'black' }}></button></span>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <span onClick={handleLogout}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className='main-layout-header'>
      <Row type='flex' className='header-content'>
        <Col className="avatar-content">
          <span>
            <Avatar className="notice" icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} />
          </span>
          <span>
            <Link to='/notification'>
              <Badge count={10} overflowCount={9}>
                <Avatar size="defult" icon={<BellFilled />} className="notice" />
              </Badge>
            </Link>
          </span>
          <Dropdown overlay={menu}>
            <Avatar size="defult" icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default MainHeader