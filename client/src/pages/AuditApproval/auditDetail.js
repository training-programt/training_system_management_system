import React, { useMemo, useState } from 'react'
import { Form, Input, Select, Radio, Button, InputNumber, Space } from 'antd';
import { Link } from 'react-router-dom'
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import api from '@/apis/auditApproval'
import "./index.less"

const AuditDetail = () => {
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

  const getCourseData = async () => {
    const res = await React.$axios.get(api.getCourseData);
    if(res && res.isSucceed ) {
      console.log(res.data)
    }
  }

  useMemo(() => {
    // getCourseData();
  }, [])

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };

  return (
    <div className="detail-container">
      <div className="header-wrap">
        <div className="header-left">
          新增审核
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
                label="课程"
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
                >
                  {
                    courseData.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="是否达成"
                name="reach"
                rules={[
                  {
                    required: true,
                    message: '请选择是否达成!',
                  },
                ]}
              >
                <Radio.Group name="reach" defaultValue={1}>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="课程培养情况说明"
                name="explain"
                rules={[
                  {
                    required: true,
                    message: '课程培养情况说明不能为空!',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="请输入课程培养情况说明"
                  autoSize={{ minRows: 4, maxRows: 8 }}
                />
              </Form.Item>
            </Form>

          </div>
          <div className='box-wrap'>
            <div className='title'>二、定量达成情况</div>
            <div>还不知道怎么布局</div>
          </div>

        </div>
        <div className='body-right'>
          <div className='box-wrap'>
            <div className='title'>三、审核意见</div>
            <div className='opinion-wrap'>
              <div className='opinion-type'>教研室意见：</div>
              <div>我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字</div>
              <div>Tom</div>
              <div>2021年3月1日</div>
            </div>
            <div className='opinion-wrap'>
              <div className='opinion-type'>学院意见：</div>
              <div>我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字我是一段文字</div>
              <div>Tom</div>
              <div>2021年3月1日</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditDetail
