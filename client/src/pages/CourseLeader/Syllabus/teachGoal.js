import React, { useState, useEffect } from 'react'

import { Form, Input, Button, List, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const data1 = []
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 21 },
};

const TeachGoal = () => {

    const [form] = Form.useForm();
    const [showForm, setShowForm] = useState(false);
    const [teachGoal, setTeachGoalDate] = useState([]);
    useEffect(() => {
        const TeachGoal = React.$axios.get('/getTeachGoal').then((goal) => {
            console.log(goal)
            setTeachGoalDate(goal.data)
        })
    }, [])
    const addTeachGoal = async () => {
        const params = {
            ...form.getFieldValue(),
        }
        const res = await React.$axios.post(
            '/addTeachGoal',
            params,
        );
        if (res) {
            message.info(res.message)
            setShowForm(false)
            form.resetFields();
            const newGoal = await React.$axios.get(
                '/getTeachGoal'
            )
            setTeachGoalDate(newGoal.data);
        }
    }
    const delTeachGoal=async(item)=>{
        console.log(item)
        const params = {
            _id: item._id,
          }
          const del = await React.$axios.post('/delTeachGoal', params)
          if (del) {
            message.info(del.message);
            const res = await React.$axios.get(
              '/getTeachGoal',
            )
            setTeachGoalDate(res.data);
          }
    }
    return (
        <div className="train-object">
            <div className="object-left">
                <div className="title">培养目标管理</div>
                <div className="content-wrap">
                    <List
                        itemLayout="horizontal"
                        dataSource={teachGoal}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <Button type="link" size='small' onClick={()=>delTeachGoal(item)}>删除</Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.target_course_name}
                                    description={item.target_course_describe}
                                />
                            </List.Item>
                        )}
                    />
                    <Divider>编辑线</Divider>
                    {
                        showForm ? (
                            <Form form={form} {...layout}>
                                <Form.Item
                                    label="标题"
                                    name='target_course_name'
                                    rules={[{ required: true, message: '标题不能为空' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="描述"
                                    name='target_course_describe'
                                    rules={[{ required: true, message: '描述不能为空' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <Button onClick={addTeachGoal} >添加</Button>
                                <Button onClick={() => setShowForm(false)} >取消</Button>
                            </Form>
                        )
                            : <Button type="dashed" onClick={() => setShowForm(true)} block icon={<PlusOutlined />}>添加具体专业培养目标</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TeachGoal
