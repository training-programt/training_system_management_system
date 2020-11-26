import React, { useState, useMemo } from 'react';
import { Table, Button, Tabs, Popconfirm, } from 'antd';
const { TabPane } = Tabs;
import HeaderComponent from '../../components/header'
import { useSelector } from 'react-redux';
import './index.less'
import api from '../../apis/grade'
const Grade = () => {
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [loading, setLoading] = useState(false);
  const [gradeData, setGradeData] = useState([]);
  const [semesterData, setsemesterData] = useState([])
  const [tabKey, setTabKey] = useState('tab1')
  const gradeColumns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '年级名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年级人数',
      dataIndex: 'studentNumber',
      key: 'studentNumber'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={edit}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={del}>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const semesterColumns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '学期名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={edit}>编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={del}>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const del = () => {
  };
  //编辑
  const edit = () => {
    setVisible(true);
  };
  const add = () => {

  }
  useMemo(() => {
    const fetchData = async () => {
      const params = {
      }
      setLoading(true);
      const res = await api.getGradeList(params);
      setGradeData(res.data);
      setLoading(false);
    }
    fetchData();
  }, [])
  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await api.getSemesterList();
      setsemesterData(res.data);
      setLoading(false);
    }
    fetchData();
  }, [])
  const callback=(key)=>{
    // console.log(key);
  }
  return (
    <div className="gradeInsLeader">
      <HeaderComponent title="年级管理" />
      <div className="body-wrap">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="年级管理" key="1">
            <Table
              dataSource={gradeData}
              columns={gradeColumns}
              loading={loading}
              bordered
            >
            </Table>
          </TabPane>
          <TabPane tab="学期管理" key="2">
            <Table
              dataSource={semesterData}
              columns={semesterColumns}
              loading={loading}
              bordered
            >
            </Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Grade;