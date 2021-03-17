import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession,setSession } from '../../../utils';

const HeaderCourse = () => {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [total, setTotal] = useState(0);
 
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
          <Button type="link">绑定课程大纲</Button>
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
    const res = React.$axios.post('/findTeacher', params).then((data) => {
        setCourseData(data.data.course)
      })
    setLoading(false)
  }, [])
  const add=(record)=>{
    setSession("newData",JSON.stringify(record));
  }
  return (
    <div className="page-container">
      <HeaderComponent title="课程关系绑定" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入课程名称" allowClear enterButton />
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

export default HeaderCourse