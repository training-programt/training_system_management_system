import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Input, Select, Space, Button, Table, Descriptions } from 'antd';
import HeaderComponent from '../../../components/header'
import postJSON from '@/public/json/post.json'
import './index.less'
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

const LeaderTeacher = () => {

  const [page, setPage] = useState(1);
  const [select, setSelect] = useState({ job: '', section: '', position: '' });
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [teacherDetail, setTeacherDetail] = useState({});
  const [pageSize, setPageSize] = useState(12)
  const [showSizeChanger, setShowSizeChanger] = useState(true);
  const [showQuickJumper, setShowQuickJumper] = useState(true)

  const importRef = useRef();
  const detailRef = useRef();

  const teacherColumns = [
    { title: '姓名', dataIndex: 'name', align: 'center', },
    { title: '性别', dataIndex: 'sex', align: 'center', },
    { title: '密码', dataIndex: 'password', align: 'center', },
    {
      title: '教研室', dataIndex: 'teachRoom', align: 'center',
      render: (text, record) => {
        // console.log(record.teachName.name)
        console.log(record)
        const teachName = record.teachName
        console.log(teachName)
        return record
      }
    },
    {
      title: '所属专业', dataIndex: 'major.name', align: 'center',
      render: (text, record) => {
        const majorName = record.major
        return majorName
      }
    },
    {
      title: '拟授课程',
      dataIndex: 'course',
      align: 'center',
      render: (text, record) => {
        let sum = ''
        for (let i = 0; i < record.course.length; i++) {
          sum = sum + record.course[i].name + '、'
        }
        return sum
      }
    },
    // { title: '专职/兼职', dataIndex: 'job', render: text => text == 0 ? '专职' : '兼职' },
    // { title: '职务', dataIndex: 'position' },
    // { title: '学历', dataIndex: 'lastInfo' },
    {
      title: '操作', key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="link">详情</Button>
          <Button size="small" type="link">信息修改</Button>
          <Button size="small" type="link">删除</Button>
        </Space >
      )
    },
  ];

  const pageparams = {
    page: page,
    pageSize: 10,
    total: total,
  }
  //分页设置
  const paginationProps = {
    showSizeChanger,//设置每页显示数据条数
    showQuickJumper,
    pageSize,
    total,  //数据的总的条数
    onChange: (current) => changePage(current), //点击当前页码
    onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      onShowSizeChange(current, pageSize)
    }
  }
  const changePage = (current) => {
    //current参数表示是点击当前的页码，
    // this.getData(current) //向后端发送请求
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize)
  }
  const showTeacherDetail = (text) => {
    setTeacherDetail(text)
    // detailRef.current.showDetail(true);
  }
  useEffect(() => {
    setLoading(true)
    const res = React.$axios.get('/getTeacher').then((teacherData) => {
      setTableData(teacherData.data)
      setTotal(teacherData.total)
    })
    setLoading(false)
  }, [])
  return (
    <div className="teacher-management">
      <HeaderComponent title="教师管理" />

      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-box">
            <div className="filter-item">
              <span>教研室：</span>
              {/* <Select className="select-type" defaultValue='' onChange={value => setSelect({ ...select, section: value })}>
                <Option value=''>全部</Option>
                {
                  sectionData && sectionData.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))
                }
              </Select> */}
            </div>
            <div className="filter-item">
              <span>专职/兼职：</span>
              {/* <Select className="select-type" defaultValue='' onChange={value => setSelect({ ...select, job: value })}>
                <Option value=''>全部</Option>
                <Option value='0'>专职</Option>
                <Option value='1'>兼职</Option>
              </Select> */}
            </div>
            <div className="filter-item">
              <span>职务：</span>
              {/* <Select
                defaultValue=''
                className="select-type"
                onChange={value => setSelect({ ...select, position: value })}
              >
                <Option value=''>全部</Option>
                {
                  postJSON.post.map((c, index) => {
                    return <Option key={index} value={c.id}>{c.name}</Option>
                  })
                }
              </Select> */}
            </div>
          </div>
          <div className="search-box">
            <Input.Search placeholder="请输入教师编号或名称" onSearch={value => setQuery(value)} allowClear enterButton />
          </div>
        </div>

        <div className="button-wrap">
          <Button icon={<PlusOutlined />} type="primary">新增教师</Button>
          <Button icon={<DeleteOutlined />}>批量删除</Button>
          <Button icon={<UploadOutlined />}>批量导入</Button>
          <Button icon={<DownloadOutlined />}>批量导出</Button>
        </div>

        <div className="table-container">
          <Table
            dataSource={tableData}
            columns={teacherColumns}
            rowKey={record => record._id}
            loading={loading}
            pagination={paginationProps}
            expandedRowRender={record =>
              <div>
                <Descriptions
                  bordered
                  column={{ xs: 6, sm: 8, md: 8 }}
                  title="教师详细信息"
                >
                  <Descriptions.Item label="出生日期">
                    {record.birthday}
                  </Descriptions.Item>
                  <Descriptions.Item label="专职/兼职">
                    {record.job}
                  </Descriptions.Item>
                  <Descriptions.Item label="职位">
                    {record.position}
                  </Descriptions.Item>
                  <Descriptions.Item label="学历">
                    {record.lastInfo}
                  </Descriptions.Item>
                  <Descriptions.Item label="毕业院校">
                    {record.graduateSchool}
                  </Descriptions.Item>
                  <Descriptions.Item label="研究领域">
                    {record.researchDirection}
                  </Descriptions.Item>
                  <Descriptions.Item label="最后专业">
                    {record.professional}
                  </Descriptions.Item>
                  <Descriptions.Item label="最后学历毕业学位">
                    {record.degree}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
export default LeaderTeacher
