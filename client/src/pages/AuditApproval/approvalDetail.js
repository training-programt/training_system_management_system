import React, { useMemo, useState } from 'react'
import { Form, Input, Select, Radio, Button, InputNumber, Space } from 'antd';
import { Link } from 'react-router-dom'
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';

import "./index.less"


const ApprovalDetail = () => {

  const [form] = Form.useForm();

  const [courseData, setCourseData] = useState([
    {
      _id: '1',
      name: '高等数学1'
    },
    {
      _id: '2',
      name: '高等数学2'
    },
    {
      _id: '3',
      name: '线性代数'
    },
  ]);



  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };

  return (
    <div className="detail-container">
      <div className="header-wrap">
        <div className="header-left">
          新增审批
        </div>
        <div className="header-right">
          <Space size='small'>
            <Link to="/auditApproval/approval" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
            <Button type='primary' icon={<SaveOutlined />}>保存</Button>
          </Space>
        </div>
      </div>

      <div className='body-wrap'>

        <div className='body-left'>
          <div className='box-wrap'>
            <div className='title'>一、基本信息</div>
            <Form
              {...layout}
              form={form}
              name="basic"
            >
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
                >
                  {
                    courseData.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="考核对象"
                name="object"
                rules={[
                  {
                    required: true,
                    message: '考核对象不能为空!',
                  },
                ]}
              >
                <Input allowClear placeholder='请输入考核对象' />
              </Form.Item>
              <Form.Item
                label="考核形式"
                name="form"
                rules={[
                  {
                    required: true,
                    message: '考核形式不能为空!',
                  },
                ]}
              >
                <Radio.Group name="form" defaultValue={1}>
                  <Radio value={1}>考试</Radio>
                  <Radio value={2}>考查</Radio>
                </Radio.Group>
              </Form.Item>
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
                <InputNumber
                  style={{
                    width: 200,
                  }}
                  defaultValue={100}
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />
              </Form.Item>
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
                <InputNumber
                  style={{
                    width: 200,
                  }}
                  defaultValue="1"
                  min="0"
                  max="100"
                  step="0.0001"
                  stringMode
                />
              </Form.Item>


            </Form>

          </div>

          <div className='box-wrap'>
            <div className='title'>三、审批意见</div>
            <Form
              {...layout}
              form={form}
              name="basic"
            >
              <Form.Item
                label="审批意见"
                name="opinion"
              >
                <Input.TextArea
                  placeholder="教研室审批意见"
                  autoSize={{ minRows: 6, maxRows: 8 }}
                  disabled
                />
              </Form.Item>
            </Form>
          </div>

        </div>
        <div className='body-right'>
          <div className='box-wrap'>
            <div className='title'>二、评价标准</div>
            <div>还不知道怎么布局</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApprovalDetail
