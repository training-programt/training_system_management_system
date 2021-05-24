import React, { useState, useMemo } from 'react';
import { message, Input, Button, Modal, Form, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import HeaderComponent from '../../../components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import api from '@/apis/course'

import './index.less'

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(12)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [queryName, setQueryName] = useState('')
  const [queryCode, setQueryCode] = useState('')

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

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  const courseColumns = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
    },
    {
      title: '课程名字',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: '学分',
      dataIndex: 'credits',
      align: 'center',
    },
    {
      title: '总学时',
      dataIndex: 'all',
      align: 'center',
    },
    {
      title: '理论学时',
      dataIndex: 'within',
      align: 'center',
    },
    {
      title: '实践学时',
      dataIndex: 'outside',
      align: 'center',
    },
    {
      title: '课外学时',
      dataIndex: 'computer',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => { edit(record) }}>编辑</Button>
          <Button type="link" onClick={() => { del(record) }}>删除</Button>
          {/* <Button type="link" onClick={() => { showDrawer(record) }}>详情查看</Button> */}
        </div>
      ),
    },
  ];

  const showAdd = () => {
    setIsEdit(false)
    setVisible(true);
    form.resetFields()
  };
  //编辑
  const edit = (record) => {
    setIsEdit(true)
    setVisible(true);
    form.resetFields()
    let data = {
      ...record
    }
    form.setFieldsValue(data)
  };
  
  const manyDelete = async () => {
    const res = await React.$axios.post(api.delMoreCourse, selectedRowKeys);
    console.log(res)
    if (res.isSucceed) {
      message.success('批量删除成功');
      getCourseData()
      setPage(1)
    } else {
      message.error('批量删除失败');
    }
  }

  const del = async (record) => {
    const params = {
      _id: record._id,
    }
    const res = await React.$axios.post(api.delCourse, params)
    if (res.isSucceed) {
      message.success(res.message);
      getCourseData()
      setPage(1)
    } else {
      message.error(res.message);
    }
  };

  const handleOk = async (e) => {
    setConfirmLoading(true);
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      const add = await React.$axios.post(
        api.addCourse,
        params,
      );
      if (add.isSucceed) {
        message.success("新增成功")
        getCourseData()
      } else {
        message.error("新增失败")
      }
    } else if (isEdit) {
      const res = await React.$axios.post(
        api.updateCourse,
        params,
      );
      if (res.isSucceed) {
        message.success('修改成功');
        getCourseData()
      } else {
        message.error(res.message);
      }
    }
    setVisible(false);

  };

  const handleCancel = () => {
    setVisible(false);
  };

  const getCourseData = async () => {
    const params = {
      queryName: queryName,
      queryCode: queryCode,
      pageSize: pageSize,
      page: page,
    }
    setLoading(true);
    const res = await React.$axios.get(`${api.getCourse}?${React.$qs.stringify(params)}`);
    setLoading(false)
    if (res && res.isSucceed) {
      setCourseData(res.data)
      setTotal(res.total)
    }
  }

  useMemo(() => {
    getCourseData();
  }, [page, queryName, queryCode])

  return (
    <div className="page-container">
      <HeaderComponent title="课程管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入课程名" allowClear enterButton onSearch={value => setQueryName(value)} />
            <Input.Search placeholder="请输入课程编码" allowClear enterButton onSearch={value => setQueryCode(value)} />
          </div>
          <div className="operation-wrap">
            <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增课程</Button>
            <Button type="primary" icon={<DeleteOutlined />} onClick={manyDelete}>批量删除</Button>
            {/* <Button icon={<UploadOutlined />}>批量导入</Button>
            <Button icon={<DownloadOutlined />}>批量导出</Button> */}
          </div>
        </div>

        <div className="table-container">
          <TableComponent
            data={courseData}
            column={courseColumns}
            settings={tableSetting}
            loading={loading}
          />
        </div>
        <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
      </div>
      <Modal
        title={isEdit ? "编辑信息" : "新增课程"}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        getContainer={false}
        destroyOnClose
        width={600}
        className='course-modal'
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
              </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确认
              </Button>
        ]}
      >
        <Form hideRequiredMark form={form} {...formLayout} >
          <Form.Item
            name="name"
            label="课程名字"
            rules={[{ required: true, message: '请输入名字!' }]}
          >
            <Input placeholder="请输入课程名字" />
          </Form.Item>
          <Form.Item name="code" label="课程代码" rules={[{ required: true, message: '请输入课程代码!' }]}>
            <Input placeholder="请输入课程代码" />
          </Form.Item>
          <Form.Item
            name="credits"
            label="学分"
          >
            <Input placeholder="请输入课程学分" />
          </Form.Item>
          <Form.Item
            name="all"
            label="总学时"
          >
            <InputNumber
              min={0}
              style={{ width: '200px' }}
            />
          </Form.Item>
          <Form.Item
            name="within"
            label="理论学时"
          >
            <InputNumber
              min={0}
              style={{ width: '200px' }}
            />
          </Form.Item>
          <Form.Item
            name="computer"
            label="课外学时"
          >
            <InputNumber
              min={0}
              style={{ width: '200px' }}
            />
          </Form.Item>
          <Form.Item
            name="outside"
            label="实践学时"
          >
            <InputNumber
              min={0}
              style={{ width: '200px' }}
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}
export default Course;