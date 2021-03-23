import React, { useState, useEffect } from 'react'
// import FileViewer from 'react-file-viewer';
import { useLocation } from "react-router-dom";
import { Form, Input, Card, Row, Col, Table, Button, List, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ExamAndApp = () => {
  const [loading, setLoading] = useState(false)
  let info = useLocation()?.state?.data;
  const [syllabus, setSyllabus] = useState([]);
  let basic = JSON.parse(localStorage.getItem('basic'));
  let teachGoal = JSON.parse(localStorage.getItem('teachGoal'));
  let practice = JSON.parse(localStorage.getItem('practice'));
  let theory = JSON.parse(localStorage.getItem('theory'));
  let relation = JSON.parse(localStorage.getItem('relation'));
  let bookList = JSON.parse(localStorage.getItem('bookList'));
  let leftList = JSON.parse(localStorage.getItem('leftList'));

  useEffect(() => {
    console.log(basic)
    console.log(teachGoal)
    console.log(practice)
    console.log(theory)
    console.log(relation)
    console.log(bookList)
    console.log(leftList)
    if (info) {
      setSyllabus(info)
    } else {
      // setTeachGoalDate(JSON.parse(localStorage.getItem('teachGoal'))||[])
    }
  }, [])
  return (
    <div className="examine-wrap">
      <Card title={<div style={{ textAlign: "center" }}>《Web前端开发技术》课程教学大纲</div>} bordered>
        <Row>
          一、课程基本信息
        </Row>
        <Row>
          <Col span={4}>课程名称</Col>
          <Col span={8}>{basic.name}</Col>
          <Col span={4}>英文名称</Col>
          <Col span={8}>{basic.englishName}</Col>

        </Row>
        <Row>
          <Col span={4}>开课单位</Col>
          <Col span={8}>{basic.unit}</Col>
          <Col span={4}>课程负责人</Col>
          <Col span={8}>{basic.header}</Col>
        </Row>
        <Row>
          <Col span={4}>课程代码</Col>
          <Col span={8}>{basic.code}</Col>
          <Col span={4}>学分</Col>
          <Col span={8}>{basic.credits}</Col>
        </Row>
        <Row>
          <Col span={4}>课程类别</Col>
          <Col span={8}>{basic.type}</Col>
          <Col span={4}>适用专业</Col>
          <Col span={8}>{basic.professional}</Col>
        </Row>
        <Row>
          <Col span={4}>课内学时</Col>
          <Col span={8}>{basic.within}</Col>
          <Col span={4}>课外学时</Col>
          <Col span={8}>{basic.outside}</Col>
        </Row>
        <Row>
          <Col span={4}>先修课程</Col>
          <Col span={20}>{basic.course_ap}</Col>
        </Row>
        <Row>
          <Col span={4}>课程简介</Col>
          <Col span={20}>{basic.introduce}</Col>
        </Row>
        <Row>
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
         <Row>
         三、课程教学目标与毕业要求的对应关系
        </Row>
        <Row>
          <Col span={6}>毕业要求</Col>
          <Col span={6}>指标点</Col>
          <Col span={12}>课程教学目标
          <Row>
            {
              teachGoal&&teachGoal.map((item,index)=>{
              return <Col span={24/teachGoal.length}>目标{index}</Col>
              })
            }
          </Row>
          </Col>
        </Row>
          {
            teachGoal&&teachGoal.map((item,index)=>{
              return <Row>
                <Col spna={6}>{item.major_requirement.name}:{item.major_requirement.description}</Col>
                <Col spna={6}>{item.point.content}</Col>
                <Col span={12/item.teach_goal.length}></Col>
              </Row>
            })
          }
      </Card>
    </div>
  );
}

export default ExamAndApp  
