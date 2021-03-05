import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Modal, Form, message, Input, InputNumber, Tabs, Popconfirm, } from 'antd';
const { TabPane } = Tabs;
import HeaderComponent from '../../components/header'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.less'
const Grade = () => {
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [gradeData, setGradeData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [semesterData, setSemesterData] = useState([]);
  const [tab, setTabData] = useState(1);
  const [titles, setTitlesData] = useState('新增年级');

  const gradeColumns = [
    { title: '序号', align: 'center', fixed: 'left', render: (text, record, index) => `${index + 1}` },
    {
      title: '年级名字',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '年级人数',
      dataIndex: 'studentNumber',
      align: 'center',
      render: (text, record) => {
        let count = 0;
        for (let i = 0; i < record.studentNumber.length; i++) {
          count += record.studentNumber[i].count
        }
        return count
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => editGrade(record)}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={() => delGrade(record)}>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const semesterColumns = [
    { title: '序号', align: 'center', fixed: 'left', render: (text, record, index) => `${index + 1}` },
    {
      title: '学期名字',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => editSemester(record)}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={() => delSemester(record)}>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true)
    const res = React.$axios.get('/getGrade').then((gradeData) => {
      setGradeData(gradeData.data)
    })
    const res1 = React.$axios.get('/getSemester').then((semesterData) => {
      setSemesterData(semesterData.data);
    })
    setLoading(false)
  }, [])


  const addGrade = () => {
    setVisible(true);
    form.resetFields()
    setTitlesData('新增年级')
    setIsEdit(false)
  }
  const addSemester = () => {
    setVisible(true);
    form.resetFields()
    setTitlesData('新增学期')
    setIsEdit(false)
  }
  //编辑
  const editGrade = (record) => {
    setVisible(true);
    setTitlesData('编辑年级')
    form.resetFields()
    setIsEdit(true)
  };
  const editSemester = (record) => {
    setTitlesData('编辑学期')
    setVisible(true);
    setVisible(true);

  };
  const delGrade = () => {
  };
  const delSemester = () => {
  };
  const callback = (key) => {
    setTabData(key);
  }
  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      const add = await React.$axios.post(
        '/addMajor',
        params,
      );
      console.log(add)
      if (add.isSucceed) {
        message.success(add.message)
        const newMajor = await React.$axios.get(
          '/getMajor'
        )
        setMajorData(newMajor.data);
      } else {
        message.error(add.message)
      }
    } else if (isEdit) {
      const res = await React.$axios.post(
        '/updateMajor',
        params,
      );
      if (res && res.isSucceed) {
        message.success(res.message);
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
    <div className="gradeInsLeader">
      <HeaderComponent title="年级管理" />
      <div className="body-wrap">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="年级管理" key="1">
            <Button type="primary" icon={<PlusOutlined />} onClick={addGrade}>新增年级</Button>
            <Table
              dataSource={gradeData}
              columns={gradeColumns}
              loading={loading}
              bordered
            >
            </Table>
          </TabPane>
          <TabPane tab="学期管理" key="2">
            <Button type="primary" icon={<PlusOutlined />} onClick={addSemester}>新增学期</Button>
            <Table
              dataSource={semesterData}
              columns={semesterColumns}
              loading={loading}
              bordered
            >
            </Table>
          </TabPane>
        </Tabs>
        <Modal
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose
          title={titles}
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
            <Form.Item name="name" label="年级名字" rules={[{ required: true, message: '请输入年级名!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="学期名字" rules={[{ required: true, message: '请输入学期名字!' }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Grade;