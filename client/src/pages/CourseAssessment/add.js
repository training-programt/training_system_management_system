import React, { useState, useMemo } from 'react'
import { Form, Button, Table, InputNumber, Select, Space } from 'antd';
import { withRouter } from "react-router-dom";
import HeaderComponent from '@/components/header'
import { RollbackOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import api from '@/apis/teachingManagement'
const { Option } = Select;
import './index.less'

const Add = (props) => {

  const [form] = Form.useForm();
  const [courseList, setCourseList] = useState([])
  const [tableData, setTableData] = useState([
    {
      id: '1',
      courseGoal: 1,
      attendance: 8,
      answer_question: 2,
      work_ordinary: 10,
      lab_report: '/',
      online_learning: '/',
      paper: '/',
      end_test: 60,
      hybrid: 20,
    },
    {
      id: '2',
      courseGoal: 2,
      attendance: '/',
      answer_question: 5,
      work_ordinary: 15,
      lab_report: '/',
      online_learning: '/',
      paper: '/',
      end_test: 60,
      hybrid: 20,
    },
    {
      id: '3',
      courseGoal: 3,
      attendance: '/',
      answer_question: 5,
      work_ordinary: 15,
      lab_report: '/',
      online_learning: '/',
      paper: '/',
      end_test: 60,
      hybrid: 20,
    },
    {
      id: '4',
      courseGoal: 4,
      attendance: '/',
      answer_question: 10,
      work_ordinary: 30,
      lab_report: '/',
      online_learning: '/',
      paper: '/',
      end_test: 60,
      hybrid: '/',
    },
  ])

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
  };

  const getCourse = async () => {
    const res = await React.$axios.get(api.getCourse);
    if (res && res.isSucceed) {
      setCourseList(res.data)
    }
  }

  useMemo(() =>
    getCourse()
    , [])

  const columns = [
    {
      title: '课程目标',
      dataIndex: 'courseGoal',
      key: 'courseGoal',
    },
    {
      title: '课程目标考核方式及占比(％)（未考核项目填“/”）',
      children: [
        {
          title: '考勤',
          dataIndex: 'attendance',
          key: 'attendance',
        },
        {
          title: '回答问题',
          dataIndex: 'answer_question',
          key: 'answer_question',
        },
        {
          title: '平时作业',
          dataIndex: 'work_ordinary',
          key: 'work_ordinary',
        },
        {
          title: '实验报告',
          dataIndex: 'lab_report',
          key: 'lab_report',
        },
        {
          title: '在线学习',
          dataIndex: 'online_learning',
          key: 'online_learning',
        },
        {
          title: '论文',
          dataIndex: 'paper',
          key: 'paper',
        },
        {
          title: '末考',
          dataIndex: 'end_test',
          key: 'end_test',
        },
        {
          title: '其他',
          children: [
            {
              title: '混合式教学',
              dataIndex: 'hybrid',
              key: 'hybrid',
            },
            {
              title: '',
              dataIndex: 'selfStudy',
              key: 'selfStudy',
            },
            {
              title: '',
              dataIndex: 'selfStudy',
              key: 'selfStudy',
            },
          ]
        }
      ],
    },
  ];

  const goBack = () => {
    props.history.go(-1)
  }

  const changeCourse = (value) => {
    console.log(value)
  }


  return (
    <div className="page-container">
      <HeaderComponent title="新增课程考核" />
      <div className="body-wrap">
        <div className="top-wrap">
          <Space size='small'>
            <Button icon={<RollbackOutlined />} onClick={goBack}>返回</Button>
            <Button type='primary' icon={<PlusOutlined />}>保存</Button>
            <Button type='primary' icon={<SaveOutlined />}>暂存</Button>
          </Space>
        </div>
        <div className='center-wrap'>
          <Form
            {...layout}
            form={form}
          >
            <Form.Item
              label="选择课程"
              name="course"
              rules={[
                {
                  required: true,
                  message: '课程不能为空!',
                },
              ]}
            >
              <Select
                allowClear
                placeholder="选择课程"
                onChange={changeCourse}
              >
                {
                  courseList.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="成绩构成比例"
              name="rage"
              rules={[
                {
                  required: true,
                  message: '成绩构成比例不能为空!',
                },
              ]}
            >
              <div style={{ display: 'flex' }}>
                <Form.Item
                  label="过程考核"
                  name="process"
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="课内实践"
                  name="practice"
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="末考"
                  name="exam"
                >
                  <InputNumber />
                </Form.Item>

              </div>
            </Form.Item>



          </Form>

        </div>
        <div className="bottom-wrap">
          <Table columns={columns} dataSource={tableData} bordered pagination={false} rowKey="id" />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Add)
