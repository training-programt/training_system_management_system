import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button, Modal, Form, message, Select, Input, InputNumber, Tabs, Popconfirm, } from 'antd';
const { TabPane } = Tabs;
import HeaderComponent from '../../components/header'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.less'
const Grade = () => {
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [gradeData, setGradeData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [semesterData, setSemesterData] = useState([]);
  const [tab, setTabData] = useState(1);
  const [titles, setTitlesData] = useState('新增年级');
  const [majorData, setMajorData] = useState([]);
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
      dataIndex: 'semesterName',
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
    const major = React.$axios.get('/getMajor').then((res) => {
      setMajorData(res.data)
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
    form1.resetFields()
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
    form1.resetFields()
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
    const params1 = {
      ...form1.getFieldValue(),
    }
    if (!isEdit) {
      if (tab === 1) {
        console.log(tab)
        const addGrade = await React.$axios.post(
          '/addGrade',
          params,
        );
        if (addGrade.isSucceed) {
          message.success(addGrade.message)
          const newGrade = await React.$axios.get(
            '/getGrade'
          )
          setGradeData(newGrade.data);
        } else {
          message.error(addGrade.message)
        }
      } else {
        const addSemester = await React.$axios.post(
          '/addSemester',
          params1,
        );
        if (addSemester.isSucceed) {
          message.success(addSemester.message)
          const newSemester = await React.$axios.get(
            '/getSemester'
          )
          setSemesterData(newSemester.data);
        } else {
          message.error(addSemester.message)
        }
      }
      setVisible(false);
    } else {
      if (tab === 1) {
        console.log(1)
      } else if (tab === 2) {
        console.log(2)
      }
    }
    //  if (isEdit) {
    //   const res = await React.$axios.post(
    //     '/updateMajor',
    //     params,
    //   );
    //   if (res && res.isSucceed) {
    //     message.success(res.message);
    //     const res = await React.$axios.get(
    //       '/getMajor'
    //     )
    //     setMajorData(res.data);
    //   } else {
    //     message.error(res.message);
    //   }
    // }
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
              rowKey={record => record._id}
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
              rowKey={record => record._id}
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
          maskClosable={true}
          getContainer={false}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
              </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              确认
              </Button>
          ]}
        >

          {
            tab === 1 ?
              <Form form={form}>
                <Form.Item name="name" label="年级名字" rules={[{ required: true, message: '请输入年级名!' }]}>
                  <Input placeholder="年级名字" />
                </Form.Item>
                <Form.Item
                  name="studentNumber"
                  label="包含专业"
                  rules={[{ required: true, message: '请选择包含专业!' }]}
                >
                  <Select placeholder="包含专业" allowClear mode="tags">
                    {
                      majorData && majorData.map(item => (<Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>))
                    }
                  </Select>
                </Form.Item>
              </Form>
              :
              <Form form={form1}>
                <Form.Item name="semesterName" label="学期名字" rules={[{ required: true, message: '请输入学期名字!' }]}>
                  <Input />
                </Form.Item>
              </Form>
          }

        </Modal>
      </div>
    </div>
  )
}

export default Grade;