import React, { useState, useMemo } from 'react'
import { Button } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { useHistory } from 'react-router-dom';

const Audit = () => {
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

  const getAuditData = async () => {
    const params = {
      pageSize: tableSetting.rows,
      page: page,
    }
    setLoading(true)
    const res = await React.$axios.get(`/getAuidtWithPage?${React.$qs.stringify(params)}`)
    if (res && res.isSucceed) {
      setTableData(res.data);
      setTotal(res.total)
    }
    setLoading(false)
  }

  useMemo(() => {
    getAuditData()
  }, [page])

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
      title: '课程编码',
      dataIndex: 'code',
      render: (text, record) => {
        return record?.course?.course?.code
      }
    },
    {
      title: '开课学期',
      dataIndex: 'semester',
      render: (text, record) => {
        return record?.course?.semester
      }
    },
    {
      title: '课程学分',
      dataIndex: 'credits',
      render: (text, record) => {
        return record?.course?.course?.credits
      }
    },
    {
      title: '是否达成',
      dataIndex: 'isAchievement',
      render: (text, record) => {
        if (record.isAchievement == 0) {
          return <div style={{ color: "red" }}>未达成</div>
        } else {
          return <div style={{ color: "green" }}>已达成</div>
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'teachRoomState',
      align: 'center',
      render: (text, record) => {
        if (record.teachRoomState === 0) {
          return <div style={{ color: "red" }}>未审核</div>
        } else if (record.teachRoomState === 1) {
          return <div style={{ color: "green" }}>通过</div>
        } else if (record.teachRoomState === -1) {
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
        <div style={{ textAlign: 'center' }}>
          {/* <Button type="link">编辑</Button>
          &emsp; */}
          <Button type="link" onClick={() => { showAudit(record) }}>审核</Button>
        </div>
      )
    },
  ];
  const showAudit = (record) => {
    history.push(`/progress/examine/showExamine?id=${record._id}`)
  }

  return (
    <div className="page-container">
      <HeaderComponent title="审核管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            {/* <Input.Search placeholder="请输入课程名称" allowClear enterButton onSearch={value => setQuery(value)} /> */}
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

export default Audit
