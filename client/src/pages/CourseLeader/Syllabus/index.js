import React, { useState, useMemo, useEffect } from 'react'
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm, Divider, List ,Space} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession, setSession } from '../../../utils';
import { Link, useLocation, useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom'


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
      render: (text, record) => {
        return record.course_info?.course?.name
      }
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        return record.course_info?.course?.code
      }
    },
    {
      title: '学分',
      dataIndex: 'credits',
      key: 'credits',
      render: (text, record) => {
        return record.course_info?.course?.credits
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
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Link to={{ pathname: "/syllabus/edit", state: { data: record } }}><Button size="small" type="link" onClick={() => { add(record) }}>编辑课程大纲</Button></Link>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link">删除课程大纲</Button>
          </Popconfirm>
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
  const add = (record) => {
    console.log(record)
    setSession("newData", JSON.stringify(record));
  }
  const showSyllabus = (record) => {
    console.log(record)
    history.push('/syllabus/show')
  }
  return (
    <div className="page-container">
      <HeaderComponent title="教学大纲管理" />
      <div className="body-wrap">
        <div className="top-wrap">
          <Divider plain orientation="left">被指定的课程基本信息</Divider>
          <List
            size="large"
            style={{ textAlign: "left" }}
            dataSource={courseData}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={"课程【" + (index + 1) + "】"}
                  description={item.course?.name + " " + item.course?.code}
                />
              </List.Item>
            )}
          />,
        </div>

        <div className="table-wrap">
          <Divider plain orientation="left">请为上述课程新增编辑教学大纲</Divider>
            <Link to={{ pathname: "/syllabus/add" }} ><Button size="big" type="primary" style={{marginBottom:"15px"}}>新增课程大纲</Button></Link>
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