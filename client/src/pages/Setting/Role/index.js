import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, Descriptions, List, Form, Input, Tree } from 'antd';
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0',
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0-0',
        key: '0-1-0-0',
      },
      {
        title: '0-1-0-1',
        key: '0-1-0-1',
      },
      {
        title: '0-1-0-2',
        key: '0-1-0-2',
      },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const Role = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageparams = {
    page: page,
    pageSize: 10,
    total: total,
  }
  useMemo(() => {
    const fetchData = async () => {
      const res = await React.$axios.post('/allMenu')

      setTreeData(res.data)
    }
    fetchData()
  }, [])

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
      title: '角色',
      dataIndex: 'role',
      align: 'center'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center'
    },
    {
      title: '操作',
      key: 'active',
      align: 'center',
      width: '10%',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => this.showEditModal(record)}>编辑</Button>
        </div>
      )
    },
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
  };

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys, e) => {
    console.log(e.checkedNodes)
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>新增</Button>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        rowKey='_id'
        expandRowByClick={true}
        expandedRowRender={record =>
          <div>
            <Descriptions
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="拥有菜单">
                <List
                  bordered
                  size='small'
                  dataSource={record.permission}
                  renderItem={permission => (
                    <List.Item>
                      {permission.permission}
                                  &emsp;&emsp;
                      {permission.permissionName}
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
        title='创建角色'
        centered
        maskClosable={true}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            创建
          </Button>
        ]}
      >

        <Form {...formItemLayout} form={form}>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '角色不能为空' },]}
          >
            <Input
              maxLength={32}
              placeholder="请输入角色"
            />
          </Form.Item>
          <Form.Item
            label='角色名称'
            name="roleName"
            rules={[{ required: true, message: '角色名称不能为空' },]}
          >
            <Input
              maxLength={32}
              placeholder="请输入角色名称"
            />
          </Form.Item>
          <Form.Item
            label='菜单'
            name="menu"
          >
            <Tree
              style={{ height: '200px', overflow: 'auto' }}
              checkable
              onExpand={onExpand}
              defaultExpandAll
              onCheck={onCheck}
              onSelect={onSelect}
              checkedKeys={checkedKeys}
              selectedKeys={selectedKeys}
              treeData={treeData}
            />
          </Form.Item>
        </Form>




      </Modal>
    </>
  )
}

export default Role
