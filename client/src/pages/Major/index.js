import React from 'react';
import { Table, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Major = () => {

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '专业名字',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '专业编码号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '专业介绍',
      dataIndex: 'introduce',
      key: 'introduce',
    },
    {
      title: '学生人数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '1',
      name: '软件工程',
      code: '10002',
      introduce: '很不错',
      count: 181
    },
    {
      key: '2',
      id: '2',
      name: '网络工程',
      code: '10002',
      introduce: '很贵',
      count: 60
    },
    {
      key: '3',
      id: '3',
      name: '计算机科学',
      code: '10002',
      introduce: '不清楚',
      count: 77
    },
  ];
  return (
    <div className="major">
      <Button type="primary" icon={<PlusOutlined />}>
        新增
      </Button>
      <hr></hr>
      <Table columns={columns} dataSource={data} />
    </div>

  )
}

export default Major;