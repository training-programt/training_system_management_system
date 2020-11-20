import React, { useState, useEffect, useMemo } from 'react';
import { Input, Select, Space, Button, Drawer } from 'antd';
import PaginationComponent from '../../components/pagination'
import HeaderComponent from '../../components/header'
import TableComponent from '../../components/table'
import postJSON from '@/public/json/post.json'
import './index.less'

import api from '../../apis/teacher'
import api2 from '../../apis/teachingSection'

const { Option } = Select;

const Teacher = () => {

  const [page, setPage] = useState(1);
  const [select, setSelect] = useState({ job: '', section: '', position: '' });
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sectionData, setSectionData] = useState([]);

  const postData = postJSON.post;

  const column = [
    { width: 50, render: (text, record, index) => `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}` },
    { title: '编号', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '教研室', dataIndex: 'section' },
    { title: '联系方式', dataIndex: 'tel' },
    { title: '专职/兼职', dataIndex: 'job', render: text => text == 0 ? '专职' : '兼职' },
    { title: '职务', dataIndex: 'position' },
    { title: '学历', dataIndex: 'education' },
    {
      title: '操作', key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="link" onClick={() => setVisible(true)}>详情</Button>
          <Button size="small" type="link">重置密码</Button>
          <Button size="small" type="link">删除</Button>
        </Space >
      )
    },
  ];

  const tableSetting = {
    page: 1,
    rows: 12,
    rowSelection: {
      type: 'checkout',
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    }
  }

  const pageparams = {
    page: page,
    pageSize: 12,
    total: total,
  }

  useMemo(() => {
    const fetchData = async () => {
      const res = await api2.getDepartmentList();
      setSectionData(res.data);
    }
    fetchData();
  }, [])
  

  useMemo(() => {
    const fetchData = async () => {
      const params = {
        page: pageparams.page,
        rows: tableSetting.rows,
        query: query,
        job: select.job, 
        section: select.section, 
        position: select.position,
      }
      setLoading(true);
      const res = await api.getTeacherList(params);
      setTableData(res.data);
      setTotal(res.total);
      setLoading(false);
    }
    fetchData();
  }, [select, query, page])

  return (
    <div className="teach-section">
      <HeaderComponent title="教师管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-box">
            <div className="filter-item">
              <span>教研室：</span>
              <Select className="select-type" allowClear onChange={value => setSelect({ ...select, section: value })}>
                {
                  sectionData.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))
                }
              </Select>
            </div>
            <div className="filter-item">
              <span>专职/兼职：</span>
              <Select className="select-type" allowClear onChange={value => setSelect({ ...select, job: value })}>
                <Option value='0'>专职</Option>
                <Option value='1'>兼职</Option>
              </Select>
            </div>
            <div className="filter-item">
              <span>职务：</span>
              <Select
                className="select-type"
                allowClear
                onChange={value => setSelect({ ...select, position: value })}
              >
                {
                  postData.map((c, index) => {
                    return <Option key={index} value={c.id}>{c.name}</Option>
                  })
                }
              </Select>
            </div>
          </div>
          <div className="search-box">
            <Input.Search placeholder="请输入教师编号或名称" onSearch={value => setQuery(value)} allowClear enterButton />
          </div>
        </div>
        <div className="table-container">
          <TableComponent data={tableData} column={column} settings={tableSetting} loading={loading} />
        </div>
        <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}
export default Teacher
