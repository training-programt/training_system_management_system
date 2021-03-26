import React, { useState, useMemo, useEffect } from 'react'
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession,setSession } from '../../../utils';
import { Link,useLocation,useHistory, BrowserRouter as Router,Route,Switch} from 'react-router-dom'


const Syllabus = () => {
  const [loading, setLoading] = useState(false);
  const [syllabusData, setSyllabusData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  let history = useHistory();
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
      title: '选修/必修/限选',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Link to={{ pathname: "/syllabus/edit", state: { data: record } }}><Button size="small" type="link" onClick={()=>{add(record)}}>编辑课程大纲</Button></Link>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link">删除课程大纲</Button>
          </Popconfirm>
          <Button type="link" onClick={()=>{showSyllabus(record)}}>查看课程大纲</Button>
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
    // const res = React.$axios.post('/getSyllabus', params).then((syllabusData) => {
    //   console.log(syllabusData)
    //   // setSyllabusData(syllabusData.data[0].course)
    // })
    const res = React.$axios.post('/findTeacher', params).then((data) => {
      setCourseData(data.data.course)
    })
    setLoading(false)
  }, [])
  const add=(record)=>{
    console.log(record)
    setSession("newData",JSON.stringify(record));
  }
  const showSyllabus = (record)=>{
    console.log(record)
    history.push('/syllabus/show')
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
            dataSource={courseData}
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