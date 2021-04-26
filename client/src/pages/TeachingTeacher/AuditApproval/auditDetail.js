import React, { useEffect, useState, useMemo } from 'react'
import { Form, Input, Steps, Select, Radio, Table, message, Modal, Button, Alert, Space, Divider, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import { RollbackOutlined, SaveOutlined ,QuestionCircleOutlined} from '@ant-design/icons';
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
  const [courseData1, setCourseData1] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [standard, setStandard] = useState([]);
  const [titleName, setTitleName] = useState('XXXXXX');
  const [isAchieve, setIsAchieve] = useState(0);//是否达成
  const [courseId, setCourseId] = useState('')
  const [rowSpans, setRowSpans] = useState({});
  const [description, setDescription] = useState('')//课程培养目标说明

  useEffect(() => {
    const params = {
      teacher: JSON.parse(getSession('userInfo'))._id,
    }
    React.$axios.get(`${api.getTeachingInfo}?${React.$qs.stringify(params)}`)
      .then(teach => {
        if (teach.isSucceed) {
          // console.log(teach.data)
          let arr=teach.data.map(item=>{
            return item.course
          })
          // console.log(arr)
          setCourseData(arr);
          setCourseData1(teach.data)
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
        if (index !== 0 && table[index]?.teaching_goal._id === table[index - 1]?.teaching_goal?._id) {
          obj.props.rowSpan = 0
        }

        return obj
      }
    },
    {
      title: '考核环节',
      dataIndex: 'assessment',
      render: (text, record) => {
        return record?.assessment?.name+":"+record?.assessment?.content
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
    // setAchieveResult(form1.getFieldValue("averageScore")/form1.getFieldValue("targetScore"))
    const params = {
      // achieveResult:achieveResult,
      ...form1.getFieldValue(),
    }
    console.log(params)
    let arr = [...table];
    arr[editIndex] = { ...params, ...arr[editIndex] };
    setTableData(arr)
    setShow(false);
  };
  const changeCourseName = (value) => {
    console.log(value)
    setCourseId(value)
    let data = {};
    let sem;
    console.log(courseData)
    console.log(courseData1)
    courseData.map(item => {
      if (item._id == value) {
        setTitleName(item?.course?.name)
        data = item;
      }
    })
    courseData1.map(item=>{
      if(item.course._id==value){
        sem = item.semester.semesterName
      }
    })
    // console.log(data)
    form.setFieldsValue(
      {
        code: data?.course?.code,
        semester: sem,
        credits: data?.course?.credits
      }
    )
  }
  const onChange=(e)=>{
    setIsAchieve(e.target.value)
  }
  const changeDescription=(e)=>{
    setDescription(e.target.value)
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
      _id: courseId,
      description: description,
      isAchievement:isAchieve,
      arr
    }
    console.log(params)
    const res = React.$axios.post("/addAudit",params).then((audit)=>{
      console.log(audit)
      if(audit.isSucceed){
        message.success(aduit.message)
        form.resetFields();
        setTableData(standard);
        setTitleName("XXXXXX");
        setDescription('');
        setIsAchieve(0)
      }else{
        message.error(audit.message)
      }
    })
  }
  const detail=()=>{
    Modal.info({
      title: '评价质量标准',
      content: (
          <div>
              <p>等级一：所有考核环节成绩执行与大纲相符，计算环节准确和达标</p>
              <p>等级二：所有考核环节未覆盖全专业，实际执行与大纲相符，计算环节较准确和达标</p>
              <p>等级三：考核环节采用合理统计抽样数据，实际执行与大纲基本相符，计算环节较准确</p>
              <p>等级四：考核环节采用小样本统计抽样数据，实际执行与大纲存在少量不一致，计算环节基本准确</p>
              <p>等级五：考核环节抽样数据与毕业产出统计无意义，实际执行与大纲存在较多差异，计算环节有一定问题</p>
          </div>
      )
    });
  }
  return (
    <div className="detail-container">
      <div className="header-wrap">
        <div className="header-left">
          新增审核
        </div>
        <div className="header-right">
          <Space size='small'>
            <Link to="/auditApproval/audit" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
            <Button type='primary' icon={<SaveOutlined />} onClick={submit}>保存内容并提交审核</Button>
          </Space>
        </div>
      </div>
      <Alert
      message="填写要求"
      description={
        <div>
          <p>1.平均得分/目标分值=达成结果</p>
          <p>2.每个课程目标的权重系数之和必须为1</p>
          <p>3.保证编写完成之后进行提交审核</p>
        </div>
      }
      type="info"
      showIcon
      closable
    />
      <div className='content-wrap'>
        <Card title={<div style={{ textAlign: "center" }}>《{titleName}》 课程目标定量达成评价表</div>} bordered >
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
                      courseData.map(item => <Select.Option key={item._id} value={item._id} >{item?.course?.name}</Select.Option>)
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
            getContainer={false}
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
                <Input placeholder="平均得分/目标分值" />
              </Form.Item>
            </Form>
          </Modal>
          <Divider></Divider>
          <Row className="title">三、评价审批与反馈</Row>
          <Row><span>课程培养目标说明</span><Button icon={<QuestionCircleOutlined />} type="link" onClick={detail}>评价详情</Button></Row>
          <Row><Input.TextArea rows={5} onChange={(value) => { changeDescription(value) }} /></Row>
          <Divider></Divider>
          <Row className="title">四、是否达成</Row>
          <Row>
            <Radio.Group onChange={onChange} value={isAchieve}>
              <Radio value={0}>未达成</Radio>
              <Radio value={1}>已达成</Radio>
            </Radio.Group>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default AuditDetail
