import React, { useState, useMemo } from 'react'
import { Button, Modal, message, Form, Input, Popconfirm, Select } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/apis/teachingInfo'
import { getSession } from '@/utils'

const TeachingInfo = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [pageSize, setPageSize] = useState(12)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [query, setQuery] = useState('')
  const [semester, setSemester] = useState('')
  const [semesterList, setSemesterList] = useState([])
  const [courseList, setCourseList] = useState([])
  const [teacherList, setTeacherList] = useState([])

  const tableSetting = {
    page: page,
    rows: pageSize,
    isMultiple: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
      },
    }
  };

  const pageparams = {
    page: page,
    pageSize: pageSize,
    total: total,
  }

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const getTeachingInfo = async () => {
    const params = {
      query: query,
      semester: semester,
      pageSize: pageSize,
      page: page,
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

  const getCourseList = async (record) => { // 根据学期筛选
    console.log(record)
    const res = await React.$axios.get(api.getCourseList)
    if (res && res.isSucceed) {
      setCourseList(res.data);
    }
  }

  const getSemesterList = async () => {
    const res = await React.$axios.get(api.getSemesterList)
    if (res && res.isSucceed) {
      setSemesterList(res.data);
    }
  }

  const getTeacherList = async () => {
    const res = await React.$axios.get(api.getTeacherList)
    if (res && res.isSucceed) {
      setTeacherList(res.data);
    }
  }

  useMemo(() => {
    getTeachingInfo()
  }, [page, query, semester])

  useMemo(() => {
    getSemesterList()
    getTeacherList()

  }, [])

  const columns = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
    },
    {
      title: '课程',
      dataIndex: 'basicCourse',
      render: (text, record) => record.course ? record.course.name : ''
    },
    {
      title: '学期',
      dataIndex: 'semester',
      render: (text, record) => record.semester ? record.semester.semesterName : ''
    },
    {
      title: '专业',
      dataIndex: 'major',
      render: (text, record) => record.major ? record.major.name : ''
    },
    {
      title: '班级',
      dataIndex: 'class',
      align: 'center'
    },
    {
      title: '授课教师',
      dataIndex: 'teacher',
      render: (text, record) => record.teacher ? record.teacher.name : ''
    },
    {
      title: '操作',
      key: 'active',
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Button type="link" onClick={() => showEditModal(record)}>编辑</Button>
          &emsp;
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delTeachingInfo(record)}>
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      )
    },
  ];

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
    setIsEdit(false)
  };

  const showEditModal = (record) => {
    getCourseList()
    setIsModalVisible(true);
    form.resetFields()
    setIsEdit(true)
    let temp = {
      ...record,
      course: record.course,
      teacher: record.teacher._id,
      semester: record.semester._id,
    }
    form.setFieldsValue(temp)
  }

  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
      major: JSON.parse(getSession('userInfo')).major,
    }
    if (!isEdit) {
      const res = await React.$axios.post(
        api.addTeachingInfo,
        params,
      );
      if (res && res.isSucceed) {
        message.success('新增成功');
        getTeachingInfo()
      } else {
        message.error('新增失败');
      }
    } else {
      const res = await React.$axios.post(
        api.updateTeachingInfo,
        params,
      );
      if (res.isSucceed) {
        message.success('修改成功');
        getTeachingInfo()
      } else {
        message.error('修改失败');
      }
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const delTeachingInfo = async (record) => {
    const params = {
      _id: record._id
    }
    const res = await React.$axios.post(api.delTeachingInfo, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getTeachingInfo()
    } else {
      message.error('删除失败');
    }
  }

  const delMoreTeachingInfo = async () => {
    if (!selectedRowKeys.length) {
      message.error('请选择项！')
      return false;
    }
    const params = {
      ids: selectedRowKeys.join(','),
    }
    const res = await React.$axios.post(api.delMoreTeachingInfo, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getTeachingInfo()
    } else {
      message.error('删除失败');
    }
  }

  return (
    <div className="page-container">
      <HeaderComponent title="授课信息管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="select-box">
            <Input.Search placeholder="请输入授课信息名称" allowClear enterButton onSearch={value => setQuery(value)} />
            <Select
              placeholder="请选择学期"
              showSearch
              allowClear
              onChange={value => setSemester(value)}
            >
              {
                semesterList.map(item => <Select.Option key={item._id} value={item._id}>{item.semesterName}</Select.Option>)
              }
            </Select>
          </div>
          <div className="operation-wrap">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增授课信息</Button>
            <Button type="primary" icon={<DeleteOutlined />} onClick={delMoreTeachingInfo}>批量删除</Button>
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
      <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑授课信息' : '新增授课信息'}
        centered
        maskClosable={false}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确定
          </Button>
        ]}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item name="semester" label="学期" rules={[{ required: true }]}>
            <Select
              placeholder="请选择学期"
              showSearch
              onSelect={getCourseList}
            >
              {
                semesterList.map(item => <Select.Option key={item._id} value={item._id}>{item.semesterName}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item name="course" label="课程" rules={[{ required: true, message: '请选择课程!' }]}>
            <Select
              placeholder="请选择课程"
              showSearch
            >
              {
                courseList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          {/* <Form.Item name="major" label="所属专业" rules={[{ required: true }]}>
            <Input placeholder="请输入专业" disabled />
          </Form.Item> */}
          <Form.Item name="teacher" label="授课教师" rules={[{ required: true }]}>
            <Select
              placeholder="请选择课程负责人"
              showSearch={getCourseList}
            >
              {
                teacherList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item name="class" label="班级" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TeachingInfo
