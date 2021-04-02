import React, { useState, useMemo } from 'react'
import { Button, Modal, message, Form, Input, Popconfirm } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '@/apis/auditApproval'
import { Link } from 'react-router-dom';

const Audit = () => {
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

  const getAuditList = async () => {
    const params = {
      query: query,
      pageSize: pageSize,
      page: page,
    }
    setLoading(true)
    const res = await React.$axios.get(
      `${api.getAuditList}?${React.$qs.stringify(params)}`
    )
    setLoading(false)
    if (res && res.isSucceed) {
      setTableData(res.data);
      setTotal(res.total)
    }
  }

  useMemo(() => {
    getAuditList()
  }, [page, query])

  const columns = [
    {
      title: '课程',
      dataIndex: 'name',
    },
    {
      title: '测试',
      dataIndex: 'name',
      render: (text, record) => '测试'
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
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delAudit(record)}>
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
    form.setFieldsValue(record)
  }

  // const handleOk = async (e) => {
  //   e.preventDefault();

  //   const params = {
  //     ...form.getFieldValue(),
  //   }
  //   if (!isEdit) {
  //     const res = await React.$axios.post(
  //       api.addAudit,
  //       params,
  //     );
  //     if (res && res.isSucceed) {
  //       message.success('新增成功');
  //       getAuditList()
  //     } else {
  //       message.error('新增失败');
  //     }
  //   } else {
  //     const res = await React.$axios.post(
  //       api.updateAudit,
  //       params,
  //     );
  //     if (res.isSucceed) {
  //       message.success('修改成功');
  //       getAuditList()
  //     } else {
  //       message.error('修改失败');
  //     }
  //   }

  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const delAudit = async (record) => {
    const params = {
      _id: record._id
    }
    const res = await React.$axios.post(api.delAudit, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getAuditList()
    } else {
      message.error('删除失败');
    }
  }

  const delMoreAudit = async () => {
    if (!selectedRowKeys.length) {
      message.error('请选择项！')
      return false;
    }
    const params = {
      ids: selectedRowKeys.join(','),
    }
    const res = await React.$axios.post(api.delMoreAudit, params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      getAuditList()
    } else {
      message.error('删除失败');
    }
  }

  return (
    <div className="page-container">
      <HeaderComponent title="审核管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入审核名称" allowClear enterButton onSearch={value => setQuery(value)} />
          </div>
          <div className="operation-wrap">
            <Link to="/auditApproval/auditDetail"><Button type="primary" icon={<PlusOutlined />}>新增审核</Button></Link>
            <Button type="primary" icon={<DeleteOutlined />} onClick={delMoreAudit}>批量删除</Button>
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
      {/* <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑审核' : '新增审核'}
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
          <Form.Item name="name" label="审核" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}

    </div>
  )
}

export default Audit
