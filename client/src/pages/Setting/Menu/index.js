import React, { useState, useMemo } from 'react'
import { Table, Form, message, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';
import PaginationComponent from '@/components/pagination'
import HeaderComponent from '@/components/header'
// import TableComponent from '@/components/table'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const Menu = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [menuId, setMenuId] = useState('');
  const [level, setLevel] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [showSizeChanger, setShowSizeChanger] = useState(true);
  const [showQuickJumper, setShowQuickJumper] = useState(true)
  const [query, setQuery] = useState('')

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
      title: '组键路由',
      dataIndex: 'path',
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
      title: '角色',
      dataIndex: 'role',
      align: 'center',
      render: (text, record) => {
        return record.role.roleName
      }
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

  const getMenuList = async () => {
    const params = {
      page: page,
      pageSize: 10,
      name: query,
    }
    setLoading(true);
    const res = await React.$axios.post(
      `/allMenu`,
      params
    )
    setTableData(res.data);
    setTotal(res.total);
    setLoading(false);
  }

  useMemo(() => {
    getMenuList()
  }, [query])

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
    form.resetFields()
    setIsModalVisible(true)
    setIsEdit(true)
    console.log(record)
    let data = {
      _id: record._id,
      name: record.name,
      path: record.path,
      icon: record.icon,
      role: record.role._id,
      sort: record.sort
    }
    form.setFieldsValue(data)
  }

  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
      level: level,
      // parent: menuId,
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
    } else if (isEdit) {
      const res = await React.$axios.post(
        '/updataMenu',
        params,
      );
      if (res && res.isSucceed) {
        message.success('更新成功');
      } else {
        message.error('更新失败');
      }
    }
    getMenuList()
    setIsModalVisible(false);
  };

  const singleDelete = async (record) => {
    const params = {
      _id: record._id,
      parent: menuId,
      role: record.role
    }
    const res = await React.$axios.post('/delMenu', params)
    if (res && res.isSucceed) {
      message.success('删除成功');
      // await React.$axios.get(`/menu?role=${JSON.parse(getSession('userInfo')).role}`)
    } else {
      message.error('删除失败');
    }
    getMenuList()
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelect = (selectedKeys, info) => {
    setMenuId(info ? info.value : '');
    setLevel(info ? info.level + 1 : 1)
  }

  const changeRole = async (selectedKeys, info) => {
    // console.log(selectedKeys,info)
    const params = {
      _id: selectedKeys
    }
    const menu = await React.$axios.post('/menuData', params)
    // setMenuData([])
    console.log(menu.data)
    setMenuData(menu.data)
  }

  const renderTreeNode = (treeNode = menuData) => {
    return treeNode.map((v, i) => {
      return (
        <TreeSelect.TreeNode
          value={v._id}
          title={v.name}
          key={v._id}
          level={v.level}
        >
          {v.children.length !== 0 && renderTreeNode(v.children)}
        </TreeSelect.TreeNode>
      );
    });
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
  };

  //分页设置
  const paginationProps = {
    showSizeChanger,//设置每页显示数据条数
    showQuickJumper,
    pageSize,
    total,  //数据的总的条数
    onChange: (current) => changePage(current), //点击当前页码
    onShowSizeChange: (current, pageSize) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      onShowSizeChange(current, pageSize)
    }
  }
  const changePage = (current) => {
    //current参数表示是点击当前的页码，
    // this.getData(current) //向后端发送请求
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize)
  }
  return (
    <div className="page-container">
      <HeaderComponent title="菜单管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入菜单名称" onSearch={value => setQuery(value)} allowClear enterButton />
          </div>
          <div className="operation-wrap">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增菜单</Button>
            <Button type="primary" icon={<DeleteOutlined />}>批量删除</Button>
          </div>
        </div>
        <div className="table-wrap">
          <Table
            dataSource={tableData}
            rowKey={record => record._id}
            columns={columns}
            loading={loading}
            pagination={paginationProps} />
        </div>
      </div>
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
        <Form {...formItemLayout} form={form}>
          {/* {
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
          } */}
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
              onSelect={changeRole}
            >
              {roleData.map((item, index) => {
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
              onChange={() => setLevel(level)}
              onSelect={onSelect}
            >
              {renderTreeNode()}
            </TreeSelect>
          </Form.Item>
          <Form.Item
            label='菜单级别'
            name="level">
            {level}级菜单
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
            name="path"
            rules={[
              { required: true, message: '组件路由不能为空' },
              { pattern: '^[^ ]+$', message: '组件路由不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              placeholder="请输入组件路由"
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
    </div>
  )
}



export default Menu
