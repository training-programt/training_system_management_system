import React, { useState, useMemo } from 'react';
import { Input, Select, Space, Button } from 'antd';
import PaginationComponent from '../../components/pagination'
import HeaderComponent from '../../components/header'
import TableComponent from '../../components/table'
import './index.less'

import api from '../../apis/teachingSection'

const { Option } = Select;

const TeachingResearchSection = () => {

  const [page, setPage] = useState(1);
  const [type, setType] = useState('0');
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const column = [
    { width: 50, render: (text, record, index) => `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}` },
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '专业', dataIndex: 'major', key: 'major' },
    {
      title: '类型', dataIndex: 'type', render: text => {
        return text == 1 ? '专业类' : text == 2 ? '学科类' : '管理类'
      }
    },
    { title: '教师人数', dataIndex: 'teacherCount', key: 'teacherCount' },
    { title: '专任教师', dataIndex: 'fullTeacher', key: 'fullTeacher' },
    {
      title: '操作', key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="link">详情</Button>
          <Button size="small" type="link">删除</Button>
        </Space>
      )
    },
  ];

  const tableSetting = {
    page: 1,
    rows: 12,
    isMultiple: true,
  }

  const pageparams = {
    page: page,
    pageSize: 12,
    total: total,
  }

  const selectData = [
    { id: 1, name: '专业类' },
    { id: 2, name: '管理类' },
    { id: 3, name: '学科类' },
  ]

  useMemo(() => {
    const fetchData = async () => {
      const params = {
        page: pageparams.page,
        rows: tableSetting.rows,
        type: type,
        query: query
      }
      setLoading(true);
      const res = await api.getDepartmentList(params);
      setTableData(res.data);
      setTotal(res.total);
      setLoading(false);
    }

    fetchData();

  }, [type, query, page])

  return (
    <div className="teach-section">
      <HeaderComponent title="教研室管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-type">
            <span>教研室分类：</span>
            <Select className="select-type" defaultValue={type} onChange={value => setType(value)}>
              <Option value='0'>全部</Option>
              {
                selectData.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))
              }
            </Select>
          </div>
          <div className="search-box">
            <Input.Search placeholder="请输入教研室名称" onSearch={value => setQuery(value)} allowClear enterButton />
          </div>
        </div>
        <div className="table-container">
          <TableComponent data={tableData} column={column} settings={tableSetting} loading={loading} />
        </div>
        <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
      </div>
    </div>
  )
}
export default TeachingResearchSection
