import React, { useState, useMemo } from 'react';
import { Table, Space, Input, Button, Modal, Form, InputNumber, Popconfirm, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/header'
import { useSelector } from 'react-redux';
import './index.less'
import api from '../../apis/major'

const Major = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // const role = useSelector(state => state.user.roles);//??不会
  const role = 1;
  useMemo(() => {
    const fetchData = async () => {
      const params = {
        name: "",
        code: "",
      }
      setLoading(true);
      const res = await api.getMajorList(params);
      setTableData(res.data);
      setLoading(false);
    }
    fetchData();
  }, [name, code])

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
  if (role == 1) {
    return (
      // 教学领导
      <div className="insLeader">
        <HeaderComponent title="专业管理" />
        <div className="body-wrap">
        <div className="queryContent">
          <div className="inputContent">
            <Input placeholder="请输入专业名" />
            <Input placeholder="请输入专业编码" />
          </div>
          <Button type="primary" icon={<SearchOutlined />} >查询</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增</Button>
        </div>
        <Table
          dataSource={tableData}
          columns={professColumns}
          loading={loading}
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>专业介绍：{record.introduce}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
        >
        </Table>
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
        </div>
      </div>
    )
  } else {
    return (
      // 教研室主任
      <div className="teachDirector">
        <Descriptions
          bordered
          title="教研室主任-专业管理"
          extra={<Button type="primary">编辑</Button>}
        >
          <Descriptions.Item label="专业名字">软件工程</Descriptions.Item>
          <Descriptions.Item label="专业编码">10032</Descriptions.Item>
          <Descriptions.Item label="专业人数">182</Descriptions.Item>
          <Descriptions.Item label="专业介绍">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
      </div>
    )
  }
}

export default Major;