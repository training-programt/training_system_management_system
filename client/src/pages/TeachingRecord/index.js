import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, Space, message } from 'antd'
import HeaderComponent from '@/components/header'
import TableComponent from '@/components/table'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import api from '@/apis/teachingManagement'

import { getSession } from '@/utils'


const TeachingRecord = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);


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
      render: (text, record) => text.name || ''
    },
    {
      title: '课程考核',
      dataIndex: 'assessment',
      render: (text, record) => text ? '有': '无'
    },
    {
      title: '教学大纲',
      dataIndex: 'syllabus',
    },
    {
      title: '授课时间',
      dataIndex: 'createTime',
    },
  ]

  return (
    <div className="page-container">
      <HeaderComponent title="授课记录" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入课程名称" allowClear enterButton />
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

export default TeachingRecord
