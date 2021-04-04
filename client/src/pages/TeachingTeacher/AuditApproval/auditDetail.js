import React, { useEffect, useState, useMemo } from 'react'
import { Form, Input, Steps, Select, Radio, Table, message, Modal, Button, InputNumber, Space, Divider, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import api from '@/apis/teachingList'
import { getSession } from '@/utils'
const { Step } = Steps;
import "./index.less"


const AuditDetail = () => {

  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [table, setTableData] = useState([])
  const [show, setShow] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [standard, setStandard] = useState([]);
  const [titleName, setTitleName] = useState('XXXXXX');
  // const [achievement, setAchievement] = useState('');
  const [rowSpans, setRowSpans] = useState({})
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
      let requirement = {}
      goal.data.forEach(item => {
        if (!requirement[item.major_requirement._id]) {
          requirement[item.major_requirement._id] = {
            span: 0,
            targets: {}
          }
        }
        if (!requirement[item.major_requirement._id].targets[item.teaching_goal._id]) {
          requirement[item.major_requirement._id].targets[item.teaching_goal._id] = 1
        } else {
          requirement[item.major_requirement._id].targets[item.teaching_goal._id]++
        }
        requirement[item.major_requirement._id].span++
      })
      setRowSpans(requirement)
      setTableData(goal.data)
      setStandard(goal.data)
    })
  }, [])
  const columns = useMemo(() => [
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
      render: (text, record, index) => {
        const obj = {
          children: record?.major_requirement?.name,
          props: {
            rowSpan: 0
          },
        }
        if (index === 0) {
          obj.props.rowSpan = rowSpans[record?.major_requirement?._id]?.span || 0
        } else if (table[index]?.major_requirement?._id !== table[index - 1]?.major_requirement?._id) {
          obj.props.rowSpan = rowSpans[record?.major_requirement?._id]?.span
        }
        return obj
      }
    },
    {
      title: '课程目标',
      dataIndex: 'teaching_goal',
      render: (text, record, index) => {
        const obj = {
          children: record?.teaching_goal?.target_course_name,
          props: {
            rowSpan: rowSpans[record?.major_requirement?._id].targets[record?.teaching_goal._id]
          },
        }
        if(index !== 0 && table[index]?.teaching_goal._id === table[index - 1]?.teaching_goal?._id) {
          obj.props.rowSpan = 0
        }

        return obj
      }
    },
    {
      title: '考核环节',
      dataIndex: 'assessment',
      render: (text, record) => {
        return record?.assessment?.name
      }
    },
    {
      title: '平均得分',
      dataIndex: 'averageScore',
    },
    {
      title: '目标分值',
      dataIndex: 'targetScore',
    },
    {
      title: '考核环节',
      children: [{
        title: '权重系数λ',
        dataIndex: 'weightCoefficient'
      }]
    },
    {
      title: '达成结果',
      dataIndex: 'achieveResult',
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
  ], [rowSpans, table]);

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
    let result = form1.getFieldValue("averageScore")/form1.getFieldValue("targetScore")
    // console.log(form1.setFields())
    // form1.setFieldsValue({achieveResult:result})
  };
  const changeCourseName = (value) => {
    // console.log(value)
    let data = {};
    courseData.map(item => {
      if (item._id == value) {
        setTitleName(item.course.name)
        data = item;
      }
    })
    // console.log(data)
    form.setFieldsValue(
      {
        code: data?.course?.code,
        semester: data?.semester?.semesterName,
        credits: data?.course?.credits
      }
    )
  }
  const submit = () => {
    let arr = table.map(item => {
      return item = {
        major_requirement: item?.major_requirement?.name,
        teaching_goal: item?.teaching_goal?.target_course_name,
        assessment: item?.assessment?.name,
        status: item.status,
        averageScore: item.averageScore,
        targetScore: item.targetScore,
        weightCoefficient: item.weightCoefficient,
        achieveResult: item.achieveResult
      }
    })
    const params = {
      ...form.getFieldValue(),
      arr
    }
    console.log(params)
    // const res = React.$axios.post("/addAudit",params).then((audit)=>{
    //   console.log(audit)
    //   if(audit.isSucceed){
    //     message.success("数据已提交审核并存入数据库")
    //     form.resetFields();
    //     setTableData(standard);
    //     setTitleName("XXXXXX")
    //   }else{
    //     message.error("提交失败")
    //   }
    // })
  }
  return (
    <div className="detail-container">
      <div className="header-wrap">
        <div className="header-left">
          新增审核
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
                    onChange={(value) => { changeCourseName(value) }}
                  >
                    {
                      courseData.map(item => <Select.Option key={item._id} value={item._id} >{item.course.name}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="课程编码"
                  name="code"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="开课学期"
                  name="semester"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="课程学分"
                  name="credits"
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider></Divider>
          <Row className="title">
            二、定量达成情况
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
            getContainer={false}
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
                label="平均得分"
                name="averageScore"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="目标分值"
                name="targetScore"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="权重系数λ"
                name="weightCoefficient"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="达成结果"
                name="achieveResult"
              >
                <Input disabled />
              </Form.Item>
            </Form>
          </Modal>
          <Divider></Divider>
          <Row className="title">三、评价审批与反馈</Row>
          <Row>课程培养目标说明</Row>
          <Row><Input.TextArea rows={5} /></Row>
        </Card>
      </div>
    </div>
  )
}

export default AuditDetail
