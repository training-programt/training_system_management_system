import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd'
import HeaderComponent from '@/components/header'
import TableComponent from '@/components/table'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const TrainingProject = () => {
  const [loading, setLoading] = useState(false);
  // const [tableData, setTableData] = useState([]);

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

  const tableData = [
    {
      _id: '1',
      name: '2019-2020学年软件工程',
      writer: '张三',
      degree: '工学',
      total_credits: 180,
      createTime: '2020/12/12',
      status: 1,
    }
  ]

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '编写者',
      dataIndex: 'writer',
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
          <Link to={{pathname: "trainingProject/edit", state: {id: text._id}}}><Button size="small" type="link">编辑</Button></Link>
        </div>
      )
    },
  ]

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

export default TrainingProject