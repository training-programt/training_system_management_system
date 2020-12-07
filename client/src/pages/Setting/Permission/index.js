import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, Form, Input, message } from 'antd';
import api from '@/apis/base'

const Permission = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const pageparams = {
    page: page,
    pageSize: 10,
    total: total,
  }

  useMemo(() => {
    const fetchData = async () => {
      const params = {
        page: page,
        pageSize: 2,
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
  }, [page, isModalVisible])

  const columns = [
    {
      title: '序号',
      key: '_id',
      align: 'center',
      width: '8%',
      render: (text, record, index) => {
        let num = (pageparams.page - 1) * pageparams.pageSize + index + 1;
        if (num < pageparams.pageSize) {
          num = '0' + num
        }
        return num
      }
    },
    {
      title: '权限',
      dataIndex: 'permission',
      align: 'center'
    },
    {
      title: '权限名称',
      dataIndex: 'permissionName',
      align: 'center'
    },
    {
      title: '操作',
      key: 'active',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => showEditModal(record)}>编辑</Button>
        </div>
      )
    },
  ];

  const showEditModal = (record) => {
    console.log(record)
    setIsModalVisible(true)
    setIsEdit(true)
    form.setFieldsValue(record)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      '/addPermission',
      form.getFieldsValue(),
    );

    if (res && res.isSucceed) {
      message.success('新增成功');
    }
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>新增</Button>
      <Table columns={columns} hideOnSinglePage={true}  dataSource={tableData} loading={loading} rowKey='_id' />

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
          <Form.Item label={'权限'}
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
    </>
  )
}



export default Permission
