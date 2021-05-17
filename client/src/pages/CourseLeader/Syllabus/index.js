import React, { useState, useMemo, useEffect } from 'react'
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm, Divider, List, message, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession, setSession } from '../../../utils';
import { Link, useLocation, useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const Syllabus = () => {
  const [loading, setLoading] = useState(false);
  const [syllabusData, setSyllabusData] = useState([]);
  const [butType, setButType] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [isEdit,setIsEdit] = useState(false);
  let editInfo = JSON.parse(localStorage.getItem('basic'))
  let history = useHistory();
  const professColumns = [
    { title: '序号', align: 'center', render: (text, record, index) => `${index + 1}` },
    {
      title: '课程名字',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return record.course_info?.course?.course?.name
      }
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        return record.course_info?.course?.course?.code
      }
    },
    {
      title: '学分',
      dataIndex: 'credits',
      key: 'credits',
      render: (text, record) => {
        return record.course_info?.course?.course?.credits
      }
    },
    {
      title: '先修课程',
      dataIndex: 'course_ap',
      key: 'course_ap',
      render: (text, record) => {
        return record.course_info?.course_ap
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if(record.status===-1){
          return <div style={{color:"red"}}>未编写完成</div>
        }else if(record.status===0){
          return <div style={{color:"orange"}}>已提交审批</div>
        }else if(record.status===1){
          return <div style={{color:"green"}}>已审批</div>
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Link to={{ pathname: "/syllabus/edit", state: { data: record } }}><Button size="small" type="link" onClick={(e) => { edit(e,record) }}>编辑课程大纲</Button></Link>
          <Button type="link" onClick={() => { del(record._id) }}>删除课程大纲</Button>
          <Button type="link" onClick={() => { showSyllabus(record) }}>查看课程大纲</Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true)
    const teacher = JSON.parse(getSession('userInfo'));
    const params = {
      _id: teacher._id
    }
    const courseSystem = React.$axios.post('/findCourseSystem', params).then((data) => {
      setCourseData(data.data)
    })
    const res1 = React.$axios.get('/getSyllabus').then((syllabusData) => {
      setSyllabusData(syllabusData.data)
    })
    setLoading(false)
  }, [])

  const del = async (id) => {
    const dell = React.$axios.post('/delSyllabus', { _id: id }).then(delData=>{
      if (delData.isSucceed) {
        message.success("删除成功");
        const newSyllabus = React.$axios.get(
          '/getSyllabus'
        )
        setSyllabusData(newSyllabus.data);
        if (editInfo) {
          localStorage.removeItem("basic")
          localStorage.removeItem("teachGoal")
          localStorage.removeItem("practice")
          localStorage.removeItem("theory")
          localStorage.removeItem("relation")
          localStorage.removeItem("bookList")
          localStorage.removeItem("leftList")
          localStorage.removeItem("goalAndAssessment")
        }
      } else {
        message.error("删除失败");
      }
    })
 
  }
  const showSyllabus = (record) => {
    history.push(`/syllabus/show?id=${record._id}`);
  }
  const edit = (e,record) => {
    // console.log(record)
    if(!isEdit && editInfo){
      message.error("正处于新增流程中，请先完成教学大纲的新增")
      e.preventDefault();
      return false;
    }else{
      setIsEdit(true);//编辑
      setSession("newData", JSON.stringify(record));
    }
  }
  const addSyllabus = (e) => {
    if (isEdit && editInfo) {
      message.error("正处于编辑流程中，请先完成教学大纲的编辑")
      e.preventDefault();
      return false;
    } else {
      setIsEdit(true)
      history.push('/syllabus/add')
    }
  }
  return (
    <div className="page-container">
      <HeaderComponent title="教学大纲管理" />
      <div className="body-wrap">
        <div className="table-wrap">
          <Divider plain orientation="left">请为被指定课程新增编辑教学大纲</Divider>
          <Link to={{ pathname: "/syllabus/add" }} ><Button size="big" type="primary" style={{ marginBottom: "15px" }} onClick={addSyllabus}>新增课程大纲</Button></Link>
          <Table
            dataSource={syllabusData}
            columns={professColumns}
            loading={loading}
            bordered
            rowKey={(record) => record._id}
          >
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Syllabus