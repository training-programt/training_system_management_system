import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button,message } from 'antd';
import { useLocation } from "react-router-dom";
import { SpaceContext } from 'antd/lib/space';
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { getSession,setSession } from '../../../utils';

const { Option } = Select;

const BasicInfo = () => {
    const [form] = Form.useForm();
    let info = useLocation()?.state?.data;
    const [college, setCollegeData] = useState([]);
    const [majorData, setMajorData] = useState([]);
    const [header, setHeaderData] = useState([]);
    const [butType,setButType] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const data = JSON.parse(getSession("newData"));
    let basicInfo = JSON.parse(localStorage.getItem('basic'))

    const [courseName,setCourseName] = useState({})
    const [majorName,setMajorName] = useState({});
    const [unit,setUnitName] = useState({})

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
        const res1 = React.$axios.get('/getTeacher').then((teacherData) => {
            setHeaderData(teacherData.data)
          })
          const res = React.$axios.get('/getCourse').then((courseData) => {
            setCourseData(courseData.data)
          })
    }, [])
    const save = async() => {
        const params = {
            name:courseName,
            unit:unit,
            professional:majorName,
            ...form.getFieldValue(),
        }
        console.log(params)
        localStorage.setItem("basic",JSON.stringify(params));
        message.info('暂存成功')
    }
    const changeCourseName=(value)=>{
        courseData.map((item) => {
            if (item._id == value) {
              setCourseName(item)
              form.setFieldsValue({
                  code:item.code,
                  credits:item.credits,
                  within:item.within,
                  outside:item.outside,
                  computer:item.computer,
                  all:item.all,
              })
            }
          })
        
    }
    const changeMajorName=(value)=>{
        majorData.map((item) => {
            if (item._id == value) {
              setMajorName(item)
            }
          })
    }
    const changeUnitName=(value)=>{
        college.map((item) => {
            if (item._id == value) {
              setUnitName(item)
            }
          })
    }
    useEffect(() => {
        console.log(info)
        if(info){
            form.setFieldsValue(info.course_info)
        }else{
            form.setFieldsValue(basicInfo||{})
        }
    }, [])
    return (
        <div className="page">
            <Form
                {...layout}
                name="init"
                form={form}
            >
                <div className="left">
                    <div className='title'>教学大纲课程基本信息</div>
                    <Form.Item
                        label="课程名字"
                        // name="name"
                        rules={[
                            {
                                required: true,
                                message: '名字不能为空!',
                            },
                        ]}
                    >
                          <Select placeholder="选择课程名字" value={basicInfo?.name?.name} allowClear onChange={(value)=>{changeCourseName(value)}}>
                            {
                                courseData && courseData.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                            }
                        </Select>
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
                        // name="unit"
                        rules={[
                            {
                                required: true,
                                message: '开课单位不能为空!',
                            },
                        ]}
                    >
                        <Select placeholder="开课单位" allowClear value={basicInfo?.unit?.name} onChange={(value)=>{changeUnitName(value)}}>
                            {
                                college && college.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                            }
                        </Select>
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
                        // name="professional"
                        rules={[
                            {
                                required: true,
                                message: '适用专业不能为空!',
                            },
                        ]}
                    >
                        <Select placeholder="适用专业" allowClear value={basicInfo?.professional?.name}  onChange={(value)=>{changeMajorName(value)}}>
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
                </div>
                <div className="right">
                    <div className='title'>先修课程及课程介绍</div>
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
                </div>
            </Form>
            <Button icon={<SaveOutlined />} onClick={save} type="primary" disabled={butType}>暂存信息</Button>
        </div>

    )
}

export default BasicInfo
