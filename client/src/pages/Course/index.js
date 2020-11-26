import React, { useState, useMemo } from 'react';
import { Drawer, Table, Row, Col, Input, Button, Modal, Form, InputNumber, Popconfirm, Divider } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/header'

import { useSelector } from 'react-redux';
import './index.less'
import api from '../../apis/course'


const Course = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData,setdrawerData] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const courseColumns = [
    {
      title: '序号',
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
      render: text => text == true ? '是' : '否'
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text,record) => (
        <div>
          <Button type="link" onClick={edit}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={del}>删除</Button>
          </Popconfirm>
          <Button type="link" onClick={()=>{showDrawer(record)}}>详情查看</Button>
        </div>
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
  const showDrawer = (record) => {
    // console.log(record)
    setdrawerData(record)
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
  useMemo(() => {
    const fetchData = async () => {
      const params = {
        name: "",
        code: "",
      }
      setLoading(true);
      const res = await api.getCourseList(params);
      setCourseData(res.data);
      // console.log(res.data)
      setLoading(false);
    }
    fetchData();
  }, [name, code])

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  return (
    <div className="courseInsLeader">
      <HeaderComponent title="课程管理" />
      <div className="body-wrap">
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
          bordered
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
              <DescriptionItem title="课程名字" content={drawerData.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程编码" content={drawerData.code} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程类别" content={drawerData.type} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程负责人" content={drawerData.head} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="开课单位" content={drawerData.unit} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="是否学位课" content={drawerData.name} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="考核方式" content={drawerData.method==1?"考核":"考查"} />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">课程学时</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="参考周学时" content={drawerData.weekly_hours} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="总学时" content={drawerData.total} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="理论学时" content={drawerData.within} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="实践学时" content={drawerData.outside} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="上机学时" content={drawerData.computer} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="其他学时" content={drawerData.other} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="课程介绍"
                content={drawerData.introduce}
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">其他信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程体系" content={drawerData.system} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程性质" content={drawerData.attribute} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程属性" content={drawerData.category} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程分类" content={drawerData.category} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程开课学期" content={drawerData.semester} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="是否产教融合" content={drawerData.flag_fuse} />
            </Col>
          </Row>
        </Drawer>
      </div>
    </div>
  )
}
export default Course;