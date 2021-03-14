import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession,setSession } from '../../../utils';

const Syllabus = () => {
  const [loading, setLoading] = useState(false);
  const [syllabusData, setSyllabusData] = useState([]);
 
  const professColumns = [
    { title: '序号', align: 'center', render: (text, record, index) => `${index + 1}` },
    {
      title: '课程名字',
      dataIndex: 'course_info',
      key: 'course_info',
      render:(text,record)=>{
        return record.course_info.name?record.course_info.name:""
      }
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
      render:(text,record)=>{
        return record.course_info.code?record.course_info.code:""
      }
    },
    {
      title: '修改时间',
      dataIndex: 'modify_data',
      key: 'modify_data',
    },
    {
      title: '审核人',
      dataIndex: 'reviewer',
      key: 'reviewer',
      render: (text, record) => {
        return record.reviewer.name ? record.reviewer.name : ''
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Link to={{ pathname: "/syllabus/add", state: { data: record } }}><Button size="small" type="link" onClick={()=>{add(record)}}>编辑课程大纲</Button></Link>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link">删除课程大纲</Button>
          </Popconfirm>
          <Button type="link">查看课程大纲</Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true)
    // const teacher = JSON.parse(getSession('userInfo'));
    // const params = {
    //   _id: teacher._id
    // }
    // const res = React.$axios.post('/getSyllabus', params).then((syllabusData) => {
    //   // console.log(syllabusData)
    //   setSyllabusData(syllabusData.data[0].course)
    // })
    const syll = React.$axios.get('/getSyllabus').then((sllData) => {
      setSyllabusData(sllData.data)
    })

    setLoading(false)
  }, [])
  const add=(record)=>{
    console.log(record)
    setSession("newData",JSON.stringify(record));
  }
  return (
    <div className="page-container">
      <HeaderComponent title="教学大纲管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
           <Link to={{ pathname: "/syllabus/add"}}><Button size="big" type="primary">新增课程大纲</Button></Link>
          </div>
        </div>
        <div className="table-wrap">
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