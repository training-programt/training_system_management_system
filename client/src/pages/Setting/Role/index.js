import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, message, Descriptions, List, Form, Input, Popconfirm } from 'antd';

const Role = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  const pageparams = {
    page: page,
    pageSize: 10,
    total: total,
  }
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  useMemo(() => {
    const fetchData = async () => {
      const res = await React.$axios.get(
        '/getRole',
      )
      setTableData(res.data);
    }
    fetchData();
  }, [page, isModalVisible])

  const columns = [
    {
      title: '序号',
      key: 'id',
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
      title: '账户',
      dataIndex: 'role',
      align: 'center'
    },
    {
      title: '账户名称',
      dataIndex: 'roleName',
      align: 'center'
    },
    {
      title: '操作',
      key: 'active',
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => showEditModal(record)}>编辑</Button>
          &emsp;
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delRole(record)}>
            <Button type="danger">删除</Button>
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
    let data = {
      _id: record._id,
      role: record.role,
      roleName: record.roleName,
    }
    form.setFieldsValue(data)
  }
  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
      menu: [],
    }
    if(!isEdit){
      const res = await React.$axios.post(
        '/addRole',
        params,
      );
      if (res && res.isSucceed) {
        message.success('新增成功');
        const res = await React.$axios.get(
          '/getRole',
        )
        setTableData(res.data);
      } else {
        message.error('新增失败');
      }
    }else{
      const res = await React.$axios.post(
        '/updateRole',
        params,
      );
      if (res && res.isSucceed) {
        message.success('修改成功');
        const res = await React.$axios.get(
          '/getRole',
        )
        setTableData(res.data);
      } else {
        message.error('修改失败');
      }
    }
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const delRole = async (record) => {
    const params = {
      _id: record._id
    }
    const res = await React.$axios.post('/delRole', params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      const res = await React.$axios.get(
        '/getRole',
      )
      setTableData(res.data);
    } else {
      message.error('删除失败');
    }
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>新增</Button>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        rowKey={record => record._id}
        expandedRowRender={record =>
          <div>
            <Descriptions
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="菜单展示">
                <List
                  bordered
                  size='small'
                  dataSource={record.menu}
                  renderItem={menu => (
                    <List.Item>
                      <span><i className={'menu-icon iconfont ' + menu.icon}></i></span>
                                  &emsp;&emsp;
                      {menu.name}
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        }
      />


      <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑账号' : '新增账号'}
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
          <Form.Item name="role" label="账户" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roleName" label="账户名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Role
