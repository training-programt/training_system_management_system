import React from 'react'
import { Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const InitPage = () => {

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };

  return (
    <div className="init-page">
      <div className="init-left">
        <Form
          {...layout}
          name="basic"
        >
          <Form.Item
            label="标题"
            name="name"
            rules={[
              {
                required: true,
                message: '标题不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="专业"
            name="major"
            rules={[
              {
                required: true,
                message: '专业不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="年级"
            name="year"
            rules={[
              {
                required: true,
                message: '年级不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="学位"
            name="degree"
            rules={[
              {
                required: true,
                message: '学位不能为空!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="选择学位"
            >
              <Option value="工学学士">工学学士</Option>
              <Option value="文学学士">文学学士</Option>
              <Option value="理学学士">理学学士</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="学制"
            name="system"
            rules={[
              {
                required: true,
                message: '学制不能为空!',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="选择学制"
            >
              <Option value="一年">一年</Option>
              <Option value="二年">二年</Option>
              <Option value="三年">三年</Option>
              <Option value="四年">四年</Option>
              <Option value="五年">五年</Option>
              <Option value="六年">六年</Option>
              <Option value="七年">七年</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="总学分"
            name="total_credits"
            rules={[
              {
                required: true,
                message: '总学分不能为空!',
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </div>
      <div className="init-right">
        <Form
          {...layout}
          name="basic1"
        >
          <Form.Item
            label="主干学科"
            name="core_disciplines"
            rules={[
              {
                required: true,
                message: '主干学科不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="专业核心课程"
            name="core_curriculum"
            rules={[
              {
                required: true,
                message: '专业核心课程不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="主要实践性教学环节"
            name="practical_teaching_link"
            rules={[
              {
                required: true,
                message: '主要实践性教学环节不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default InitPage
