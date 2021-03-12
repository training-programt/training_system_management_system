import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession } from '../../../utils';

const Syllabus = () => {
  const [loading, setLoading] = useState(false);
  const [syllabusData, setSyllabusData] = useState([]);
 
  const professColumns = [
    { title: '序号', align: 'center', render: (text, record, index) => `${index + 1}` },
    {
      title: '课程名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '学分',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: '审核人',
      dataIndex: 'reviewer',
      key: 'reviewer',
      // render: (text, record) => {
      //   return record.reviewer.name ? record.reviewer.name : ''
      // }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Link to={{ pathname: "/syllabus/add", state: { data: record } }}><Button size="small" type="link" >编辑课程大纲</Button></Link>
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
    const teacher = JSON.parse(getSession('userInfo'));
    const params = {
      _id: teacher._id
    }
    const res = React.$axios.post('/findSyllabus', params).then((syllabusData) => {
      console.log(syllabusData)
      setSyllabusData(syllabusData.data[0].course)
    })
    // const course = React.$axios.get('/getCourse').then((courseData) => {
    //   console.log(courseData)
    //   setSyllabusData(courseData.data)
    //   setTotal(courseData.total)
    // })
    setLoading(false)
  }, [])
  return (
    <div className="page-container">
      <HeaderComponent title="教学大纲管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入课程名称" allowClear enterButton />
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