import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Form, Input, Button, List, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 21 },
};

const TeachGoal = () => {

    const [form] = Form.useForm();
    let info = useLocation()?.state?.data;
    const [showForm, setShowForm] = useState(false);
    const [teachGoal, setTeachGoalDate] = useState([]);
    useEffect(() => {
        // const TeachGoal = React.$axios.get('/getTeachGoal').then((goal) => {
        //     setTeachGoalDate(goal.data)
        // })
    }, [])
    const addTeachGoal = async () => {
        const params = {
            ...form.getFieldValue(),
        }
        setTeachGoalDate([...teachGoal,params]);
            message.info("添加成功")
            setShowForm(false)
            form.resetFields();
            localStorage.setItem("teachGoal",JSON.stringify([...teachGoal,params]))
    }
    const delTeachGoal=async(index)=>{
        let newTeachGoal = [...teachGoal]
        newTeachGoal.splice(index,1)
        setTeachGoalDate(newTeachGoal)
        localStorage.setItem("teachGoal",JSON.stringify(newTeachGoal))
    }
    useEffect(() => {
        if(info){
            setTeachGoalDate(info.teaching_goal)
        }else{
            setTeachGoalDate(JSON.parse(localStorage.getItem('teachGoal'))||[])
        }
    }, [])
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
                                    <Button type="link" size='small' onClick={()=>delTeachGoal(index)}>删除</Button>
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
