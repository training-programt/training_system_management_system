import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Menu, Dropdown, Avatar, Badge, message } from 'antd'
import './index.less'
import { UserOutlined, BellFilled } from '@ant-design/icons';

import { useDispatch, useMappedState } from 'redux-react-hook';

const linkLists = [
  // {
  //   path: '/class',
  //   name: '课程管理',
  // },
  // {
  //   path: '/major',
  //   name: '专业管理',
  // }
]

const MainHeader = () => {
  const history = useHistory();
  const mapSate = useCallback(
    (state) => ({
      typeColor: state.user.typeColor
    }),
    [typeColor],
  )

  const { typeColor } = useMappedState(mapSate);
  const dispatch = useDispatch()
  const changeType = (type) => {
    dispatch({
      type: 'CHANGE_TYPE',
      typeColor: type,
    })
  }

  const logout = () => {
    dispatch({
      type: 'LOGIN_FAILED',
      isLogin: false,
      roles: ['001'],
      isLoading: false,
    })
    setTimeout(() => {
      message.success('退出登录')
      history.push('/')
    }, 2000);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to='/userInfo'>
          <div style={{margin: '10px'}}>
            <div><strong>伍涛</strong></div>
            <div style={{fontSize: '12px', color: '#bbb'}}>系统管理员</div>
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
          <span><button onClick={() => changeType(true)} style={{outline: 'none', width: '16px', border: 'none', height: '16px', margin: '0 8px', backgroundColor: 'blue'}}></button></span>
          <span><button onClick={() => changeType(false)} style={{outline: 'none', width: '16px', border: 'none', height: '16px', backgroundColor: 'black'}}></button></span>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <span onClick={logout}>退出登录</span>
      </Menu.Item>
    </Menu> 
  );

  return (
    <Layout.Header className='main-layout-header'>
      <Row type='flex' className='header-content'>
        <Col style={{ flex: 1}}>
          <Link to='/'>
            <span className='nav-items'>我的主页</span>
          </Link>

          { /* 路由tab导航 */ }
          {/* {
            linkLists.map(item => {
              return (
                <Link to={item.path}>
                  <span className='nav-items'>{item.name}</span>
                </Link>
              )
            })
          } */}
          
        </Col>
        <Col style={{marginRight: '-30px'}}>
          <span style={{marginRight: '24px'}}> 
            <Link to='/notification'>
              <Badge count={10} overflowCount={9}>
                <Avatar size="defult" icon={<BellFilled />} style={{backgroundColor: '#fff', color: '#000', border: '1px solid #ccc'}}/>
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

export default MainHeader;