import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { Form, Input, Select, InputNumber } from 'antd';
import api from '@/apis/trainingProject'

const { Option } = Select;

const InitPage = (props, ref) => {

  const [form] = Form.useForm();
  const [majorOption, setMajorOption] = useState([])

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };

  useEffect(() => {
    // const formData = JSON.parse(getSession('training-project-data')) || {}
    // form.setFieldsValue(formData)
    const fetch = async () => {
      const res = await React.$axios.get(api.getMajor)
      setMajorOption(res.data)
    }
    fetch()
    return () => {
      // setSession('training-project-data', form.getFieldValue())
    }
  }, [])



  useImperativeHandle(ref, () => {
    return {
      saveProject() {
        return {
          ...form.getFieldValue(),
        }
      }
    }
  })


  return (
    <div className="init-page">
      <div className="init-left">
        <div className='title'>方案初始数据</div>
        <Form
          {...layout}
          form={form}
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
            <Input allowClear placeholder='请输入培养方案标题' />
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
            <Select
              allowClear
              placeholder="选择专业"
            >
              {
                majorOption.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
              }
            </Select>
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
            <Input allowClear placeholder='请输入年级' />
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
              allowClear
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
              allowClear
              showSearch
              placeholder="选择学制"
            >
              <Option value="1">一年</Option>
              <Option value="2">二年</Option>
              <Option value="3">三年</Option>
              <Option value="4">四年</Option>
              <Option value="5">五年</Option>
              <Option value="6">六年</Option>
              <Option value="7">七年</Option>
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
        <div className='title'>学制、学位、主干学科与课程</div>
        <Form
          {...layout}
          form={form}
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
            <Input allowClear placeholder='请输入主干学科' />
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
            <Input.TextArea allowClear placeholder='专业核心课程' />
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
            <Input.TextArea allowClear placeholder='主要实践性教学环节' />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default forwardRef(InitPage)
