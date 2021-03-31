import React, { useState, forwardRef, useEffect } from 'react'
// import FileViewer from 'react-file-viewer';
import { useLocation } from "react-router-dom";
import { Form, Input, Card, Row, Col, Select, Table, Button, List, Divider, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getSession, setSession } from '../../../utils';
import ReactToPrint from 'react-to-print'

const ExamAndApp = () => {
  const [loading, setLoading] = useState(false)
  let info = useLocation()?.state?.data || {};
  // let printRef;
  const [syllabus, setSyllabus] = useState([]);
  let basic = JSON.parse(localStorage.getItem('basic'));
  let teachGoal = JSON.parse(localStorage.getItem('teachGoal'));
  let practice = JSON.parse(localStorage.getItem('practice'));
  let theory = JSON.parse(localStorage.getItem('theory'));
  let relation = JSON.parse(localStorage.getItem('relation'));
  let bookList = JSON.parse(localStorage.getItem('bookList'));
  let leftList = JSON.parse(localStorage.getItem('leftList'));
  const userInfo = JSON.parse(getSession('userInfo'));
  const modifyPerson = userInfo.name;
  let nowDate = Date.now()
  const [teacher, setTeacher] = useState([])
  const [reviewer, setReviewer] = useState('')
  const [instr, setInstructions] = useState('')
  let goalAndAssessment = JSON.parse(localStorage.getItem('goalAndAssessment'));
  // let printRef
  useEffect(() => {
    const res1 = React.$axios.get('/getTeacher').then((teacherData) => {
      setTeacher(teacherData.data)
    })
  }, [])
  const instructions = (e) => {
    setInstructions(e.target.value)
  }
  const review = (value) => {
    setReviewer(value)
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
    .title2{
      font-weight: 500;
      margin: 10px 0px;
      text-indent: 20px;
    }
    .title3,.title4{
      text-indent: 40px;
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
  const submit = () => {
    if (instr && reviewer) {
      const params = {
        course_info: basic,
        teaching_goal: teachGoal,
        relation: relation,
        theory_teaching: theory,
        practice_teaching: practice,
        assessment: leftList,
        assessmentGoal: goalAndAssessment,
        reference: bookList,
        instructions: instr,//教学大纲说明
        writer: modifyPerson,//执笔人
        reviewer: reviewer,//审核人
        modify_data: nowDate,//审核时间
        status: 0,//已提交
      };
      console.log(info)
      if (Object.keys(info).length) {
        const syllabusUpdate = React.$axios.post('/updateSyllabus', { ...params, _id: info._id }).then((ma1) => {
          if (ma1.isSucceed) {
            message.success("提交成功，已成功修改数据")
            localStorage.removeItem("basic")
            localStorage.removeItem("teachGoal")
            localStorage.removeItem("practice")
            localStorage.removeItem("theory")
            localStorage.removeItem("relation")
            localStorage.removeItem("bookList")
            localStorage.removeItem("leftList")
            localStorage.removeItem("goalAndAssessment")
          } else {
            message.error("修改失败")
          }
        })
      } else {
        const syllabusAdd = React.$axios.post('/addSyllabus', params).then((ma) => {
          if (ma.isSucceed) {
            message.success("提交成功，已存入数据")
            localStorage.removeItem("basic")
            localStorage.removeItem("teachGoal")
            localStorage.removeItem("practice")
            localStorage.removeItem("theory")
            localStorage.removeItem("relation")
            localStorage.removeItem("bookList")
            localStorage.removeItem("leftList")
            localStorage.removeItem("goalAndAssessment")
          } else {
            message.error("新增失败")
          }
        })
      }
    } else {
      message.error("请填写教学大纲说明并选择审核人！！")
    }
  }
  return (
    <div className="examine-wrap">
      <div id="printDiv" style={{ marginTop: '20px', pageBreakAfter: 'always' }}>
        <Card title={<div style={{ textAlign: "center" }}>《Web前端开发技术》课程教学大纲</div>} bordered >
          {/* <Space direction="vertical"> */}
          <Row className="title1">
            一、课程基本信息
        </Row>
          <Row>
            <Col span={4}>课程名称</Col>
            <Col span={8}>{basic?.name?.name}</Col>
            <Col span={4}>英文名称</Col>
            <Col span={8}>{basic?.englishName}</Col>
          </Row>
          <Row>
            <Col span={4}>开课单位</Col>
            <Col span={8}>{basic?.unit?.name}</Col>
            <Col span={4}>课程负责人</Col>
            <Col span={8}>{modifyPerson}</Col>
          </Row>
          <Row>
            <Col span={4}>课程代码</Col>
            <Col span={8}>{basic?.code}</Col>
            <Col span={4}>学分</Col>
            <Col span={8}>{basic?.credits}</Col>
          </Row>
          <Row>
            <Col span={4}>课程类别</Col>
            <Col span={8}>{basic?.type}</Col>
            <Col span={4}>适用专业</Col>
            <Col span={8}>{basic?.professional?.name}</Col>
          </Row>
          <Row>
            <Col span={4}>课内学时</Col>
            <Col span={8}>{basic?.within}</Col>
            <Col span={4}>课外学时</Col>
            <Col span={8}>{basic?.outside}</Col>
          </Row>
          <Row>
            <Col span={4}>先修课程</Col>
            <Col span={20}>{basic?.course_ap}</Col>
          </Row>
          <Row>
            <Col span={4}>课程简介</Col>
            <Col span={20}>{basic?.introduce}</Col>
          </Row>
          <Row className="title1">
            二、课程教学目标
        </Row>
          <Row>
            <Col span={5}>序号</Col>
            <Col span={19}>课程目标</Col>
          </Row>
          {
            teachGoal && teachGoal.map((item, index) => {
              return (
                <Row>
                  <Col span={5}>{item.target_course_name}</Col>
                  <Col span={19}>{item.target_course_describe}</Col>
                </Row>
              )
            })
          }
          <Row className="title1">
            三、课程教学目标与毕业要求的对应关系
        </Row>
          <Row>
            <Col span={6}>毕业要求</Col>
            <Col span={6}>指标点</Col>
            <Col span={12}>课程教学目标
          <Row>
                {
                  teachGoal && teachGoal.map((item, index) => {
                    return <Col span={24 / teachGoal.length}>目标{index + 1}</Col>
                  })
                }
              </Row>
            </Col>
          </Row>
          <div>
            {
              relation && relation.map((item, index) => {
                return <Row>
                  <Col span={6}>{item.major_requirement?.name}:{item.major_requirement?.description}</Col>
                  <Col span={6}>{item.point?.content}</Col>
                  {item.teach_goal?.map((data, index) => {
                    return <Col span={12 / item.teach_goal.length}>{item.teach_goal[index]}</Col>
                  })}
                </Row>
              })
            }
          </div>

          <Row className="title1">
            四、课程理论教学内容及学时分配
        </Row>
          <Row>
            <Col span={2}>序号</Col>
            <Col span={2}>教学单元</Col>
            <Col span={5}>教学内容</Col>
            <Col span={5}>教学要求</Col>
            <Col span={2}>课内学时</Col>
            <Col span={2}>教学方式</Col>
            <Col span={2}>课外学时</Col>
            <Col span={2}>课外环节</Col>
            <Col span={2}>课程目标</Col>
          </Row>
          {theory && theory.map((item, index) => {
            return <Row>
              <Col span={2}>{index + 1}</Col>
              <Col span={2}>{item.unit}</Col>
              <Col span={5}>{item.content}</Col>
              <Col span={5}>{item.requirements}</Col>
              <Col span={2}>{item.within}</Col>
              <Col span={2}>{item.way}</Col>
              <Col span={2}>{item.outside}</Col>
              <Col span={2}>{item.link}</Col>
              <Col span={2}>{item.target}</Col>
            </Row>
          })}
          <Row className="title1">
            五、课程实验（实践）教学内容及学时分配
        </Row>
          <Row>
            <Col span={2}>序号</Col>
            <Col span={2}>项目名称</Col>
            <Col span={5}>实验目的</Col>
            <Col span={5}>实验内容</Col>
            <Col span={2}>必做/选做</Col>
            <Col span={4}>项目类型</Col>
            <Col span={2}>教学方式</Col>
            <Col span={2}>学时分配</Col>
          </Row>
          {practice && practice.map((item, index) => {
            return <Row>
              <Col span={2}>{index + 1}</Col>
              <Col span={2}>{item.name}</Col>
              <Col span={5}>{item.objective}</Col>
              <Col span={5}>{item.content}</Col>
              <Col span={2}>{item.practice_way}</Col>
              <Col span={4}>{item.teaching_way}</Col>
              <Col span={2}>{item.type}</Col>
              <Col span={2}>{item.time}</Col>
            </Row>
          })}
          <Row className="title1">
            六、考核方式及要求
        </Row>
          <Row className="title2">1、考核方式：可选择闭卷、设计作品评分或上机考核。</Row>
          <Row className="title2">2、评价环节</Row>
          {leftList && leftList.map((item, index) => {
            return <Row className="title3">{item.name}:{item.content}</Row>
          })}
          <Row className="title2">
            3、考核要求
            课程考核内容需按照课程教学目标以及所支撑的毕业要求指标点进行考核，并在考核之前填写《攀枝花学院课程考核形式汇总表（软件工程）》，对各个课程目标的考核环节与占比进行说明，交教研室以及课程考核工作指导分委会审批执行。
</Row>
          <Row className="title2">
            4、课程教学目标与毕业要求的对应关系
        </Row>
          <Row>
            <Col span={8}>课程教学目标</Col>
            <Col span={6}>对应毕业要求</Col>
            <Col span={10}>评价环节设置
            <Row>
                {
                  leftList && leftList.map((item, index) => {
                    return <Col span={24 / leftList.length}>评价环节{index + 1}</Col>
                  })
                }
              </Row>
            </Col>
          </Row>
          {
            goalAndAssessment && goalAndAssessment.map((item, index) => {
              return <Row>
                <Col span={4}>{item.teaching_goal?.target_course_name}</Col>
                <Col span={4}>{item.teaching_goal?.target_course_describe}</Col>
                <Col span={6}>{item.major_requirement?.name}:{item.major_requirement?.description}</Col>
                {item.assessment?.map((data, index) => {
                  return <Col span={10 / item.assessment.length}>{item.assessment[index]}</Col>
                })}

              </Row>
            })
          }
          <Row className="title1">
            七、建议教材及教学参考书
        </Row>
          {bookList && bookList.map((item, index) => {
            return <Row className="title4">[{index + 1}]{item.name}</Row>
          })}
          <Row className="title1">
            八、大纲执行说明
        </Row>
          <Row>
            <Col span={24}>
              <Input.TextArea rows={9} showCount onChange={(e) => { instructions(e) }} autoSize allowClear width={100} placeholder="请填写大纲执行说明" />
            </Col>
          </Row>
          <Row>
            <Col span={8}>审核人：
            <Select placeholder="选择审核人名字" allowClear onChange={(value) => { review(value) }}>
                {
                  teacher && teacher.map(item => (<Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>))
                }
              </Select>
            </Col>
            <Col span={8}>执笔人：{modifyPerson}</Col>
            <Col span={8}>修改时间：{new Date(nowDate).toLocaleString()}</Col>
          </Row>
        </Card>
      </div>
      <Divider>结束预览</Divider>
      <Space direction="horizontal" size="large">
        {/* <ReactToPrint
        trigger={()=>{<Button type="primary" onClick={print}>打印</Button>}}
        content={printRef}
        >
        </ReactToPrint> */}
        <Button type="primary" onClick={print}>打印</Button>
        <Button type="primary" onClick={submit}>提交审批</Button>
      </Space>
    </div>
  );
}

export default ExamAndApp  
