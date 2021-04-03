import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Input, Select, Space, Button, Table, Drawer, Popconfirm, message, Form, Col, Row, DatePicker, Radio } from 'antd';
import HeaderComponent from '../../../components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import api from '@/apis/teacher'

const LeaderTeacher = () => {

  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [teachRoom, setTeachRoom] = useState('')
  const [job, setJob] = useState('')
  const [teachName, setTeachName] = useState('')
  const [pageSize, setPageSize] = useState(12)
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [teachRoomData, setTeachRoomData] = useState([])
  const [majorData, setMajorData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const teacherColumns = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (page - 1) * pageSize}`,
    },
    { title: '姓名', dataIndex: 'name', align: 'center', fixed: 'left', },
    {
      title: '所属教研室', dataIndex: 'teachRoom', align: 'center',
      render: (text, record) => {
        return record.teachRoom ? record.teachRoom.name : ''
      }
    },
    { title: '专职/兼职', dataIndex: 'job', algin: 'center' },
    { title: '职务', dataIndex: 'position', algin: 'center' },
    { title: '学历', dataIndex: 'lastInfo', algin: 'center' },
    {
      title: '操作', key: 'action', fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="link" onClick={() => showDrawer(record)}>信息修改</Button>
          {/* <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delTeacher(record)}> */}
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delTeacher(record)}>
            <Button size="small" type="link" >删除</Button>
          </Popconfirm>
        </Space >
      )
    },
  ];

  const tableSetting = {
    page: page,
    rows: pageSize,
    isMultiple: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys) => {
        console.log(selectedRowKeys)
        setSelectedRowKeys(selectedRowKeys)
      },
    }
  };

  const pageparams = {
    page: page,
    pageSize: pageSize,
    total: total,
  }

  const getTeacherData = async () => {
    setLoading(true);
    const params = {
      job,
      teachRoom,
      teachName,
      pageSize,
      page,
    }
    const res = await React.$axios.get(
      `${api.getTeacher}?${React.$qs.stringify(params)}`
    )
    setLoading(false)
    if (res && res.isSucceed) {
      setTableData(res.data);
      setTotal(res.total);
    }
  }

  const getTeachRoom = async () => {
    const res = await React.$axios.get(api.getTeachRoom);
    if (res && res.isSucceed) {
      setTeachRoomData(res.data)
    }
  }

  const getMajorData = async () => {
    const res = await React.$axios.get(api.getMajorData);
    if (res && res.isSucceed) {
      setMajorData(res.data)
    }
  }

  useMemo(() => {
    getTeacherData()
  }, [teachName, job, page])

  useMemo(() => {
    getTeachRoom()
    getMajorData()
  }, [])


  // const manyDelete = async () => {
  //   const res = await React.$axios.post('/manyDelete', selectedRowKeys);
  //   console.log(res)
  //   if (res && res.isSucceed) {
  //     message.success('批量删除成功');
  //     const res = await React.$axios.get(
  //       '/getTeacher',
  //     )
  //     setTableData(res.data);
  //     setTotal(res.total)
  //   } else {
  //     message.error('批量删除失败');
  //   }
  // }
  const onCloseDrawer = () => {
    setDrawerVisible(false)
    form.resetFields()
  };

  const addTeacherDrawer = () => {
    setDrawerVisible(true);
    form.resetFields()
    setIsEdit(false)
  }

  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if (isEdit) {
      const res = await React.$axios.post(api.updateTeacher, params)
      if (res && res.isSucceed) {
        message.success('修改成功');
        getTeacherData()
      } else {
        message.error('修改失败');
      }
    } else {
      const res = await React.$axios.post(api.addTeacher, params)
      if (res && res.isSucceed) {
        message.success('新增成功')
        getTeacherData()
      } else {
        message.error('新增失败')
      }
    }
    setDrawerVisible(false)
  }

  const showDrawer = (record) => {
    form.resetFields()
    setDrawerVisible(true)
    setIsEdit(true)
    let data = {
      ...record,
      teachRoom: record.teachRoom ? record.teachRoom._id : ''
    }
    console.log(data)
    form.setFieldsValue(data)
  }

  const delTeacher = async (record) => {
    const params = {
      _id: record._id
    }
    const res = await React.$axios.post(api.delTeacher, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getTeacherData()
    } else {
      message.error('删除失败');
    }
  }

  const delMore = async () => {
    if (!selectedRowKeys.length) {
      message.error('请选择项！')
      return false;
    }
    const res = await React.$axios.post(api.manyDelete, selectedRowKeys)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getTeacherData()
    } else {
      message.error('删除失败');
    }
  }


  return (
    <div className="page-container">
      <HeaderComponent title="教师管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="select-box">
            <Select
              placeholder="教研室"
              showSearch
              onChange={value => setTeachRoom(value)}
              allowClear
            >
              {
                teachRoomData.map(item => (<Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>))
              }
            </Select>
            <Select
              placeholder="专职/兼职"
              allowClear
              showSearch
              onChange={value => setJob(value)}
            >
              <Select.Option value='专职'>专职</Select.Option>
              <Select.Option value='兼职'>兼职</Select.Option>
            </Select>
          </div>
          <div className="search-box">
            <Input.Search placeholder="请输入教师姓名" allowClear enterButton onSearch={value => setTeachName(value)} />
          </div>
          <div className="operation-wrap">
            <Button icon={<PlusOutlined />} type="primary" onClick={addTeacherDrawer}>新增教师</Button>
            <Button icon={<DeleteOutlined />} onClick={delMore}>批量删除</Button>
            <Button icon={<UploadOutlined />}>批量导入</Button>
            <Button icon={<DownloadOutlined />}>批量导出</Button>
          </div>
        </div>
        <div className="table-container">
          <TableComponent
            data={tableData}
            column={teacherColumns}
            settings={tableSetting}
            loading={loading}
          />
        </div>
        <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
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
              取消
              </Button>
            <Button onClick={handleOk} type="primary">
              新增
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
            <Col span={12}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="sex"
                    label="性别"
                  >
                    <Radio.Group>
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
                    <Radio.Group>
                      <Radio value='专职'>专职</Radio>
                      <Radio value='兼职'>兼职</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
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
                    teachRoomData.map(item => (<Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>))
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
                name="lastInfo"
                label="最后学历"
              >
                <Input placeholder="请输入教师最后学历" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="graduateSchool"
                label="毕业院校"
              >
                <Input placeholder="请输入教师毕业院校" />
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
                name="researchDirection"
                label="研究领域"
              >
                <Input placeholder="请输入教师研究领域" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

    </div>
  )
}
export default LeaderTeacher
