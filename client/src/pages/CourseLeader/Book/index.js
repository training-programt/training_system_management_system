import React, { useState, useMemo, useEffect } from 'react';
import { Input, Button, Modal, Card, Form, message, List, Avatar, Skeleton, Popconfirm, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../../components/header'

const Book = () => {
  const [name, setName] = useState('');
  const [form] = Form.useForm();
  const [list, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const res = React.$axios.get('/getBook').then((testData) => {
      setListData(testData.data)
    })
    setLoading(false)
  }, [])
  // 新增
  const showAdd = () => {
    setVisible(true);
    form.resetFields()
  };
  //删除
  const del = async (item) => {
    const params = {
      _id: item._id,
    }
    const res = await React.$axios.post('/delBook', params)
    if (res && res.isSucceed) {
      message.success(res.message);
      const newTest = await React.$axios.get(
        '/getBook'
      )
      setListData(newTest.data);
    } else {
      message.error(res.message);
    }
  };
  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
      const add = await React.$axios.post(
        '/addBook',
        params,
      );
      if (add.isSucceed) {
        message.success(add.message)
        const newTest = await React.$axios.get(
          '/getBook'
        )
        setListData(newTest.data);
      } else {
        message.error(add.message)
      }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="majorInsLeader">
      <HeaderComponent title="建议教材及教学参考书" />
      <div className="body-wrap">
        <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增</Button>
        <List
          size="large"
          loading={loading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item,index) => (
            <List.Item
              actions={[<Button key="list-loadmore-more" type="link" onClick={()=>{del(item)}}>删除</Button>]}
            >
              [{index+1}]{item.name}
            </List.Item>
          )}
        />
        <Modal
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose
          title='新增教学参考'
          width={800}
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
            <Form.Item name="name" label="教学参考" rules={[{ required: true, message: '请输入建议教材或者教学参考书!' }]}>
              <Input.TextArea placeholder="王维虎, 宫婷. 网页设计与开发——HTML、CSS、JavaScript[M]. 人民邮电出版社, 2014." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Book;