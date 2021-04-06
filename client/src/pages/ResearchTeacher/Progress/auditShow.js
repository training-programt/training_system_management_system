import React, { useState, useMemo, useEffect } from 'react'
import { Input, Form, Button, Card, Row, Col, Radio, message } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import './index.less'

const ShowAudit = () => {
    let id = useLocation().search.slice(4);
    const [form] = Form.useForm()
    const history = useHistory();
    const [auditInfo, setAuditInfo] = useState({})
    useEffect(() => {
        React.$axios.get('/getAudit', { _id: id }).then((audit) => {
            if (audit.isSucceed) {
                setAuditInfo(audit.data[0])
                form.setFieldsValue({
                    opinion: audit.data[0].teachRoomOpinion?.content,
                    teachRoomState: audit.data[0].teachRoomOpinion?.teachRoomState,
                })
            }
        })
    }, [])

    const handleSubmit = async () => {
        const params = {
            _id: id,
            teachRoomState: form.getFieldsValue().teachRoomState,
            teachRoomOpinion: {
                createtime: new Date().getTime(),
                content: form.getFieldsValue().opinion,
            },
        }
        const res = await React.$axios.post('/updateAuditOpinion', params)
        if (res && res.isSucceed) {
            message.success('审批成功')
            history.replace('/progress/examine')
        }
    }

    // const print = () => {
    //     const printDiv = document.getElementById('printDiv');
    //     const iframe = document.createElement('IFRAME');
    //     let doc = null;
    //     iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;')
    //     document.body.appendChild(iframe);

    //     doc = iframe.contentWindow.document;
    //     // 打印时去掉页眉页脚
    //     doc.write(`
    //     <link href="../../../../node_modules/antd/dist/antd.css" rel="stylesheet"/>
    //     <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    //     <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    //     <script src="../../../../node_modules/antd/dist/antd.js"></script>
    //     <style media="print">@page 
    //      .title1{
    //        font-weight: bold; margin: 15px 0px;
    //        font-size: 14px;
    //       }
    //     .ant-card-body .ant-col{
    //       min-height: 35px;
    //       border: 1px solid #ccc;
    //       line-height: 35px;
    //       text-align: center;
    //     }
    // </style>`);

    //     doc.write(printDiv.innerHTML);
    //     doc.close();
    //     // 获取iframe的焦点，从iframe开始打印
    //     iframe.contentWindow.focus();
    //     iframe.contentWindow.print();
    //     if (navigator.userAgent.indexOf("MSIE") > 0) {
    //         //打印完删除iframe
    //         document.body.removeChild(iframe);
    //     }
    // }
    return (
        <div className="page-container">
            <div id="printDiv" style={{ marginTop: '20px', pageBreakAfter: 'always' }}>
                <Card title={<div style={{ textAlign: "center" }}>《{auditInfo?.course?.course?.name}》课程目标定量达成评价表</div>} bordered
                    extra={
                        <>
                            <Link to="/progress/examine" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
                            {/* <Button type="primary" onClick={print}>打印</Button> */}
                        </>
                    }
                    bodyStyle={{ padding: '12px 24px' }}
                >
                    <Row>
                        <Col span={4}>课程编码</Col>
                        <Col span={8}>{auditInfo?.course?.course?.code}</Col>
                        <Col span={4}>课程名称</Col>
                        <Col span={8}>{auditInfo?.course?.course?.name}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>开课学期</Col>
                        <Col span={8}>{auditInfo?.course?.course?.name}</Col>
                        <Col span={4}>课程学分</Col>
                        <Col span={8}>{auditInfo?.course?.course?.credits}</Col>
                    </Row>
                    <Row className="title1">
                        一、定量达成情况
                </Row>
                    <Row>
                        <Col span={4}>毕业要求指标点
                    </Col>
                        <Col span={4}>课程目标
                    </Col>
                        <Col span={4}>考核环节
                    </Col>
                        <Col span={2}>平均得分
                    </Col>
                        <Col span={2}>目标分值
                    </Col>
                        <Col span={4}>
                            <Row><Col span={24}>考核环节</Col></Row>
                            <Row><Col span={24}>权重系数λ</Col></Row>
                        </Col>
                        <Col span={4}>达成成果
                    </Col>
                    </Row>
                    {auditInfo?.achievement?.map((item, index) => {
                        return <Row key={index}>
                            <Col span={4}>{item.major_requirement}
                            </Col>
                            <Col span={4}>{item.teaching_goal}
                            </Col>
                            <Col span={4}>{item.assessment}
                            </Col>
                            <Col span={2}>{item.averageScore}
                            </Col>
                            <Col span={2}>{item.targetScore}
                            </Col>
                            <Col span={4}>
                                {item.weightCoefficient}
                            </Col>
                            <Col span={4}>{item.achieveResult}
                            </Col>
                        </Row>
                    })

                    }
                    <Row>注：期末考核分值原则上总和应为100分（满分）；每个课程目标的考核环节权重系数相加应为1。</Row>
                    <Row className="title1">
                        二、评价审批与反馈
                </Row>
                    <Row>
                        <Col span={24}>
                            {auditInfo.description}
                        </Col>
                    </Row>
                    <Row className="title1">
                        三、教研室意见
                </Row>
                    <Row>
                        <Col span={24}>
                            {auditInfo?.teachRoomOpinion?.content ?
                                (
                                    <>
                                        <div>{auditInfo?.teachRoomOpinion?.content}</div>
                                        <div style={{textAlign: 'right', marginRight: '32px'}}>{auditInfo?.teachRoomOpinion?.createtime}</div>
                                    </>
                                ) :
                                (
                                    <Form form={form} >
                                        <Form.Item name='opinion'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '审批意见不能为空',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                                placeholder='请输入审批意见'
                                                bordered={false}
                                                allowClear
                                            />
                                        </Form.Item>
                                        <Form.Item name='teachRoomState'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请选择是否通过审批',
                                                },
                                            ]}
                                        >
                                            <Radio.Group>
                                                <Radio value={1}>审批通过</Radio>
                                                <Radio value={-1}>审批未通过</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Form>

                                )}
                        </Col>
                    </Row>
                    <Row className="title1">
                        四、学院意见
                </Row>
                    <Row>
                        <Col span={24}>
                            {auditInfo?.collegeOpinion?.content}
                        </Col>
                    </Row>
                </Card>
            </div>
            <div className='footer-wrap'>
                <Form form={form}>
                    <Form.Item>
                        <Button icon={<SaveOutlined />} type="primary" htmlType="submit" onClick={handleSubmit}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}

export default ShowAudit
