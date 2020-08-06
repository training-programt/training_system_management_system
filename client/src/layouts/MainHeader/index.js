import React from 'react'
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Menu, Dropdown, Avatar, Badge, Tabs } from 'antd'
import './index.less'
import { UserOutlined, BellFilled } from '@ant-design/icons';

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
        <span><button style={{margin: '0 8px' , width: '15px', height: '15px', border: 'none', backgroundColor: 'blue'}}></button></span>
        <span><button style={{width: '15px', height: '15px', border: 'none', backgroundColor: 'black'}}></button></span>
      </div>
    </Menu.Item>
    <Menu.Item key="3">
      <span>退出登录</span>
    </Menu.Item>
  </Menu> 
);

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