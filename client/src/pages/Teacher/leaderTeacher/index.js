import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Input, Select, Space, Button, Table, Drawer,Popconfirm, message,Form, Col, Row, DatePicker, Radio } from 'antd';
import HeaderComponent from '../../../components/header'
import postJSON from '@/public/json/post.json'
import './index.less'
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Option } = Select;

const LeaderTeacher = () => {

  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [teachRoomQuery, setTeachRoomQuery] = useState('');
  const [jobQuery, setJobQuery] = useState('');
  const [posQuery, setPosQuery] = useState('');
  const [name, setName] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [position, setPositionData] = useState([]);
  const [teacherDetail, setTeacherDetail] = useState({});
  const [pageSize, setPageSize] = useState(12)
  const [showSizeChanger, setShowSizeChanger] = useState(true);
  const [showQuickJumper, setShowQuickJumper] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [sexValue, setSexValue] = useState('女');
  const [jobValue, setJobValue] = useState('专职');
  const [courseData, setCourseData] = useState([]);
  const [majorData,setMajorData] = useState([]);
  const monthFormat = 'YYYY-MM';
  const teacherColumns = [
    { title: '序号', align: 'center', fixed: 'left', render: (text, record, index) => `${index + 1}` },
    { title: '姓名', dataIndex: 'name', align: 'center', fixed: 'left', },
    { title: '性别', dataIndex: 'sex', align: 'center', },
    { title: '生日', dataIndex: 'birthday', algin: 'center' },
    { title: '密码', dataIndex: 'password', align: 'center' },
    {
      title: '教研室', dataIndex: 'teachRoom', align: 'center',
      render: (text, record) => {
        return record.teachRoom ? record.teachRoom.name : ''
      }
    },
    {
      title: '所属专业', dataIndex: 'major', align: 'center',
      render: (text, record) => {
        return record.major ? record.major.name : ''
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
    { title: '专职/兼职', dataIndex: 'job', algin: 'center' },
    { title: '职务', dataIndex: 'position', algin: 'center' },
    { title: '学历', dataIndex: 'lastInfo', algin: 'center' },
    { title: '毕业院校', dataIndex: 'graduateSchool', algin: 'center' },
    { title: '研究领域', dataIndex: 'researchDirection', algin: 'center' },
    { title: '最后专业', dataIndex: 'professional', algin: 'center' },
    {
      title: '操作', key: 'action', fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="link" onClick={()=>showDrawer(record)}>信息修改</Button>
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delTeacher(record)}>
            <Button size="small" type="link">删除</Button>
          </Popconfirm>
        </Space >
      )
    },
  ];
  useEffect(() => {
    setLoading(true)
    const res = React.$axios.get('/getTeacher').then((teacherData) => {
      let pos = [];
      teacherData.data.map((item) => {
        pos.push(item.position)
      })
      setPositionData([...new Set(pos)]);
      setTableData(teacherData.data)
      setTotal(teacherData.total)
    })
    setLoading(false)
  }, [])
  useEffect(() => {
    const res = React.$axios.get('/getTeachRoom').then((roomData) => {
      setRoomData(roomData.data)
    })
    const courses = React.$axios.get('/getCourse').then((res) => {
      setCourseData(res.data)
    })
    const major = React.$axios.get('/getMajor').then((res)=>{
      setMajorData(res.data)
    })
  }, [])
  const pageparams = {
    page: page,
    pageSize: 10,
    total: total,
  }

  const rowSelection = {
    type: 'checkout',
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys([...selectedRows])
    },
  };
  const manyDelete = async()=>{
    const res = await React.$axios.post('/manyDelete',selectedRowKeys);
    console.log(res)
    if (res && res.isSucceed) {
      message.success('批量删除成功');
      const res = await React.$axios.get(
        '/getTeacher',
      )
      setTableData(res.data);
      setTotal(res.total)
    } else {
      message.error('批量删除失败');
    }
  }
  const onCloseDrawer = () => {
    setDrawerVisible(false)
  };
  const addTeacherDrawer = () => {
    setDrawerVisible(true);
    form.resetFields()
    setIsEdit(false)
  }
  const handleSub = async(e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      const res = await React.$axios.post(
        '/addTeacher',
        params,
      );
      if (res && res.isSucceed) {
        // console.log(res)
        message.success('新增成功');
        const res = await React.$axios.get(
          '/getTeacher',
        )
        setTableData(res.data);
        setTotal(res.total)
      } else {
        message.error('新增失败');
      }
    } else if(isEdit){
      const updata = await React.$axios.post('/updataTeacher',params);
      if (updata && updata.isSucceed) {
        // console.log(res)
        message.success('修改成功');
        const res = await React.$axios.get(
          '/getTeacher',
        )
        setTableData(res.data);
      } else {
        message.error('修改失败');
      }
    }
    setDrawerVisible(false)
  }
  //删除存在分页问题
  const delTeacher=async(record)=>{
    const params = {
      _id: record._id,
      teachRoom:record.teachRoom._id,
      major:record.major._id
    }
    const del = await React.$axios.post('/delTeacher', params)
    if (del && del.isSucceed) {
      message.success('删除成功');
      const res = await React.$axios.get(
        '/getTeacher',
      )
      setTableData(res.data);
      setTotal(res.total)
    } else {
      message.error('删除失败');
    }
  }
  const showDrawer = (record) => {
    form.resetFields()
    setDrawerVisible(true)
    setIsEdit(true)
    let data = {
      _id: record._id,
      name: record.name,
      password:record.password,
      sex:record.sex,
      birthday:record.birthday,
      // course:record.course[0]._id ? record.course[0]._id:'',
      job:record.job,
      position:record.position,
      lastInfo:record.lastInfo,
      graduateSchool:record.graduateSchool,
      researchDirection:record.researchDirection,
      professional:record.professional,
      degree:record.degree,
      // teachRoom:record.teachRoom._id ? record.teachRoom._id:'',
      // major:record.major._id ? record.major._id:''
    }
    form.setFieldsValue(data)
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
  //查询还有问题没有改
  const queryData = async() => {
    setLoading(true);
    const params = {
      teachRoom: teachRoomQuery,
      job:jobQuery,
      position:posQuery,
      name:name
    };
    const res = await React.$axios.post('/queryTeacher', params);
    setTableData(res.data)
    setLoading(false)
  }

  return (
    <div className="teacher-management">
      <HeaderComponent title="教师管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-box">
            <div className="filter-item">
              <Select className="select-type" placeholder="教研室" onChange={(e)=>{setTeachRoomQuery(e)}} allowClear>
                {
                  roomData && roomData.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                }
              </Select>
            </div>
            <div className="filter-item">
              <Select className="select-type" placeholder="专职/兼职" onChange={(e)=>setJobQuery(e)} allowClear>
                <Option value='专职'>专职</Option>
                <Option value='兼职'>兼职</Option>
              </Select>
            </div>
            <div className="filter-item">
              <Select
                placeholder="职位"
                className="select-type"
                onChange={(e)=>setPosQuery(e)}
                allowClear
              >
                {
                  position && position.map((item, index) => {
                    return <Option key={index} value={item}>{item}</Option>
                  })
                }
              </Select>
            </div>
            <div className="filter-item">
              <Input className="select-type" placeholder="请输入教师姓名" onChange={e => setName(e.target.value)} allowClear />
            </div>
            <Button type="primary" icon={<SearchOutlined />} onClick={queryData}>查询</Button>
            <Button icon={<PlusOutlined />} type="primary" onClick={addTeacherDrawer}>新增教师</Button>
          </div>

        </div>

        <div className="button-wrap">
          <Button icon={<DeleteOutlined />} onClick={manyDelete}>批量删除</Button>
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
            // scroll={{y: 1500}}
            rowSelection={rowSelection}
          />
        </div>
        <Drawer
          title={isEdit ? '信息修改' : '新增老师'}
          width={720}
          onClose={onCloseDrawer}
          visible={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={handleSub} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark form={form}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true, message: '请输入教师名字!' }]}
                >
                  <Input placeholder="请输入教师名字" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="密码"
                >
                  <Input
                    placeholder="请输入教师密码"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {/* <Row> */}
              <Col span={12}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      name="sex"
                      label="性别"
                    >
                      <Radio.Group value={sexValue}>
                        <Radio value='男'>男</Radio>
                        <Radio value='女'>女</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="job"
                      label="专职/兼职"
                    >
                      <Radio.Group value={jobValue}>
                        <Radio value='专职'>专职</Radio>
                        <Radio value='兼职'>兼职</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              {/* </Row> */}
              <Col span={12}>
                <Form.Item
                  name="position"
                  label="职位"
                >
                  <Select
                    placeholder="请选择职位"
                  >
                    {
                      position && position.map((item, index) => {
                        return <Option key={index} value={item}>{item}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="出生年月"
                >
                  <Input placeholder="请输入教师出生年月（1999-02）" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="degree"
                  label="最后学历毕业学位"
                >
                  <Input placeholder="请输入教师最后学历毕业学位" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="course"
                  label="拟授课程"
                >
                  <Select
                    style={{ width: 320 }}
                    placeholder="请选择拟授课程"
                    mode="multiple"
                    allowClear
                  >
                    {courseData && courseData.map(item => {
                      return <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastInfo"
                  label="最后学历"
                >
                  <Input placeholder="请输入教师最后学历" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="graduateSchool"
                  label="毕业院校"
                >
                  <Input placeholder="请输入教师毕业院校" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="researchDirection"
                  label="研究领域"
                >
                  <Input placeholder="请输入教师研究领域" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="professional"
                  label="最后的专业"
                >
                  <Input placeholder="请输入教师毕业最后的专业" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="major"
                  label="所属专业"
                >
                 <Select placeholder="所属专业" onChange={(e)=>setTeachRoomQuery(e)} allowClear>
                {
                  majorData && majorData.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                }
              </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="teachRoom"
                  label="所属教研室"
                >
                  <Select placeholder="请选择所属教研室" allowClear>
                {
                  roomData && roomData.map(item => (<Option key={item._id} value={item._id}>{item.name}</Option>))
                }
              </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </div>
  )
}
export default LeaderTeacher
