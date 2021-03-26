import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Table, Input, Button, Space, Modal, Radio, message, Select, Row, Col, Popconfirm, Form, Typography } from 'antd';

const GoalAndAssessment = () => {
    const [goalAndAssessment, setGoalAndAssessmentData] = useState([]);
    let info = useLocation()?.state?.data;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [requirement, setRequirementData] = useState([]);
    const goal = JSON.parse(localStorage.getItem('teachGoal'));
    const evaluation = JSON.parse(localStorage.getItem('leftList'));
    const [teachGoal, setTeachGoalData] = useState({});
    const [req, setReqData] = useState({});
    const [assessment, setAssessmentData] = useState({})
    const [status, setStatus] = useState([])
    const [radioValue, setRadioValue] = useState("√")
    useEffect(() => {
        const MajorRequirement = React.$axios.get('/getMajorRequirement').then((ma) => {
            setRequirementData(ma.data)
        })
    }, [])
    const columns = [
        {
            title: '课程目标',
            dataIndex: 'teaching_goal',
            width: '25%',
            algin: 'center',
            render: (text, record) => {
                return record.teaching_goal.target_course_name ? record.teaching_goal.target_course_name : ''
            }
        },
        {
            title: '对应毕业要求',
            dataIndex: 'major_requirement',
            width: '25%',
            algin: 'center',
            render: (text, record) => {
                return record.major_requirement.name ? record.major_requirement.name : ''
            }
        },
        {
            title: '评价环节',
            dataIndex: 'assessment',
            algin: 'center',
            width: '40%',
            className: 'assessment',
            render: (text, record) => (
                <>
                    {
                        record.assessment.map((ass, index) => {
                            const count = record.assessment.length;
                            const wid = 100 / count + '%';
                            return (
                                <div key={index} style={{ width: wid, height: '11vh' }}>
                                    <div className="target">{evaluation[index].name}</div>
                                    <div className="target">{evaluation[index].content}</div>
                                    <div>{ass}</div>
                                </div>
                            )
                        })
                    }
                </>
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record, index) => (
                <div>
                    <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
                        <Button type="link" onClick={() => { del(index) }}>删除</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    //新增
    const showAdd = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        const params = {
            teaching_goal: teachGoal,
            major_requirement: req,
            assessment: status,
        }
        setGoalAndAssessmentData([...goalAndAssessment, params]);
        message.success("添加成功")
        localStorage.setItem("goalAndAssessment", JSON.stringify([...goalAndAssessment, params]))
        setVisible(false)
    };
    //删除
    const del = async (index) => {
        let newgoal = [...goalAndAssessment]
        newgoal.splice(index, 1)
        setGoalAndAssessmentData(newgoal)
        localStorage.setItem("goalAndAssessment", JSON.stringify(newgoal))
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const goalChange = (value) => {
        goal.map((item) => {
            if (item.target_course_name == value) {
                setTeachGoalData(item)
            }
        })
    }
    const requirementChange = (value) => {
        requirement.map((item) => {
            if (item._id == value) {
                setReqData(item)
            }
        })
    }
    const changeRadio = (index, value) => {
        let arr = [...status]
        arr[index] = value
        setStatus(arr)
    };
    useEffect(() => {
        if (info) {
            setGoalAndAssessmentData(info.assessmentGoal)
        } else {
            setGoalAndAssessmentData(JSON.parse(localStorage.getItem('goalAndAssessment')) || [])
        }
    }, [])
    return (
        <div className="train-object">
            <div className="object-left">
                <div className="title">课程目标与考核对应关系</div>
                <div className="content-wrap">
                    <Button type="primary" onClick={showAdd}>新增对应关系</Button>
                    <Table
                        bordered
                        dataSource={goalAndAssessment}
                        columns={columns}
                        rowKey={record => record._id}
                    />
                    <Modal
                        visible={visible}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        destroyOnClose
                        title='新增对应关系'
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                取消
              </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                确认
              </Button>
                        ]}
                    >
                        <Space direction="vertical" size="large" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Row>
                                <Col span={4}>
                                    <span>课程目标</span>
                                </Col>
                                <Col span={20}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择课程目标"
                                        allowClear
                                        onChange={(value) => { goalChange(value) }}
                                    >
                                        {goal && goal.map((item, index) => {
                                            return <Select.Option value={item.target_course_name} key={index}>{item.target_course_name}</Select.Option>
                                        })}
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <span>毕业要求</span>
                                </Col>
                                <Col span={20}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="请选择毕业要求"
                                        allowClear
                                        onChange={(value) => { requirementChange(value) }}
                                    >
                                        {requirement && requirement.map(item => {
                                            return <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                </Col>
                            </Row>
                            {evaluation && evaluation.map((item, index) =>
                                <Row key={index}>
                                    <Col span={8}><label>{item.name + ':' + item.content}</label></Col>
                                    <Col span={16}>
                                        {/* <Input onChange={e => { inputChange(index, e.target.value) }} /> */}
                                        <Radio.Group onChange={e => { changeRadio(index, e.target.value) }}>
                                            <Radio value="√">√</Radio>
                                            <Radio value="×">×</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            )}
                        </Space>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default GoalAndAssessment