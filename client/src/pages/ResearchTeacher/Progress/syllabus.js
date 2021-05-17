import React, { useState, useEffect, useMemo } from 'react'
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { getSession }  from '@/utils'

const Syllabus = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12)

  const tableSetting = {
    page: page,
    rows: pageSize,
  };

  const pageparams = {
    page: page,
    pageSize: pageSize,
    total: total,
  }

  const getSyllabus = async () => {
    const params = {
      reviewer: JSON.parse(getSession('userInfo'))._id,
      pageSize: tableSetting.rows,
      page: page,
    }
    setLoading(true)
    const res = await React.$axios.get(`/getAllSyllabus?${React.$qs.stringify(params)}`)
    if (res && res.isSucceed) {
      setTableData(res.data);
      setTotal(res.total)
    }
    setLoading(false)
  }

  useMemo(() => {
    getSyllabus()
  }, [page])

  const columns = [
    { title: '序号', align: 'center', render: (text, record, index) => `${index + 1}` },
    {
      title: '课程名字',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return record.course_info?.course?.course?.name
      }
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        return record.course_info?.course?.course?.code
      }
    },
    {
      title: '学分',
      dataIndex: 'credits',
      key: 'credits',
      render: (text, record) => {
        return record.course_info?.course?.course?.credits
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
      title: '课程负责人',
      dataIndex: 'writer',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status === 0) {
          return <div style={{ color: "orange" }}>未审批</div>
        } else if (record.status === 1) {
          return <div style={{ color: "green" }}>已审批</div>
        } else if (record.status === -1) {
          return <div style={{ color: "red" }}>驳回</div>
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
          <Button type="link" onClick={() => { showSyllabus(record) }}>审批</Button>
        </div>
      )
    },
  ];

  const showSyllabus = (record) => {
    history.push(`/progress/syllabus/showSyllabus?id=${record._id}`)
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

export default Syllabus
