import React, { useState, useMemo } from 'react'
import { Input, Button, Modal, Form, Space, List } from 'antd';
import HeaderComponent from '@/components/header'
// import TableComponent from '@/components/table'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import api from "@/apis/nationalRequirement";

const GraduationRequirement = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // const tableSetting = {
  //   page: 1,
  //   rows: 10,
  //   rowSelection: {
  //     type: 'checkbox',
  //     onChange: (selectedRowKeys) => {
  //       setDeleteList(selectedRowKeys)
  //     },
  //   }
  // }

  // const columns = [
  //   {
  //     title: '标题',
  //     dataIndex: 'national_name',
  //     width: 150,
  //     align: 'center'
  //   },
  //   {
  //     title: '描述',
  //     dataIndex: 'nation_description',
  //     ellipsis: 'true',
  //   },
  //   {
  //     title: '操作',
  //     key: 'active',
  //     align: 'center',
  //     width: 200,
  //     render: (text, record) => (
  //       <Space size='small'>
  //         <Button onClick={() => showEditModal(record)} type="link">编辑</Button>
  //         <Button type="link">删除</Button>
  //       </Space>
  //     )
  //   },
  // ];

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await React.$axios.get(
        api.getNationalRequirement,
      )
      console.log('------------')
      console.log(res)
      setTableData(res.data);
      setLoading(false);
    }
    fetchData();
  }, [query, isModalVisible])

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      const res = await React.$axios.post(
        api.addNationalRequirement,
        params,
      );
      console.log(res)
    }

    setIsModalVisible(false);
  }

  const showEditModal = (record) => {
    form.resetFields()
    setIsModalVisible(true)
    setIsEdit(true)
    console.log(record)
    form.setFieldsValue(record)
  }

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
    setIsEdit(false)
  };

  const delRequirement = async (record) => {
    const params = {
      _id: record._id,
    }
    const res = await React.$axios.post(
      api.delNationalRequirement,
      params,
    );
  }

  const listStyle = {
    padding: '20px',
    overflow: 'auto'
  }

  return (
    <div className="page-container">
      <HeaderComponent title="国家毕业要求管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入毕业要求名称" onSearch={value => setQuery(value)} allowClear enterButton />
          </div>
          <div className="operation-wrap">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增要求</Button>
            <Button type="primary" icon={<DeleteOutlined />}>批量删除</Button>
          </div>
        </div>
        <div className='table-wrap' style={listStyle}>
          {/* <TableComponent data={tableData} column={columns} settings={tableSetting} loading={loading} /> */}
          <List
            itemLayout="horizontal"
            dataSource={tableData}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit" onClick={() => showEditModal(item)}>编辑</a>, 
                  <a key="list-loadmore-more" onClick={() => delRequirement(item)}>删除</a>
                ]}
              >
                <List.Item.Meta
                  title={'毕业要求' + (index + 1) + '：' + item.national_name}
                  description={item.nation_description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        width={680}
        title={isEdit ? '编辑要求' : '新建要求'}
        centered
        maskClosable={true}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>确认</Button>
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
            label='要求名称'
            name="national_name"
            rules={[
              { required: true, message: '名称不能为空' },
              { pattern: '^[^ ]+$', message: '名称不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              style={{ width: 300 }}
              placeholder="请输入要求名称"
            />
          </Form.Item>
          <Form.Item
            label='要求描述'
            name="nation_description"
            rules={[
              { required: true, message: '菜单图标不能为空' },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder="请输入要求描述"
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}

export default GraduationRequirement
