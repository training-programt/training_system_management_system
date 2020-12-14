import React, { useState, useMemo } from 'react'
import { Button, Modal, Form, Space, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import PaginationComponent from '@/components/pagination'
import TableComponent from '@/components/table'

import api from '@/apis/base'
import './index.less'

const Permission = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [refresh, setRefresh] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [deleteList, setDeleteList] = useState();
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pageparams = {
    page: page,
    pageSize: pageSize,
    total: total,
  }

  const tableSetting = {
    page: 1,
    rows: 10,
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys) => {
        setDeleteList(selectedRowKeys)
      },
    }
  }

  const columns = [
    {
      title: '序号',
      key: '_id',
      align: 'center',
      width: 65,
      render: (text, record, index) => <div align='center'>{index + 1 + (tableSetting.page - 1) * tableSetting.rows}</div>
    },
    { title: '权限', dataIndex: 'permission' },
    { title: '权限名称', dataIndex: 'permissionName' },
    {
      title: '操作', key: 'action', width: '10%',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="link" onClick={() => showEditModal(record)}>编辑</Button>
          <Button size='small' type="link" onClick={() => showDeleteModel(record)}>删除</Button>
        </Space>
      )
    },
  ];

  useMemo(() => {
    const fetchData = async () => {
      const params = {
        page: page,
        pageSize: pageparams.pageSize,
        search: search
      }
      setLoading(true);
      const res = await React.$axios.get(
        `${api.getPermissionList}?${React.$qs.stringify(params)}`
      )
      setTableData(res.data);
      setTotal(res.total);
      setLoading(false);
    }
    fetchData();
  }, [page, pageSize, isModalVisible, search, refresh])

  const showEditModal = (record) => {
    setIsModalVisible(true)
    setIsEdit(true)
    form.setFieldsValue(record)
  }

  const deletePermission = async (record) => {
    const params = record._id ? { ids: record._id + '' } : { ids: deleteList.join(',') }
    const res = await React.$axios.post(
      '/deletePermission',
      params,
    );
    if (res && res.isSucceed) {
      message.success('删除成功')
      setRefresh(!refresh)
    } else {
      message.error('删除失败')
      setRefresh(!refresh)
    }
  }

  const showDeleteModel = (record) => {
    Modal.confirm({
      title: '是否删除所选数据？',
      icon: <ExclamationCircleOutlined />,
      maskClosable: true,
      okText: '确认',
      cancelText: '取消',
      onOk: () => deletePermission(record),
    });
  }

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
    setIsEdit(false)
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await React.$axios.post(
      '/updatePermission',
      form.getFieldsValue(),
    );

    if (res && res.isSucceed) {
      message.success(isEdit ? '修改成功' : '新增成功');
    } else {
      message.error(res.message);
    }
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEdit(false)
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
  };
  const onShowSizeChange = (current, size) => {
    console.log(current, size)
    setPageSize(size)
  }

  return (
    <div className="permission-container">
      <div className="body-wrap">
        <div className="filter-container">
          <div className="search-box">
            <Input.Search placeholder="请输入权限名称" onSearch={value => setSearch(value)} allowClear enterButton />
          </div>
          <div className="button-wrap">
            <Button icon={<PlusOutlined />} size='middle' type="primary" onClick={showModal}>新增权限</Button>
            <Button icon={<DeleteOutlined />} onClick={deletePermission} >批量删除</Button>
          </div>
        </div>
        <div className="table-container">
          <TableComponent data={tableData} column={columns} settings={tableSetting} loading={loading} />
        </div>
        <PaginationComponent pageparams={pageparams} onShowSizeChange={(current, size) => onShowSizeChange(current, size)} handlePage={v => setPage(v)} />
      </div>
      <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑权限' : '创建权限'}
        centered
        maskClosable={true}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        <Form {...formItemLayout} form={form}>
          {
            isEdit ? (
              <Form.Item
                name="_id"
                label="ID"
              >
                <Input
                  maxLength={32}
                  disabled
                />
              </Form.Item>
            ) : ''
          }
          <Form.Item
            name="permission"
            label="权限"
            rules={[{ required: true, message: '行业不能为空' },]}
          >
            <Input
              maxLength={32}
              placeholder="请输入权限"
            />
          </Form.Item>
          <Form.Item
            label='权限名称'
            name="permissionName"
            rules={[{ required: true, message: '行业不能为空' },]}
          >
            <Input
              maxLength={32}
              placeholder="请输入权限名称"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}



export default Permission
