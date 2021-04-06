import React, { useState, useMemo } from 'react'
import { Input, Select, Button } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/apis/teachingList'
import { getSession } from '@/utils'
import { Link,useHistory } from 'react-router-dom';

const TeachingList = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState(12)
  const [semester, setSemester] = useState('')
  const [semesterList, setSemesterList] = useState([])
  let history = useHistory();

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
      render: (text, record) => {
        return record.course?.course?.name
      }
    },
    {
      title: '专业',
      dataIndex: 'major',
      render: (text, record) => record?.major?.name
    },
    {
      title: '班级',
      dataIndex: 'class',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={()=>{showAudit(record)}}>查看审核表</Button>
          <Button type="link" onClick={()=>{showApproval(record)}}>查看审批表</Button>
        </div>
      ),
    },
  ];
const showAudit=(record)=>{
  history.push(`/teachingList/showAudit?id=${record.course._id}`)
}
const showApproval=(record)=>{
history.push(`/teachingList/showApproval?id=${record.course._id}`)
}
  return (
    <div className="page-container">
      <HeaderComponent title="授课记录管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="select-box" style={{ height: "40px", lineHeight: "40px" }}>
            <label style={{ fontSize: "14px" }}>请根据学期进行筛选：</label>
            <Select
              placeholder="请选择学期"
              showSearch
              allowClear
              width={200}
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
