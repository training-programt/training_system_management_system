import React, { useState, useMemo } from 'react'
import { Input, Select } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import api from '@/apis/teachingList'
import { getSession } from '@/utils'

const TeachingList = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState(12)
  const [semester, setSemester] = useState('')
  const [semesterList, setSemesterList] = useState([])

  const tableSetting = {
    page: page,
    rows: pageSize,
    isMultiple: true,
  };

  const pageparams = {
    page: page,
    pageSize: pageSize,
    total: total,
  }

  const getSemesterList = async () => {
    const res = await React.$axios.get(api.getSemesterList)
    if (res && res.isSucceed) {
      setSemesterList(res.data);
    }
  }

  const getTeachingList = async () => {
    const params = {
      teacher: JSON.parse(getSession('userInfo'))._id,
      pageSize: pageSize,
      page: page,
      semester,
    }
    setLoading(true)
    const res = await React.$axios.get(
      `${api.getTeachingInfo}?${React.$qs.stringify(params)}`
    )
    setLoading(false)
    if (res && res.isSucceed) {
      setTableData(res.data);
      setTotal(res.total)
    }
  }

  useMemo(() => {
    getTeachingList()
    getSemesterList()
  }, [page, semester, query])

  const columns = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
    },
    {
      title: '学期',
      dataIndex: 'semester',
      render: (text, record) => record.semester ? record.semester.semesterName : ''
    },
    {
      title: '课程',
      dataIndex: 'basicCourse',
      render: (text, record) => record.course ? record.course.name : ''
    },
    {
      title: '专业',
      dataIndex: 'major',
      render: (text, record) => record.major ? record.major.name : ''
    },
    {
      title: '班级',
      dataIndex: 'class',
      align: 'center'
    },

  ];

  return (
    <div className="page-container">
      <HeaderComponent title="授课记录管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="select-box">
            {/* <Input.Search placeholder="请输入课程名称" allowClear enterButton onSearch={value => setQuery(value)} /> */}
            <Select
              placeholder="请选择学期"
              showSearch
              allowClear
              onChange={value => setSemester(value)}
            >
              {
                semesterList.map(item => <Select.Option key={item._id} value={item._id}>{item.semesterName}</Select.Option>)
              }
            </Select>
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

export default TeachingList
