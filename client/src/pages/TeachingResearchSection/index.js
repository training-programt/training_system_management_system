import React, { useState } from 'react';
import { Input, Select, Space, Table, Button } from 'antd';
import Pagenation from '../../components/pagination'
import Header from '../../components/header'
import './index.less'

import api from '../../apis'

const { Option } = Select;

const TeachingResearchSection = () => {

  const onSearch = value => console.log(value);

  const dataSource = [
    {
      key: '1',
      id: '51038475841709',
      name: "软件工程教研室",
      major: '软件工程',
      teacherCount: 20,
      fullTeacher: 16
    },
  ];

  const columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '专业', dataIndex: 'major', key: 'major' },
    { title: '教师人数', dataIndex: 'teacherCount', key: 'teacherCount' },
    { title: '专任教师', dataIndex: 'fullTeacher', key: 'fullTeacher' },
    {
      title: '操作', key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link">详情</Button>
          <Button type="link">删除</Button>
        </Space>
      )
    },
  ];

  const total = 20;

  const pageparams = {
    page: 1,
    pageSize: 12,
    total: 100,
  }

  const handlePage = (v) => {
    pageparams.page = v;
    console.log(v);
  }



  return (
    <div className="teach-section">

      <Header title="教研室管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-type">
            <span>教研室分类：</span>
            <Select style={{ width: 200 }} defaultValue='0'>
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
          <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
          
        </div>
        <Pagenation pageparams={pageparams} handlePage={handlePage} />
      </div>
    </div>
  )
}

export default TeachingResearchSection
