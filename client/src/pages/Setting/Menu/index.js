import React, { useState, useMemo } from 'react'
import { Table, Form, message, Radio, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import PaginationComponent from '@/components/pagination'
import TableComponent from '@/components/table'
import './index.less'

const Menu = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [permission, setPermission] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [menuId, setMenuId] = useState('');
  const [level, setLevel] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [deleteList, setDeleteList] = useState();
  const [roleData, setRoleData] = useState([]);
  const [roleRadioValue, setRoleRadioValue] = useState();
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
      title: '菜单类型',
      dataIndex: 'level',
      align: 'center',
      render: (text, record) => {
        return record.children === undefined || record.children.length === 0 ? '菜单' : '目录'
      }
    },
    {
      title: '组键路由',
      dataIndex: 'path',
      align: 'center'
    },
    {
      title: '名称',
      dataIndex: 'title',
      align: 'center'
    },
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
      title: '排序',
      dataIndex: 'sort',
      align: 'center'
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
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => singleDelete(record)}>
            <Button type="link">删除</Button>
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
      const res = await React.$axios.get(
        '/getPermission',
      )
      setPermission(res.data);
    }
    fetchData();
  }, [isModalVisible])

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
    setRoleRadioValue()
    setIsModalVisible(true)
    setIsEdit(true)
    setLevel(record.level - 1)
    let data = {
      _id: record._id,
      name: record.name,
      path: record.path,
      icon: record.icon,
      permission: record.permission._id || record.permission,
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
    const res = await React.$axios.post(
      '/addMenu',
      params,
    );

    if (res && res.isSucceed) {
      message.success('新增成功');
    }
    setIsModalVisible(false);
  };

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
          title={v.title}
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

  const onShowSizeChange = (current, size) => {
    console.log(current, size)
    setPageSize(size)
  }

  return (
    <div className="menu-container">
      <div className="body-wrap">
        <div className="filter-container">
          <div className="search-box">
            <Input.Search placeholder="请输入菜单名称" allowClear enterButton />
          </div>
          <div className="button-wrap">
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>新增菜单</Button>
            <Button icon={<DeleteOutlined />} >批量删除</Button>
          </div>
        </div>
        <div className="table-container">
          <TableComponent data={tableData} column={columns} settings={tableSetting} loading={loading} />
        </div>
        <PaginationComponent pageparams={pageparams} onShowSizeChange={(current, size) => onShowSizeChange(current, size)} handlePage={v => setPage(v)} />
      </div>
      {/* <Table columns={columns} pagination={false} dataSource={tableData} loading={loading} rowKey='_id' /> */}

      <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑菜单' : '创建菜单'}
        centered
        maskClosable={true}
        destroyOnClose
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
            name="parent"
            label="上级菜单"
          >
            <TreeSelect
              style={{ width: '250px' }}
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
          <Form.Item label='当前类型'>
            {level === 0 ? '1 级菜单' : level + 1 + '级菜单'}
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
              placeholder="请输入菜单"
            />
          </Form.Item>
          <Form.Item
            label='页面所属'
            name="type"
            rules={[
              { required: true },
            ]}
          >
            <Radio.Group onChange={e => setRadioValue(e.target.value)}>
              <Radio value={1}>公共页面</Radio>
              <Radio value={2}>角色页面</Radio>
            </Radio.Group>
          </Form.Item>
          {
            radioValue == 2
              ? (
                <Form.Item
                  label='页面角色'
                  name="role"
                  rules={[
                    { required: true },
                  ]}
                >
                  <Radio.Group onChange={e => setRoleRadioValue(e.target.value)}>
                    {
                      roleData.map(item => <Radio value={item._id}>{item.roleName}</Radio>)
                    }
                  </Radio.Group>
                </Form.Item>
              )
              : ''
          }
          <Form.Item
            label='组件页面'
            name="path"
            rules={[
              { required: true, message: '组键路由不能为空' },
              { pattern: '^[^ ]+$', message: '组键路由不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              placeholder="请输入组键路由"
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
              maxLength={32}
              placeholder="请选择菜单图标"
            />
          </Form.Item>
          <Form.Item
            label='权限'
            name="permission"
            rules={[
              { required: true, message: '权限不能为空' },
              { pattern: '^[^ ]+$', message: '权限不能有空格' }
            ]}
          >
            <Select
              style={{ width: 200 }}
              placeholder="请选择权限"
            >
              {permission.map(per => {
                return <Select.Option value={per._id} key={per._id}>{per.permissionName}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label='排序'
            name="sort"
            rules={[
              { required: true, message: '排序不能为空' }
            ]}
            initialValue={0}
          >
            <InputNumber min={0} />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}



export default Menu
