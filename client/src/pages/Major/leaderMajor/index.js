import React, { useState, useMemo,useEffect } from 'react';
import { Table, Input, Button, Modal,Card, Form, message,  InputNumber, Popconfirm, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../../components/header'
import { useSelector } from 'react-redux';
import './index.less'

const LeaderMajor = () => {
  const [name, setName] = useState('');
  const [form] = Form.useForm();
  const [majorData, setMajorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [teacherView, setTeacherView] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

useEffect(()=>{
  const res =  React.$axios.get('/getMajor').then((majorData)=>{
    // console.log(majorData)
    // setTeacherView(majorData.data.teachers)
    // let teachers = [];
    // for(let i = 0;i<majorData.data.length;i++){

    // }
    setMajorData(majorData.data)
  })
  setLoading(false)
},[])
  const professColumns = [
    {
      title: '专业名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '专业编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '专业介绍',
      dataIndex: 'introduce',
      key: 'introduce',
      ellipsis: true,
    },
    {
      title: '专业人数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text,record) => (
        <div>
          <Button type="link" onClick={()=>{edit(record)}}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={()=>{del(record)}}>删除</Button>
          </Popconfirm>
          <Button type="link" onClick={()=>{viewTeacher(record)}}>查看教师名单</Button>

        </div>
      ),
    },
  ];
  //新增
  const showAdd = () => {
    setVisible(true);
    form.resetFields()
    setIsEdit(false)
  };
  //编辑
  const edit = (record) => {
    setVisible(true);
    form.resetFields()
    setIsEdit(true)
    let data = {
      _id: record._id,
      name: record.name,
      code: record.code,
      introduce: record.introduce,
      count: record.count,
    }
    form.setFieldsValue(data)
  };
  //删除
  const del = async(record) => {
    const params = {
      _id: record._id,
    }
    const res = await React.$axios.post('/delMajor', params)
    if (res && res.isSucceed) {
      message.success(res.message);
      const newMajor = await React.$axios.get(
        '/getMajor'
      )
      setMajorData(newMajor.data);
    } else {
      message.error(res.message);
    }
  };
  const viewTeacher = async(record)=>{
    Modal.info({
      title: '教师名单',
      content: (
        <div>
          {record.teachers&&record.teachers.map((item,index)=>{
           return <span key={index}>{item.name}</span>
          })}
        </div>
      ),
      onOk() {},
    });
  }
  //查询
  const queryData = async() =>{
    setLoading(true);
    const params = {
      name:name,
    };
    const res = await React.$axios.post('/queryMajor', params);
    setMajorData(res.data)
    setLoading(false)
  }
  const handleOk = async(e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if(!isEdit){
      const add = await React.$axios.post(
        '/addMajor',
        params,
      );
      console.log(add)
      if(add.isSucceed){
        message.success(add.message)
        const newMajor = await React.$axios.get(
          '/getMajor'
        )
        setMajorData(newMajor.data);
      }else{
        message.error(add.message)
      }
    }else if(isEdit){
      const res = await React.$axios.post(
        '/updateMajor',
        params,
      );
      if (res.isSucceed) {
        message.success('新增成功');
        const res = await React.$axios.get(
          '/getMajor'
        )
        setMajorData(res.data);
      } else {
        message.error(res.message);
      }
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
    return (
      <div className="majorInsLeader">
        <HeaderComponent title="专业管理" />
        <div className="body-wrap">
          <div className="queryContent">
            <div className="inputContent">
              <Input type="text" placeholder="请输入专业名或者编码关键字" name="name" onChange={(e => setName(e.target.value))}/>
            </div>
            <Button type="primary" icon={<SearchOutlined />} onClick={queryData}>查询</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增</Button>
          </div>
          <Table
            dataSource={majorData}
            columns={professColumns}
            loading={loading}
            bordered
            rowKey={(record) => record._id}
            expandable={{
              expandedRowRender: record => <p style={{ margin: 0 }}>专业介绍：{record.introduce}</p>,
              rowExpandable: record => record.name !== 'Not Expandable',
            }}
          >
          </Table>
          <Modal
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            destroyOnClose
            title={isEdit ? '编辑专业' : '新增专业'}
            footer={[
              <Button key="back" onClick={handleCancel}>
                取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                确认
              </Button>
            ]}
          >
            <Form form={form}>
              <Form.Item name="name" label="专业名字" rules={[{ required: true, message: '请输入专业名!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="code" label="专业编码" rules={[{ required: true, message: '请输入专业编码!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="introduce" label="专业介绍" rules={[{ required: true, message: '请输入专业介绍!' }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="count" label="专业人数" rules={[{ required: true, type: 'number', min: 0, max: 1000 }]}>
                <InputNumber />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
}

export default LeaderMajor;