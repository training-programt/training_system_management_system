import React, { useState, useEffect } from 'react'
import { Input, Form, Button, Card, Row, Col, Radio, message, Space } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import './index.less'

const ShowApproval = () => {
  let id = useLocation().search.slice(4);
  const [form] = Form.useForm()
  const history = useHistory();
  const [appInfo, setAppInfo] = useState({})
  const [state, setState] = useState(1)
  useEffect(() => {
    const params = {
      _id: id
    }
    React.$axios.post('/getApprovalById', params).then((app) => {
      if (app.isSucceed) {
        setAppInfo(app.data)
        setState(app.data?.state)
        form.setFieldsValue({
          opinion: app.data.opinion ? app.dat.opinion : '',
          state: app.data.opinion ? app.data.state : 0,
        })
      }
    })
  }, [])

  const handleSubmit = async () => {
    const params = {
      _id: id,
      ...form.getFieldsValue()
    }
    const res = await React.$axios.post('/updateApprovalOpinion', params)
    if (res && res.isSucceed) {
      message.success('审批成功')
      history.replace('/progress/approval')
    }
  }

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
      <div id="printDiv" style={{ pageBreakAfter: 'always' }}>
        <Card title={<div style={{ textAlign: "center" }}>《{appInfo?.course?.course?.name}》课程考核合理性审批表</div>} bordered
          extra={
            <Space size='large'>
              <Link to="/progress/approval" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
              <Button type="primary" onClick={print}>打印</Button>
            </Space>
          }
          bodyStyle={{ padding: '12px 24px' }}
        >
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
          <Row>
            <Col span={4}>毕业要求指标点</Col>
            <Col span={4}>课程目标</Col>
            <Col span={4}>考核环节</Col>
            <Col span={12}>
              评价标准
              <Row>
                <Col span={6}>优(90-100)</Col>
                <Col span={6}>良(75-89)</Col>
                <Col span={6}>中(60-74)</Col>
                <Col span={6}>不及格(0-59)</Col>
              </Row>
            </Col>
          </Row>
          {appInfo?.standard?.map((item, index) => {
            return <Row key={index}>
              <Col span={4}>{item.major_requirement}
              </Col>
              <Col span={4}>{item.teaching_goal}
              </Col>
              <Col span={4}>{item.assessment}
              </Col>
              <Col span={3}>{item.optimal}
              </Col>
              <Col span={3}>{item.fine}
              </Col>
              <Col span={3}>{item.middle}
              </Col>
              <Col span={3}>{item.fail}
              </Col>
            </Row>
          })

          }
          <Row>
            <Col span={4}>审查意见</Col>
            <Col span={20}>
              <Row>
                考核内容与课程目标、毕业要求相关性评价
                <Col span={24}>
                  {
                    appInfo.opinion ?
                      appInfo.opinion :
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
                          <Form.Item name='state'
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
                      )
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      {
        (state == 0) ? (
          <div className='footer-wrap'>
            <Form form={form}>
              <Form.Item>
                <Button icon={<SaveOutlined />} type="primary" htmlType="submit" onClick={handleSubmit}>保存</Button>
              </Form.Item>
            </Form>
          </div>
        ) : null
      }
    </div >
  )
}

export default ShowApproval
