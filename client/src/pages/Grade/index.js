import React, { useState } from 'react';
import { Table, Card,Space, Input, Button, Modal, Form, InputNumber, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'

const Grade = () => {
    const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const role = useSelector(state => state.user.roles);
  const role = 1
  const professData = [
    {
      key: '1',
      name: '软件工程',
      code: '10032',
      introduce: '嘿嘿嘿嘿嘿嘿嘿',
      count: 182
    },
    {
      key: '2',
      name: '计算机科学与技术',
      code: '10033',
      introduce: '哈哈哈哈哈哈哈哈哈',
      count: 88
    },
  ];

  const professColumns = [
    {
      title: '专业序号',
      dataIndex: 'key',
      key: 'key',
    },
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
      render: () => (
        <Space size="middle">
          <Button type="link" onClick={edit}>Edit</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={del}>Delete</Button>
          </Popconfirm>
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
    return (
        <Card
            title='年级管理'
        >
        </Card>
    )
}

export default Grade;