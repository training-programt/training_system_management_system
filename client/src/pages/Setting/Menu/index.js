import React, { useState, useMemo } from 'react'
import { Table, Form, message, Radio, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';

const Menu = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [menuId, setMenuId] = useState('');
  const [level, setLevel] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [roleData, setRoleData] = useState([]);
  const [roleRadioValue, setRoleRadioValue] = useState();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '菜单类型',
      dataIndex: 'level',
      align: 'center',
      render: (text, record) => {
        return record.level === 1 ? '一级目录' : '子目录'
      }
    },
    {
      title: '组件页面名称',
      dataIndex: 'key',
      align: 'center'
    },

    // {
    //   title: '角色',
    //   dataIndex: 'role',
    //   align: 'center',
    //   render: (text, record) => {
    //     return record.role.roleName
    //   }
    // },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
      render: text => {
        return (
          <div>
            <span><i style={menuIcon} className={'iconfont ' + text}></i></span>
                    &emsp;
            {text}
          </div>
        )
      }
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
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => singleDelete(record)}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        </div>
      )
    },
  ];
  const menuIcon = {
    color: '#000',
    fontWeight: 700,
    fontSize: '16px',
    marginRight: '12px',
  }

  useMemo(() => {
    const fetchData = async () => {
      const params = {
        page: page,
        pageSize: 10,
      }
      setLoading(true);
      const res = await React.$axios.post(
        '/allMenu',
        params
      )
      setTableData(res.data);
      setTotal(res.total);
      setLoading(false);
    }
    fetchData();
  }, [page, isModalVisible])

  useMemo(() => {
    const fetchData = async () => {
      const res = await React.$axios.get('/getRole')
      setRoleData(res.data);
    }
    fetchData();
  }, [])

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
    setIsEdit(false)
  };

  const showEditModal = (record) => {
    console.log(record)
    form.resetFields()
    setIsModalVisible(true)
    setIsEdit(true)
    let data = {
      _id: record._id,
      name: record.name,
      key: record.key,
      icon: record.icon,
      role: record.role.roleName,
      sort: record.sort
    }
    form.setFieldsValue(data)
  }

  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
      level: level + 1,
      parent: menuId,
      roleRadioValue,
    }
    if (!isEdit) {
      const res = await React.$axios.post(
        '/addMenu',
        params,
      );
      if (res && res.isSucceed) {
        message.success('新增成功');
      } else {
        message.error('新增失败');
      }
    }
    setIsModalVisible(false);
  };


  const singleDelete = async (record) => {
    const params = {
      _id: record._id
    }
    const res = await React.$axios.post('/delMenu', params)
    if (res && res.isSucceed) {
      message.success('删除成功');
    } else {
      message.error('删除失败');
    }
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelect = (selectedKeys, info) => {
    setMenuId(info ? info.value : '');
    setLevel(info ? info.level : 0)
  }

  const renderTreeNode = (treeNode = tableData) => {
    if (!treeNode || !treeNode.length) {
      return;
    }
    return treeNode.map((v, i) => {
      return (
        <TreeSelect.TreeNode
          value={v._id}
          title={v.name}
          key={v._id}
          level={v.level}
        >
          {v.children && renderTreeNode(v.children)}
        </TreeSelect.TreeNode>
      );
    });
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>新增</Button>
      <Table columns={columns} pagination={false} dataSource={tableData} loading={loading} rowKey='_id' />

      <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑菜单' : '新建菜单'}
        centered
        maskClosable={true}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确认
          </Button>
        ]}
      >
        <Form {...formItemLayout} form={form} initialValues={{ belong: radioValue }}>
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
            label='选择账户'
            name="role"
            rules={[
              { required: true },
            ]}
          >
            <Select
              style={{ width: 300 }}
              placeholder="请选择账户"
            >
              {roleData.map(item => {
                return <Select.Option value={item._id} key={item._id}>{item.roleName}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="parent"
            label="上级菜单"
          >
            <TreeSelect
              style={{ width: '300px' }}
              dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
              placeholder="请选择上级菜单"
              allowClear
              treeDefaultExpandAll
              onChange={() => setLevel(0)}
              onSelect={onSelect}
            >
              {renderTreeNode()}
            </TreeSelect>
          </Form.Item>
          <Form.Item
            label='菜单名称'
            name="name"
            rules={[
              { required: true, message: '菜单不能为空' },
              { pattern: '^[^ ]+$', message: '菜单不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              style={{ width: 300 }}
              placeholder="请输入菜单"
            />
          </Form.Item>
          <Form.Item
            label='组件页面'
            name="key"
            rules={[
              { required: true, message: '组键页面不能为空' },
              { pattern: '^[^ ]+$', message: '组键页面不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              style={{ width: 300 }}
              placeholder="请输入组键页面名称"
            />
          </Form.Item>
          <Form.Item
            label='菜单图标'
            name="icon"
            rules={[
              { required: true, message: '菜单图标不能为空' },
              { pattern: '^[^ ]+$', message: '菜单图标不能有空格' }
            ]}
          >
            <Input
              style={{ width: 300 }}
              maxLength={32}
              placeholder="请输入菜单图标"
            />
          </Form.Item>
          <Form.Item
            label='位置'
            name="sort"
            rules={[
              { required: true, message: '位置不能为空' }
            ]}
            initialValue={0}
          >
            <InputNumber min={0} />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}



export default Menu
