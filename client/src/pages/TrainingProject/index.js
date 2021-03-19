import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, Space, message } from 'antd'
import HeaderComponent from '@/components/header'
import TableComponent from '@/components/table'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import api from '@/apis/trainingProject'

import axios from 'axios';

import { downloadFile } from '@/utils'

const TrainingProject = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const getProjectList = async () => {
    setLoading(true)
    const res = await React.$axios.get(api.getProjectList)
    setLoading(false)
    if (res && res.isSucceed) {
      setTableData(res.data)
    }
  }

  useMemo(() => {
    getProjectList()
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
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '编写者',
      dataIndex: 'writer',
      render: (text, record) => text.name || ''
    },
    {
      title: '专业',
      dataIndex: 'major',
      // render: (text, record) => text.name || ''
    },
    {
      title: '学位',
      dataIndex: 'degree',
    },
    {
      title: '总学分',
      dataIndex: 'total_credits',
    },
    {
      title: '编写时间',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => {
        return text ? '已完成' : '未完成'
      }
    },
    {
      title: '操作',
      key: 'active',
      width: '100',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Space size="small">
            <Button size="small" type="link" >预览</Button>
            <Link to={{ pathname: "trainingProject/edit", state: { id: text._id } }}><Button size="small" type="link">编辑</Button></Link>
            <Button size="small" type="link" onClick={() => delProject(record)}>删除</Button>
          </Space>
        </div>
      )
    },
  ]

  const delProject = async (record) => {
    const params = {
      _id: record._id,
    };
    const res = await React.$axios.post(api.delProject, params);
    if (res && res.isSucceed) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    getProjectList()
  }


  const download = async () => {
    axios({
      url: '/download',
      method: 'get',
      responseType: 'blob'
    }).then(res => {
      downloadFile(res, 'example.xlsx')
    })
    // const rul = 'http://qpe0365ci.hd-bkt.clouddn.com/2019%E7%BA%A7%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E4%BA%BA%E6%89%8D%E5%9F%B9%E5%85%BB%E6%96%B9%E6%A1%88.docx'
    // downloadFile(rul, 'test.docx')
  }

  return (
    <div className="page-container">
      <HeaderComponent title="培养方案管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入培养方案名称" allowClear enterButton />
          </div>
          <div className="operation-wrap">
            <Link to="trainingProject/add"><Button type="primary" icon={<PlusOutlined />}>新增方案</Button></Link>
            <Button type="primary" icon={<DeleteOutlined />} onClick={download}>批量删除</Button>
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

export default TrainingProject
