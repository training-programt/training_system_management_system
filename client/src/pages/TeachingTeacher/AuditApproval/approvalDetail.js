import React, { useEffect, useState } from 'react'
import { Form, Input, Steps, Select, Radio, Table, message, Modal, Button, InputNumber, Space, Divider, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import api from '@/apis/teachingList'
import { getSession } from '@/utils'
const { Step } = Steps;
import "./index.less"


const ApprovalDetail = () => {

  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [table, setTableData] = useState([])
  const [show, setShow] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [standard,setStandard] = useState([]);
  const [titleName,setTitleName] = useState('XXXXXX')
  useEffect(() => {
    const params = {
      teacher: JSON.parse(getSession('userInfo'))._id,
    }
    const res = React.$axios.get(`${api.getTeachingInfo}?${React.$qs.stringify(params)}`).then(data => {
      if (data.isSucceed) {
        // console.log(data.data)
        setCourseData(data.data);
      }
    })
    const goalRelation = React.$axios.get('/getGoalAndAssessment').then(goal => {
      // console.log(goal.data)
      setTableData(goal.data)
      setStandard(goal.data)
    })
  }, [])
  const columns = [
    {
      title: '序号',
      align: 'center',
      fixed: 'center',
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: '毕业要求',
      dataIndex: 'major_requirement',
      width: '10%',
      render: (text, record) => {
        return record?.major_requirement?.name
      }
    },
    {
      title: '课程目标',
      dataIndex: 'teaching_goal',
      render: (text, record) => {
        return record?.teaching_goal?.target_course_name
      }
    },
    {
      title: '评价环节',
      dataIndex: 'assessment',
      render: (text, record) => {
        return record?.assessment?.name
      }
    },
    {
      title: '评价标准',
      children: [
        {
          title: '优（90-100）',
          dataIndex: 'optimal',
        },
        {
          title: '良（75-89）',
          dataIndex: 'fine',
        },
        {
          title: '中（60-74）',
          dataIndex: 'middle',
        },
        {
          title: '不及格（0-59）',
          dataIndex: 'fail',
        },
      ]
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record, index) => {
        return (
          <div>
            <Button onClick={() => { edit(record, index) }} type="primary">
              编辑
           </Button>
          </div>
        );
      },
    },
  ];

  const edit = (record, index) => {
    form1.resetFields()
    form1.setFieldsValue({
      major_requirement: record?.major_requirement?.name,
      teaching_goal: record?.teaching_goal?.target_course_name,
      assessment: record?.assessment?.name,
      status: record?.status,
    })
    setEditIndex(index)
    setShow(true)
  }
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };
  const handleCancel = () => {
    setShow(false);
  };
  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form1.getFieldValue(),
    }
    let arr = [...table];
    arr[editIndex] = { ...params, ...arr[editIndex] };
    setTableData(arr)
    setShow(false);
  };
  const changeCourseName=(value)=>{
    console.log(value)
    courseData.map(item=>{
      if(item._id==value){
        setTitleName(item.course.name)
      }
    })
  }
  const submit=()=>{
   let arr =  table.map(item=>{
     return item = {
        major_requirement:item?.major_requirement?.name,
        teaching_goal:item?.teaching_goal?.target_course_name,
        assessment:item?.assessment?.name,
        status:item.status,
        optimal:item.optimal,
        fine:item.fine,
        middle:item.middle,
        fail:item.fail
      }
    })
    const params = {
      ...form.getFieldValue(),
      arr
    }
    console.log(params)
    const res = React.$axios.post("/addApproval",params).then((app)=>{
      console.log(app)
      if(app.isSucceed){
        message.success("数据已提交审核并存入数据库")
        // setTimeout(function(){
        //   history.push('/auditApproval/approval')
        // },1000)
        form.resetFields();
        setTableData(standard);
        setTitleName("XXXXXX")
      }else{
        message.error("提交失败")
      }
    })
  }
  return (
    <div className="detail-container">
      <div className="header-wrap">
        <div className="header-left">
          新增审批
        </div>
        <div className="header-right">
          <Space size='small'>
            <Link to="/auditApproval/approval" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
            <Button type='primary' icon={<SaveOutlined />} onClick={submit}>保存内容并提交审核</Button>
          </Space>
        </div>
      </div>

      <div className='content-wrap'>
  <Card title={<div style={{ textAlign: "center" }}>《{titleName}》 课程考核合理性审批表</div>} bordered >
          <Row className="title">
            一、课程基本信息
      </Row>
          <Form {...layout} form={form} name="basic" >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="考核课程"
                  name="course"
                  rules={[
                    {
                      required: true,
                      message: '考核课程不能为空!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="选择考核课程"
                    onChange={(value)=>{changeCourseName(value)}}
                  >
                    {
                      courseData.map(item => <Select.Option key={item._id} value={item._id} >{item.course.name}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="考核对象"
                  name="inspectionObject"
                  rules={[
                    {
                      required: true,
                      message: '考核对象不能为空!',
                    },
                  ]}
                >
                  <Input allowClear placeholder='请输入考核对象' />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="考核形式"
                  name="inspectionForm"
                  rules={[
                    {
                      required: true,
                      message: '考核形式不能为空!',
                    },
                  ]}
                >
                  <Input allowClear placeholder='请输入考核形式' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="考核学生数"
                  name="studentNum"
                  rules={[
                    {
                      required: true,
                      message: '考核学生数不能为空!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: 200,
                    }}
                    min={1} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>

                <Form.Item
                  label="预计及格率"
                  name="estimatePassRate"
                  rules={[
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]}
                >
                  <Input allowClear placeholder='请输入预计及格率' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="预计平均分"
                  name="estimateAverage"
                  rules={[
                    {
                      required: true,
                      message: '不能为空!',
                    },
                  ]}
                >
                  <Input allowClear placeholder='请输入预计平均分' />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider></Divider>
          <Row className="title">
            二、评价标准
      </Row>
          <Table
            bordered
            rowKey={record => record._id}
            dataSource={table}
            columns={columns}
          />
          <Modal
            title="新增评价标准"
            visible={show}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                确认
              </Button>
            ]}
          >
            <Form {...layout} form={form1} name="relation">
              <Form.Item
                label="毕业要求"
                name="major_requirement"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="课程目标"
                name="teaching_goal"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="评价环节"
                name="assessment"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="优（90-100）"
                name="optimal"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="良（75-89）"
                name="fine"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="中（60-74）"
                name="middle"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="不及格（0-59）"
                name="fail"
              >
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Modal>
          <Divider></Divider>
          {/* <Row>
            <Col span={2} className="title">三、审查意见</Col>
            <Col span={18}>
              <Row>考核内容与课程目标、毕业要求相关性评价</Row>
              <Row><Input.TextArea rows={5} /></Row>
            </Col>
          </Row> */}

        </Card>
      </div>
    </div>
  )
}

export default ApprovalDetail
