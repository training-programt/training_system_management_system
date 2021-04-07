import React, { useState, useEffect } from 'react'
import { Button, Modal, message, Form, Input, Popconfirm } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import api from '@/apis/auditApproval'

const Approval = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [isEdit, setIsEdit] = useState(false);
  const [pageSize, setPageSize] = useState(12)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const tableSetting = {
    page: page,
    rows: pageSize,
    isMultiple: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
      },
    }
  };

  const pageparams = {
    page: page,
    pageSize: pageSize,
    total: total,
  }
  useEffect(() => {
    setLoading(true)
    const res = React.$axios.get('/getApproval').then(appro => {
      setLoading(false)
      if (appro.isSucceed) {
        setTableData(appro.data);
      }
    })

  }, [])
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: '课程名称',
      dataIndex: 'course',
      align: 'center',
      render: (text, record) => {
        return record?.course?.course?.name
      }
    },
    {
      title: '考核对象',
      dataIndex: 'inspectionObject',
    },
    {
      title: '考核形式',
      dataIndex: 'inspectionForm',
    },
    {
      title: '考核学生数',
      dataIndex: 'studentNum',
    },
    {
      title: '预计及格率',
      dataIndex: 'estimatePassRate',
    },
    {
      title: '预计平均分',
      dataIndex: 'estimateAverage',
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      render: (text, record) => {
        if (record.state === 0) {
          return <div style={{ color: "red" }}>未审核</div>
        }
        if (record.state === 1) {
          return <div style={{ color: "green" }}>已审核</div>
        }
      }
    },
    {
      title: '操作',
      key: 'active',
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => { showApproval(record) }}>审批</Button>
        </div>
      )
    },
  ];

  
  const showApproval = (record) => {
    history.push(`/progress/approval/showApproval?id=${record._id}`)
  }
  return (
    <div className="page-container">
      <HeaderComponent title="审批管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
          </div>
        </div>
        <div className="table-container">
          <TableComponent
            data={tableData}
            column={columns}
            settings={tableSetting}
            loading={loading}
          />
        </div>
        <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
      </div>
    </div>
  )
}

export default Approval
