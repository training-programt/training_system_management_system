import React from 'react'
import { Tabs, Table, Button } from 'antd';
const { TabPane } = Tabs;
import { mergeCells } from '@/utils'
const columns = [
  {
    title: '课程板块',
    dataIndex: 'classType',
    key: 'classType',
    render: (text, record, index) => {
      const obj = {
        children: text !== null ? text : '',
        props: {}
      }
      obj.props.rowSpan = mergeCells(text, data, 'classType', index)
      return obj
    }
  },
  {
    title: '课程代码',
    dataIndex: 'classCode',
    key: 'classCode',
  },
  {
    title: '课程名称',
    dataIndex: 'className',
    key: 'className',
  },
  {
    title: '学分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '学时',
    children: [
      {
        title: '总计',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: '理论',
        dataIndex: 'theory',
        key: 'theory',
      },
      {
        title: '实践/实验',
        dataIndex: 'experiment',
        key: 'experiment',
      },
      {
        title: '自修',
        dataIndex: 'selfStudy',
        key: 'selfStudy',
      },
    ],
  },
  {
    title: '行课学期',
    children: [
      {
        title: '1',
        dataIndex: 'term1',
        key: 'term1',
      },
      {
        title: '2',
        dataIndex: 'term2',
        key: 'term2',
      },
      {
        title: '3',
        dataIndex: 'term3',
        key: 'term3',
      },
      {
        title: '4',
        dataIndex: 'term4',
        key: 'term4',
      },
      {
        title: '5',
        dataIndex: 'term5',
        key: 'term5',
      },
      {
        title: '6',
        dataIndex: 'term6',
        key: 'term6',
      },
      {
        title: '7',
        dataIndex: 'term7',
        key: 'term7',
      },
      {
        title: '8',
        dataIndex: 'term8',
        key: 'term8',
      },
    ],
  },
  {
    title: '考核方式',
    dataIndex: 'assessmentWay',
    key: 'assessmentWay',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
];
const data = [
  {
    id: '1',
    classType: '人文社会科学类',
    classCode: '20121001',
    className: '中国近现代史纲要',
    score: 2.5,
    total: 40,
    theory: 32,
    experiment: 8,
    selfStudy: 0,
    term1: 40,
    assessmentWay: '考试',
  },
  {
    id: '2',
    classType: '人文社会科学类',
    classCode: '20111001',
    className: '思想道德修养与法律基础',
    score: 2.5,
    total: 40,
    theory: 32,
    experiment: 8,
    selfStudy: 0,
    term2: 40,
    assessmentWay: '考试',
  },
  {
    id: '3',
    classType: '人文社会科学类',
    classCode: '20141001',
    className: '毛泽东思想和中国特色社会主义理论体系概论',
    score: 4.5,
    total: 72,
    theory: 64,
    experiment: 8,
    selfStudy: 0,
    term3: 72,
    assessmentWay: '考试',
  },
  {
    id: '4',
    classType: '数学与自然科学',
    classCode: '71211001',
    className: '大学物理1',
    score: 2,
    total: 32,
    theory: 30,
    experiment: 0,
    selfStudy: 2,
    term1: 32,
    assessmentWay: '考试',
  },
  {
    id: '5',
    classType: '数学与自然科学',
    classCode: '71211002',
    className: '大学物理2',
    score: 3,
    total: 48,
    theory: 44,
    experiment: 0,
    selfStudy: 4,
    term2: 48,
    assessmentWay: '考试',
  },
  {
    id: '6',
    classType: '数学与自然科学',
    classCode: '71211003',
    className: '大学物理实验',
    score: 1.5,
    total: 24,
    theory: 0,
    experiment: 24,
    selfStudy: 0,
    term2: 24,
    assessmentWay: '考查',
  },
];



const Practice = () => {
  return (
    <div>
      <Tabs tabBarExtraContent={<Button type='primary'>导出</Button>}>
        <TabPane tab="必修课程教学计划" key="1">
          <Table columns={columns} dataSource={data} bordered pagination={false} rowKey="id" />
          <div>注：程序设计类课程考试方式可以为机考。</div>
        </TabPane>
        <TabPane tab="选修课程教学计划" key="2">
          <div>共29学分，其中专业限选课程14学分，通识选修课程15学分。</div>
          <Table columns={columns} dataSource={data} bordered pagination={false} rowKey="id" />
          <div>注：程序设计类课程考试方式可以为机考。</div>
        </TabPane>
        <TabPane tab="实践环节课程教学计划" key="3">
          Content of tab 3
        </TabPane>
        <TabPane tab="第二课堂" key="4">
          Content of tab 4
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Practice
