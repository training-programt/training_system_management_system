import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import {useLocation } from "react-router-dom";

const { Option } = Select;

const BasicInfo = () => {
    const [form] = Form.useForm();
    const data = useLocation().state.data;
    const [college, setCollegeData] = useState([]);
    const [majorData, setMajorData] = useState([]);
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    };
    useEffect(() => {
        const courses = React.$axios.get('/getCollege').then((res) => {
            setCollegeData(res.data)
        })
        const major = React.$axios.get('/getMajor').then((res) => {
            setMajorData(res.data)
        })
        form.resetFields()
        let basic = {
        //   _id: data._id,
          name: data.name,
          code: data.code,
          // header: data.header?data.header.name:"",
          // unit: data.unit?data.unit.name:"",
          type: data.type,
          // semester: data.semester?data.semester.semesterName:"",
          weekly_hours: data.weekly_hours,
          within: data.within,
          credits: data.credits,
          outside: data.outside,
          computer: data.computer,
          other: data.other,
          nature: data.nature,
          attribute: data.attribute,
          category: data.category,
          degree: data.degree,
          direction: data.direction,
          introduce: data.introduce,
          // system:data.system?data.system.name:"",
          course_selection_group: data.course_selection_group,
          assessment_method: data.assessment_method,
          flag_fuse: data.flag_fuse
        }
        form.setFieldsValue(basic)
    }, [])
    return (
        <div className="init-page">
            <div className="init-left">
                <div className='title'>教学大纲课程基本信息</div>
                <Form
                    {...layout}
                    name="basic"
                    form={form}
                >
                    <Form.Item
                        label="课程名字"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '名字不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="英文名字"
                        name="englishName"
                        rules={[
                            {
                                required: true,
                                message: '英文名字不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="开课单位"
                        name="unit"
                        rules={[
                            {
                                required: true,
                                message: '开课单位不能为空!',
                            },
                        ]}
                    >
                        <Select placeholder="开课单位" allowClear>
                            {
                                college && college.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="课程负责人"
                        name="header"
                        rules={[
                            {
                                required: true,
                                message: '课程负责人不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="课程代码"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '课程代码不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="学分"
                        name="credits"
                        rules={[
                            {
                                required: true,
                                message: '学分不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="课程类别"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: '课程类别不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="适用专业"
                        name="professional"
                        rules={[
                            {
                                required: true,
                                message: '适用专业不能为空!',
                            },
                        ]}
                    >
                        <Select placeholder="适用专业" allowClear>
                            {
                                majorData && majorData.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="课内学时"
                        name="within"
                        rules={[
                            {
                                required: true,
                                message: '课内学时不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="课外学时"
                        name="outside"
                        rules={[
                            {
                                required: true,
                                message: '课外学时不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
            <div className="init-right">
                <div className='title'>先修课程及课程介绍</div>
                <Form
                    {...layout}
                    name="basic1"
                >
                    <Form.Item
                        label="先修课程"
                        name="course_ap"
                        rules={[
                            {
                                required: true,
                                message: '先修课程不能为空!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="课程简介"
                        name="introduce"
                        rules={[
                            {
                                required: true,
                                message: '课程简介不能为空!',
                            },
                        ]}
                    >
                        <Input.TextArea autoSize={{ minRows: 20, maxRows: 25 }} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default BasicInfo
