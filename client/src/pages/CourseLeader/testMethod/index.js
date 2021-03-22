import React, { useState, useMemo,useEffect } from 'react';
import { Table, Input, Button, Modal,Card, Form, message,  InputNumber, Popconfirm, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../../components/header'

const testMethod = () => {
  const [name, setName] = useState('');
  const [form] = Form.useForm();
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [teacherView, setTeacherView] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

useEffect(()=>{
  const res =  React.$axios.get('/getTestMethod').then((testData)=>{
    setTestData(testData.data)
  })
  setLoading(false)
},[])
  const professColumns = [
    { title: '序号', align: 'center', fixed: 'left', render: (text, record, index) => `${index + 1}` },
    {
      title: '考核名字',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'content',
      align: 'center',
    },
    {
      title: '占比',
      dataIndex: 'account',
      align: 'center',
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
      content: record.content,
      account:record.account
    }
    form.setFieldsValue(data)
  };
  //删除
  const del = async(record) => {
    const params = {
      _id: record._id,
    }
    const res = await React.$axios.post('/delTestMethod', params)
    if (res && res.isSucceed) {
      message.success(res.message);
      const newTest = await React.$axios.get(
        '/getTestMethod'
      )
      setTestData(newTest.data);
    } else {
      message.error(res.message);
    }
  };
  const handleOk = async(e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if(!isEdit){
      const add = await React.$axios.post(
        '/addTestMethod',
        params,
      );
      console.log(add)
      if(add.isSucceed){
        message.success(add.message)
        const newTest = await React.$axios.get(
          '/getTestMethod'
        )
        setTestData(newTest.data);
      }else{
        message.error(add.message)
      }
    }else if(isEdit){
      const res = await React.$axios.post(
        '/updateTestMethod',
        params,
      );
      if (res.isSucceed) {
        message.success(res.message);
        const res = await React.$axios.get(
          '/getTestMethod'
        )
        setTestData(res.data);
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
        <HeaderComponent title="考核环节管理" />
        <div className="body-wrap">
          <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增</Button>
          <Table
            dataSource={testData}
            columns={professColumns}
            loading={loading}
            bordered
            rowKey={(record) => record._id}
          >
          </Table>
          <Modal
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            destroyOnClose
            title={isEdit ? '编辑考核环节' : '新增考核环节'}
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
              <Form.Item name="name" label="考核环节名字" rules={[{ required: true, message: '请输入环节名字!' }]}>
                <Input placeholder="评价环节1"/>
              </Form.Item>
              <Form.Item name="content" label="考核内容" rules={[{ required: true, message: '请输入考核内容!' }]}>
                <Input placeholder="在线自测"/>
              </Form.Item>
              <Form.Item name="account" label="占比" rules={[{ required: true, message: '请输入占比!' }]}>
                <Input placeholder="例：10%" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
}

export default testMethod;