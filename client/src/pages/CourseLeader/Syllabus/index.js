import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import { Table, Input, Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Syllabus = () => {
  const [loading, setLoading] = useState(false);
  const [syllabusData, setSyllabusData] = useState([]);

  const professColumns = [
    { title: '序号', align: 'center', render: (text, record, index) => `${index + 1}` },
    {
      title: '课程名字',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return record.course_info.name ? record.course_info.name : ''
      }
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        return record.course_info.code ? record.course_info.code : ''
      }
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (text, record) => {
    //     return text ? '已完成' : '未完成'
    //   }
    // },
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
          <Link to={{ pathname: "trainingProject/edit",state:{id:record._id} }}><Button size="small" type="link">编辑</Button></Link>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true)
    const res = React.$axios.get('/getSyllabus').then((syllabusData) => {
      setSyllabusData(syllabusData.data)
    })
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
          <div className="operation-wrap">
            <Link to="/syllabus/add"><Button type="primary" icon={<PlusOutlined />}>新增大纲</Button></Link>
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