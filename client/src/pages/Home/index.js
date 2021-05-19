import React, { useEffect } from 'react';
import { Card, Button, Row, Col, Carousel, Alert, Checkbox, Tag, Progress, List } from 'antd';
import { UnorderedListOutlined, CommentOutlined, FormOutlined, CloudServerOutlined, HeartTwoTone, InfoOutlined, ContactsTwoTone, GlobalOutlined, EditOutlined, EllipsisOutlined, CloudTwoTone, MessageTwoTone, SettingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../https'
import First from '../../public/images/first.jpg';
import Second from '../../public/images/second.jpg';
import Three from '../../public/images/three.jpg';
import Four from '../../public/images/four.jpg';
import './index.less'

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
    height: '470px',
    width: '100%',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
  };

  const leftCard = {
    margin: '15px',
  }

  return (
    <div className="container">
      <Row>
        <Col span={6}>
          <Card title="基于工程教育认证的过程管理系统" bordered={false} extra={<a href="#"> <FormOutlined /></a>} height={500}>
            <div icon={<FormOutlined />} style={leftCard}>
              <Alert
                message="React-hooks"
                description="优秀的共享状态逻辑的能力，函数式组件"
                type="info"
                action={
                  <Button size="small" type="text" icon={<UnorderedListOutlined />} >
                  </Button>
                }
              />
            </div>
            <div style={leftCard}>
              <Alert
                message="Ant Design"
                description="基于自然、确定性、意义感、生长性四大设计价值观，模块化解决方案,快速产出高质量产品原型。"
                type="info"
                action={
                  <Button size="small" type="text" icon={<CommentOutlined />} >
                  </Button>
                }
              />
            </div>
            <div style={leftCard}>
              <Alert
                message="Egg"
                description="企业级 Node框架,专注于企业级框架和应用而生."
                type="info"
                action={
                  <Button size="small" type="text" icon={<CloudServerOutlined />} >
                  </Button>
                }
              />
            </div>
            <div style={leftCard}>
              <Alert
                message="MongoDB"
                description="基于分布式文件存储的数据库."
                type="info"
                action={
                  <Button size="small" type="text" icon={<GlobalOutlined />} >
                  </Button>
                }
              />
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>
                <img
                  src={First}
                  width="100%"
                  height="100%"
                  alt="logo"
                />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img
                  src={Second}
                  width="100%"
                  height="100%"
                  alt="logo"
                />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img
                  src={Three}
                  width="100%"
                  height="100%"
                  alt="logo"
                />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img
                  src={Four}
                  width="100%"
                  height="100%"
                  alt="logo"
                />
              </h3>
            </div>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Card
            title="攀大讲堂"
            bordered={false}
            extra={<a href="#"><InfoOutlined /></a>}
          >
            <div className="classRoom"> <Checkbox>【博学讲堂】我们身边的知识产权</Checkbox><Tag color="green">进行中</Tag></div>
            <div className="classRoom"> <Checkbox>【博学讲堂】深入贯彻习近平新闻舆论思想</Checkbox><Tag color="cyan">准备中</Tag></div>
            <div className="classRoom"> <Checkbox>【博学讲堂】一类变时间阶分数阶扩散方程</Checkbox><Tag color="purple">已完成</Tag></div>
            <div className="classRoom"> <Checkbox>【博学讲堂】工业软件发展趋势及经验分享</Checkbox><Tag color="gold">成功</Tag></div>
            <div className="classRoom"> <Checkbox>【博学讲堂】大学生创新创业比赛</Checkbox><Tag color="orange">得到认可的</Tag></div>
            <div className="classRoom"> <Checkbox>【博学讲堂】永筑爱国精神长城</Checkbox><Tag color="red">可观看</Tag></div>

          </Card>
        </Col>
        <Col span={8}>
          <Card title="系统技术占比" bordered={false} extra={<a href="#"> <FormOutlined /></a>}>
            <div className="account">
              <div>
              <div className="circle"> <Progress type="circle" percent={80} /><span>React_hooks</span></div>
              <div className="circle"> <Progress type="circle" percent={20} /><span>Ant Design</span></div>
              </div>
              <div>
              <div className="circle"> <Progress type="circle" percent={75} /><span>Egg</span></div>
              <div className="circle"> <Progress type="circle" percent={50} /><span>MongoDB</span></div>
              </div>
            </div>

          </Card>
        </Col>
        <Col span={8}>
          <Card title="联系我们" bordered={false} extra={<a href="#"> <CommentOutlined /></a>}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              size="large"
            >
              <List.Item
                actions={[<a href="https://github.com/training-programt/training_system_management_system" target="_blank">Git</a>]}
              >
                <h3><MessageTwoTone />&nbsp;&nbsp;GitHub源码</h3>
              </List.Item>
              <List.Item
                actions={[<a href="http://www.pzhuweb.cn" target="_blank">web应用专业团队</a>]}
              >
                <h3><HeartTwoTone />&nbsp;&nbsp;团队官网</h3>
              </List.Item>
              <List.Item
                actions={[<Button type="text">gouyuqing@aliyun.com</Button>]}
              >
                <h3><CloudTwoTone />&nbsp;&nbsp;阿里云邮箱</h3>
              </List.Item>
              <List.Item
                actions={[<Button type="text">3319948815@qq.com</Button>]}
              >
                <h3><ContactsTwoTone /> &nbsp;&nbsp;qq邮箱</h3>
              </List.Item>
              <List.Item
                actions={[<a href="http://www.pzhu.edu.cn/">学校官网</a>]}
              >
                <h3><ContactsTwoTone /> &nbsp;&nbsp;攀枝花学院</h3>
              </List.Item>
            </List>
          </Card>
        </Col>

      </Row>
    </div>
  )
}

export default Home;