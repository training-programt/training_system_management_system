import React, { useState } from 'react';
import { Drawer, Table, Row,Col,Space, Input, Button, Modal, Form, InputNumber, Popconfirm, Divider} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.less'

const Course = () => {
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const role = useSelector(state => state.user.roles);//1是教学领导 2是
  const role = 1
  const courseData = [
    {
      key: '1',
      name: '计算机网络',
      code: '10032',
      type: '选修',
      head: '刘老师',
      unit: '数学与计算机学院',
      flag_fuse:'是'
    },
  ];

  const courseColumns = [
    {
      title: '课程序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '课程名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '课程类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '课程负责人',
      dataIndex: 'head',
      key: 'head',
    },
    {
      title: '开课单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '是否产教融合课程',
      dataIndex: 'flag_fuse',
      key: 'flag_fuse',
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Space>
          <Button type="link" onClick={edit}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={del}>删除</Button>
          </Popconfirm>
          <Button type="link" onClick={showDrawer}>详情查看</Button>
        </Space>
      ),
    },
  ];
  //新增
  const showAdd = () => {
    setVisible(true);
  };
  //编辑
  const edit = () => {
    setVisible(true);
  };
  //详情查看
  const showDrawer = () => {
    setDrawerVisible(true)
  };

  const onClose = () => {
    setDrawerVisible(false)
  };
  //删除
  const del = () => {

  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  if (role == 1) {
    return (
      <div className="insLeader">
        <div className="queryContent">
          <div className="inputContent">
            <Input placeholder="请输入课程名" />
            <Input placeholder="请输入课程编码" />
            <Input placeholder="请输入任课教师" />
          </div>
          <Button type="primary" icon={<SearchOutlined />} >查询</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增</Button>
        </div>
        <Modal
          title="新增专业"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form >
            <Form.Item name={['major', 'name']} label="专业名字" rules={[{ required: true, message: '请输入专业名!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['major', 'code']} label="专业编码" rules={[{ required: true, message: '请输入专业编码!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['major', 'introduce']} label="专业介绍" rules={[{ required: true, message: '请输入专业介绍!' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={['major', 'count']} label="专业人数" rules={[{ required: true, type: 'number', min: 0, max: 1000 }]}>
              <InputNumber />
            </Form.Item>
          </Form>
        </Modal>
        <Table
          dataSource={courseData}
          columns={courseColumns}
        >
        </Table>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={drawerVisible}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            课程信息
          </p>
          <p className="site-description-item-profile-p">基本信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程名字" content="计算机网络" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程编码" content="10032" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程类别" content="选修" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程负责人" content="刘老师" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="开课单位" content="数学与计算机学院" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="是否学位课" content="是" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="考核方式" content="考试" />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">课程学时</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="参考周学时" content="32" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="总学时" content="64" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="理论学时" content="20" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="实践学时" content="24"/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="上机学时" content="0" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="其他学时" content="24"/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="课程介绍"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">其他信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程体系" content={<a>Lin</a>}  />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程性质" content="+86 181 0000 0000" />
            </Col>
          </Row>
          <Row>
          <Col span={12}>
              <DescriptionItem title="课程属性" content={<a>Lin</a>}  />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程分类" content="选修" />
            </Col>
          </Row>
          <Row>
          <Col span={12}>
              <DescriptionItem title="课程开课学期" content="2018-2019"  />
            </Col>
            <Col span={12}>
              <DescriptionItem title="是否产教融合" content="是" />
            </Col>
          </Row>
        </Drawer>
      </div>
    )
  } else if (role == 2) {
    return (
      <div></div>
    )
  }
}
export default Course;