import React, { useState, useMemo, useEffect } from 'react'
import { Input, Select, Button, Table, Card, Row, Col, Divider, Space } from 'antd';
import { useLocation,useHistory } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less'

const ShowApproval = () => {
  let id = useLocation().search.slice(4);
  let history = useHistory();
  const [appInfo, setAppInfo] = useState({})
  const [standard, setStandard] = useState([])
  const [rowSpans, setRowSpans] = useState({})

  let requirement = {}
  useEffect(() => {
    React.$axios.get('/getApproval', { _id: id }).then((app) => {
      if (app.isSucceed) {
        setAppInfo(app.data[0])
        app.data[0].standard.forEach(item => {
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
  const columns =useMemo(()=> [
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
          obj.props.rowSpan =  rowSpans[record?.major_requirement]?.span || 0
          console.log(obj.props.rowSpan)
        } else if (appInfo.standard[index]?.major_requirement !== appInfo.standard[index-1]?.major_requirement) {
          obj.props.rowSpan = rowSpans[record?.major_requirement]?.span
          console.log(obj.props.rowSpan)
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
        if(index !== 0 && appInfo.standard[index]?.teaching_goal === appInfo.standard[index - 1]?.teaching_goal) {
          obj.props.rowSpan = 0
        }

        return obj
      }
    },
    {
      title: '评价环节',
      dataIndex: 'assessment',
    },
    {
      title: '评价标准',
      children: [
        {
          title: '优（90-100）',
          dataIndex: 'optimal',
        },
        {
          title: '良（75-89）',
          dataIndex: 'fine',
        },
        {
          title: '中（60-74）',
          dataIndex: 'middle',
        },
        {
          title: '不及格（0-59）',
          dataIndex: 'fail',
        },
      ]
    },
  ],[rowSpans,appInfo]);
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
        <Card title={<div style={{ textAlign: "center" }}>《{appInfo?.course?.course?.name}》课程考核合理性审批表</div>} bordered
          extra={<Button type="primary" onClick={print}>打印</Button>}>
          <Row>
            <Col span={4}>课程基本信息</Col>
            <Col span={20}>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={12}>考核对象</Col>
                    <Col span={12}>{appInfo.inspectionObject}</Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={12}>预计及格率</Col>
                    <Col span={12}>{appInfo.estimatePassRate}</Col></Row>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={12}>考核形式</Col>
                    <Col span={12}>{appInfo.inspectionForm}</Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={12}>预计平均分</Col>
                    <Col span={12}>{appInfo.estimateAverage}</Col> </Row>
                </Col>
              </Row>
              <Row>
                <Col span={4}>考核学生数</Col>
                <Col span={20}>{appInfo.studentNum}</Col>
              </Row>
            </Col>
          </Row>
          <Row className="title1">
            一、评价标准
           </Row>
          <Table
            bordered
            rowKey={record => record._id}
            dataSource={appInfo.standard}
            columns={columns}
            pagination={false}
          />
          <Row>
            <Col span={4}>审查意见</Col>
            <Col span={20}>
              <Row>
                考核内容与课程目标、毕业要求相关性评价
            <Col span={24}>
                  {appInfo.opinion}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      <Divider>结束预览</Divider>
      <Row style={{float:"right"}}>
            <Space direction="horizontal" size="large">
                <Button type="primary" onClick={()=>history.push('/auditApproval/approval')}>返回</Button>
                <Button type="primary" onClick={print}>打印</Button>
                </Space>
            </Row>
    </div >
  )
}

export default ShowApproval
