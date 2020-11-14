import React, { useState } from 'react';
import { Input, Select, Space, Button } from 'antd';
import PaginationComponent from '../../components/pagination'
import HeaderComponent from '../../components/header'
import TableComponent from '../../components/table'
import './index.less'

import api from '../../apis'

const { Option } = Select;

const TeachingResearchSection = () => {

  const onSearch = value => console.log(value);

  const dataSource = [
    {
      id: '51038475841701',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841702',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841703',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841704',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841705',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841706',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841707',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841708',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841709',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      key: '10',
      id: '51038475841710',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841711',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
    {
      id: '51038475841712',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },

  ];

  const column = [
    { width: 50, render:(text,record,index)=>`${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`},
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '专业', dataIndex: 'major', key: 'major' },
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

  const pageparams = {
    page: 1,
    pageSize: 12,
    total: 100,
  }

  const tableSetting = {
    page: 1,
    rows: 12,
    isIndexColumn: true,
  }

  const handlePage = (v) => {
    pageparams.page = v;
    console.log(v);
  }

  return (
    <div className="teach-section">

      <HeaderComponent title="教研室管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-type">
            <span>教研室分类：</span>
            <Select className="select-type" defaultValue='0'>
              <Option value="0">全部</Option>
              <Option value="1">专业类</Option>
              <Option value="2">管理类</Option>
              <Option value="3">学科类</Option>
            </Select>
          </div>
          <div className="search-box">
            <Input.Search placeholder="请输入教研室名称" onSearch={onSearch} enterButton />
          </div>
        </div>

        <div className="table-container">
          <TableComponent data={dataSource} column={column} settings={tableSetting} />

        </div>
        <PaginationComponent pageparams={pageparams} handlePage={handlePage} />
      </div>
    </div>
  )
}

export default TeachingResearchSection
