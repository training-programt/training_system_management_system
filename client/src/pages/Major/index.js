import React, { useState, useMemo } from 'react';
import { Table, Input, Button, Modal, Form, InputNumber, Popconfirm, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/header'
import { useSelector } from 'react-redux';
import './index.less'
import api from '../../apis/major'

const Major = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [majorData, setMajorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showSizeChanger,setShowSizeChanger] = useState(true);
  const [showQuickJumper,setShowQuickJumper] = useState(true)
  const [pageSize,setPageSize] = useState(10)
  const [total,setTotal] = useState(80)

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await React.$axios.get('/getMajor');
      console.log(res)
      setMajorData(res.data);
      setLoading(false);
    }
    fetchData();
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
      render: () => (
        <div>
          <Button type="link" onClick={edit}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={del}>删除</Button>
          </Popconfirm>
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
  //分页设置
  const paginationProps = {
    showSizeChanger,//设置每页显示数据条数
    showQuickJumper,
    pageSize,
    total,  //数据的总的条数
    onChange: (current) => changePage(current), //点击当前页码
    onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      onShowSizeChange(current, pageSize)
    }

  }
  const changePage=(current)=>{
    //current参数表示是点击当前的页码，
        // this.getData(current) //向后端发送请求
    }
    const onShowSizeChange=(current, pageSize)=> {
      setPageSize(pageSize)
  }
    return (
      <div className="majorInsLeader">
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
            dataSource={majorData}
            columns={professColumns}
            loading={loading}
            pagination={paginationProps}
            bordered
            rowKey={(record) => record.key}
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
            destroyOnClose
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
  // } else {
  //   return (
  //     // 教研室主任
  //     <div className="teachDirector">
  //       <Descriptions
  //         bordered
  //         title="教研室主任-专业管理"
  //         extra={<Button type="primary">编辑</Button>}
  //       >
  //         <Descriptions.Item label="专业名字">软件工程</Descriptions.Item>
  //         <Descriptions.Item label="专业编码">10032</Descriptions.Item>
  //         <Descriptions.Item label="专业人数">182</Descriptions.Item>
  //         <Descriptions.Item label="专业介绍">
  //           Data disk type: MongoDB
  //           <br />
  //           Database version: 3.4
  //           <br />
  //           Package: dds.mongo.mid
  //           <br />
  //           Storage space: 10 GB
  //           <br />
  //           Replication factor: 3
  //           <br />
  //           Region: East China 1<br />
  //         </Descriptions.Item>
  //       </Descriptions>
  //     </div>
  //   )
  // }
}

export default Major;