import React, { useState, useMemo } from 'react'
import { Button, Modal, message, Form, Input, Popconfirm, Row, Col, Radio, Select } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/apis/courseSystem'
import { getSession } from '@/utils'

const CourseSystem = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [grade, setGrade] = useState('')
  const [courseType, setCourseType] = useState('')
  const [courseList, setCourseList] = useState([])
  const [gradeList, setGradeList] = useState([])
  const [courseTypeList, setCourseTypeList] = useState([])
  const [teacherList, setTeacherList] = useState([])

  const tableSetting = {
    page: page,
    rows: 12,
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
    pageSize: tableSetting.rows,
    total: total,
  }

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const getCourseSystem = async () => {
    const params = {
      grade: '',
      courseType: '',
      pageSize: tableSetting.rows,
      page: page,
    }
    setLoading(true)
    const res = await React.$axios.get(
      `${api.getCourseSystem}?${React.$qs.stringify(params)}`
    )
    setLoading(false)
    if (res && res.isSucceed) {
      setTableData(res.data);
      setTotal(res.total)
    }
  }

  const getCourseList = async () => {
    const res = await React.$axios.get(api.getCourseList)
    if (res && res.isSucceed) {
      setCourseList(res.data);
    }
  }

  const getGradeList = async () => {
    const res = await React.$axios.get(api.getGradeList)
    if (res && res.isSucceed) {
      setGradeList(res.data);
    }
  }

  const getCourseTypeList = async () => {
    const res = await React.$axios.get(api.getAllCourseType)
    if (res && res.isSucceed) {
      setCourseTypeList(res.data);
    }
  }

  const getTeacherList = async () => {
    const res = await React.$axios.get(api.getTeacherList)
    if (res && res.isSucceed) {
      setTeacherList(res.data);
    }
  }

  useMemo(() => {
    getCourseSystem()
  }, [page, grade])

  useMemo(() => {
    getCourseList()
    getGradeList()
    getCourseTypeList()
    getTeacherList()
  }, [])

  const columns = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
    },
    {
      title: '课程名称',
      dataIndex: 'basicCourse',
      render: (text, record) => record.course.name
    },
    {
      title: '年级',
      dataIndex: 'grade',
      render: (text, record) => record.grade.name
    },
    {
      title: '开课学期',
      dataIndex: 'semester',
      align: 'center',
    },
    {
      title: '专业',
      dataIndex: 'major',
      render: (text, record) => record.major.name
    },
    {
      title: '课程类型',
      dataIndex: 'courseType',
      render: (text, record) => record.courseType.name
    },
    {
      title: '课程负责人',
      dataIndex: 'leader',
      render: (text, record) => record.leader.name
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
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delCourseSystem(record)}>
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
    setIsModalVisible(true);
    form.resetFields()
    setIsEdit(true)
    let temp = {
      ...record,
      course: record.course._id,
      leader: record.leader._id,
      grade: record.grade._id,
      courseType: record.courseType._id,
    }
    console.log(temp)
    form.setFieldsValue(temp)
  }

  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
      major: JSON.parse(getSession('userInfo')).major,
      semester: 1,
    }
    console.log(params)
    if (!isEdit) {
      const res = await React.$axios.post(
        api.addCourseSystem,
        params,
      );
      if (res && res.isSucceed) {
        message.success('新增成功');
        getCourseSystem()
      } else {
        message.error('新增失败');
      }
    } else {
      const res = await React.$axios.post(
        api.updateCourseSystem,
        params,
      );
      if (res.isSucceed) {
        message.success('修改成功');
        getCourseSystem()
      } else {
        message.error('修改失败');
      }
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const delCourseSystem = async (record) => {
    const params = {
      _id: record._id
    }
    const res = await React.$axios.post(api.delCourseSystem, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getCourseSystem()
    } else {
      message.error('删除失败');
    }
  }

  const delMoreCourseSystem = async () => {
    if (!selectedRowKeys.length) {
      message.error('请选择项！')
      return false;
    }
    const params = {
      ids: selectedRowKeys.join(','),
    }
    const res = await React.$axios.post(api.delMoreCourseSystem, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getCourseSystem()
    } else {
      message.error('删除失败');
    }
  }

  return (
    <div className="page-container">
      <HeaderComponent title="课程体系管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="select-box">
            {/* <Input.Search placeholder="请输入课程体系名称" allowClear enterButton onSearch={value => setQuery(value)} /> */}
            <Select
              placeholder="请选择课程类型"
              showSearch
              allowClear
              onChange={value => setCourseType(value)}
            >
              {
                courseTypeList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
            <Select
              placeholder="请选择年级"
              showSearch
              allowClear
              onChange={value => setGrade(value)}
            >
              {
                gradeList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </div>
          <div className="operation-wrap">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增课程体系</Button>
            <Button type="primary" icon={<DeleteOutlined />} onClick={delMoreCourseSystem}>批量删除</Button>
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
        width={560}
        title={isEdit ? '编辑课程体系' : '新增课程体系'}
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
        <Form hideRequiredMark form={form} {...layout} >
          <Form.Item
            name="course"
            label="课程"
            rules={[{ required: true, message: '请选择课程!' }]}
          >
            <Select
              placeholder="请选择课程"
              showSearch
            >
              {
                courseList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: '请输入年级!' }]}
          >
            <Select
              placeholder="请选择年级"
              showSearch
            >
              {
                gradeList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="semester"
            label="开课学期"
          >
            <Input placeholder="请输入开课学期" disabled />
          </Form.Item> */}

          {/* <Form.Item
            name="major"
            label="所属专业"
          >
            <Input placeholder="请输入专业" disabled />
          </Form.Item> */}
          <Form.Item name="courseType" label="课程类型">
            <Select
              placeholder="请选择课程类型"
              showSearch
            >
              {
                courseTypeList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item name="leader" label="课程负责人" rules={[{ required: true, message: '请选择课程负责人!' }]}>
            <Select
              placeholder="请选择课程负责人"
              showSearch
            >
              {
                teacherList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="engineeringCertification"
            label="是否工程认证"
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="degreeCourses"
            label="是否学位课"
          >
            <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CourseSystem
