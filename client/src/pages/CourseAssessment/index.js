import React, { useState, useMemo } from 'react'
import { Button, Input, Space, message } from 'antd'
import { Link } from "react-router-dom";
import HeaderComponent from '@/components/header'
import TableComponent from '@/components/table'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getSession } from '@/utils'
import api from '@/apis/teachingManagement'
const CourseAssessment = () => {

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([
    {
      _id: '1',
      semester: '2017-2018上学年',
      course: '数据结构',
      state: '1',
      createTime: '2018年12月10日'
    },
    {
      _id: '2',
      semester: '2017-2018上学年',
      course: '高等数学',
      state: '',
      createTime: '2018年12月10日'
    },
    {
      _id: '3',
      semester: '2017-2018上学年',
      course: '线性代数',
      state: '',
      createTime: '2018年12月10日'
    },
  ]);


  const getTeachRecord = async () => {
    const params = {
      _id: JSON.parse(getSession('userInfo'))._id
    }
    const res = await React.$axios.get(api.getTeachingRecord, React.$qs.stringify(params));
    if (res && res.isSucceed) {
      console.log(res)
    }
  }

  useMemo(() => {
    getTeachRecord()
    // getProjectList()
  }, [])

  const tableSetting = {
    page: 1,
    rows: 10,
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys) => {
        setDeleteList(selectedRowKeys)
      },
    }
  }

  const columns = [
    {
      title: '学期',
      dataIndex: 'semester',
    },
    {
      title: '课程名',
      dataIndex: 'course',
      // render: (text, record) => text.name || ''
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record) => {
        return text ? '已完成' : '未完成'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      key: 'active',
      width: '100',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Space size="small">
            <Button size="small" type="link" >教学大纲</Button>
            <Button size="small" type="link" >编辑</Button>
            <Button size="small" type="link" >删除</Button>
            <Button size="small" type="link" >下载</Button>
          </Space>
        </div>
      )
    },
  ]


  return (
    <div className="page-container">
      <HeaderComponent title="课程考核" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入课程名称" allowClear enterButton />
          </div>
          <div className="operation-wrap">
            <Link to="courseAssessment/add"><Button type="primary" icon={<PlusOutlined />}>新增课程考核</Button></Link>
            <Button type="primary" icon={<DeleteOutlined />}>批量删除</Button>
          </div>
        </div>
        <div className="table-wrap">
          <TableComponent data={tableData} column={columns} settings={tableSetting} loading={loading} />
        </div>
        {/* <PaginationComponent onShowSizeChange={onShowSizeChange} pageparams={pageparams} handlePage={v => setPage(v)} /> */}
      </div>
    </div>
  )
}

export default CourseAssessment
