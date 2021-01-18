import React, { useEffect } from 'react';
import { Card, Button, Row, Col, Carousel, Skeleton, Switch, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,AntDesignOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../https'
const { Meta } = Card;
const Home = () => {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const btnClick = () => {
    dispatch({
      type: 'SET_USER',
      user: 'admin',
    })
  }
  const contentStyle = {
    height: '450px',
    color: '#fff',
    lineHeight: '450px',
    textAlign: 'center',
    background: '#364d79',
  };


  return (
    <div className="container">

      <Row>
        <Col span={6}>
          <Card title="Card title" bordered={false} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={18}>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>,
      </Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>

      </Row>
    </div>
  )
}

export default Home;