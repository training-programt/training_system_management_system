import React, { useState, useMemo, useEffect } from 'react'
import { Input, Select, Table, Button, Card, Row, Col, Space,Divider, message, BackTop } from 'antd';
import { Link, useLocation,useHistory } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less'

const ShowAudit = () => {
    let id = useLocation().search.slice(4);
    let history = useHistory();
    const [rowSpans, setRowSpans] = useState({})
    let requirement = {}
    const [auditInfo, setAuditInfo] = useState({})
    const [achievement, setAchievement] = useState([])
    useEffect(() => {
        React.$axios.get('/getAudit', { _id: id }).then((audit) => {
            if (audit.isSucceed) {
                setAuditInfo(audit.data[0])
                audit.data[0].achievement.forEach(item => {
                    if (!requirement[item.major_requirement]) {
                        requirement[item.major_requirement] = {
                            span: 0,
                            targets: {}
                        }
                    }
                    if (!requirement[item.major_requirement].targets[item.teaching_goal]) {
                        requirement[item.major_requirement].targets[item.teaching_goal] = 1
                    } else {
                        requirement[item.major_requirement].targets[item.teaching_goal]++
                    }
                    requirement[item.major_requirement].span++
                })
                console.log(requirement)
                setRowSpans(requirement)
            }
        })
    }, [])
    const columns = useMemo(() => [
        {
            title: '序号',
            align: 'center',
            fixed: 'center',
            render: (text, record, index) => `${index + 1}`
        },
        {
            title: '毕业要求',
            dataIndex: 'major_requirement',
            width: '10%',
            render: (text, record, index) => {
                const obj = {
                    children: record?.major_requirement,
                    props: {
                        rowSpan: 0
                    },
                }
                if (index === 0) {
                    obj.props.rowSpan = rowSpans[record?.major_requirement]?.span || 0
                } else if (auditInfo.achievement[index]?.major_requirement !== auditInfo.achievement[index - 1]?.major_requirement) {
                    obj.props.rowSpan = rowSpans[record?.major_requirement]?.span
                }
                return obj
            }
        },
        {
            title: '课程目标',
            dataIndex: 'teaching_goal',
            render: (text, record, index) => {
                const obj = {
                    children: record?.teaching_goal,
                    props: {
                        rowSpan: rowSpans[record?.major_requirement]?.targets[record?.teaching_goal]
                    },
                }
                if (index !== 0 && auditInfo?.achievement[index]?.teaching_goal === auditInfo?.achievement[index - 1]?.teaching_goal) {
                    obj.props.rowSpan = 0
                }
                return obj
            }
        },
        {
            title: '考核环节',
            dataIndex: 'assessment',
            render: (text, record) => {
                return record.assessment
            }
        },
        {
            title: '平均得分',
            dataIndex: 'averageScore',
        },
        {
            title: '目标分值',
            dataIndex: 'targetScore',
        },
        {
            title: '考核环节',
            children: [{
                title: '权重系数λ',
                dataIndex: 'weightCoefficient'
            }]
        },
        {
            title: '达成结果',
            dataIndex: 'achieveResult',
        },
    ], [rowSpans, auditInfo]);
    const print = () => {
        const printDiv = document.getElementById('printDiv');
        const iframe = document.createElement('IFRAME');
        let doc = null;
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;')
        document.body.appendChild(iframe);

        doc = iframe.contentWindow.document;
        // 打印时去掉页眉页脚
        doc.write(`
        <link href="../../../../node_modules/antd/dist/antd.css" rel="stylesheet"/>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script src="../../../../node_modules/antd/dist/antd.js"></script>
        <style media="print">@page 
         .title1{
           font-weight: bold; margin: 15px 0px;
           font-size: 14px;
          }
        .ant-card-body .ant-col{
          min-height: 35px;
          border: 1px solid #ccc;
          line-height: 35px;
          text-align: center;
        }
    </style>`);

        doc.write(printDiv.innerHTML);
        doc.close();
        // 获取iframe的焦点，从iframe开始打印
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            //打印完删除iframe
            document.body.removeChild(iframe);
        }
    }
    return (
        <div className="page-container">
            <div id="printDiv" style={{ marginTop: '20px', pageBreakAfter: 'always' }}>
                <Card title={<div style={{ textAlign: "center" }}>《{auditInfo?.course?.course?.name}》课程目标定量达成评价表</div>} bordered
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
                    <Table
                        bordered
                        rowKey={record => record._id}
                        dataSource={auditInfo.achievement}
                        columns={columns}
                        pagination={false}
                    />
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
                            {auditInfo?.teachRoomOpinion?.content}
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
            <Divider>结束预览</Divider>
            <Row style={{float:"right"}}>
            <Space direction="horizontal" size="large">
                <Button type="primary" onClick={()=>history.push('/auditApproval/audit')}>返回</Button>
                <Button type="primary" onClick={print}>打印</Button>
                </Space>
            </Row>
        </div >
    )
}

export default ShowAudit
