import React, { useState, useMemo } from 'react'
import { Table, Form, message, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';

const menuIcon = {
  color: '#000',
  fontWeight: 700,
  fontSize: '16px',
  marginRight: '12px',
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
    title: '组键页面',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'name',
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
  // {
  //     title: '权限名称',
  //     dataIndex: 'permission',
  //     align: 'center',
  //     render: text =>{
  //        return text.permissionName
  //     }
  // },
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
        <Button type="primary" onClick={() => this.showEditModal(record)}>编辑</Button>
              &emsp;
        <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => this.singleDelete(record)}>
          <Button type="danger">

            删除
                  </Button>
        </Popconfirm>
      </div>
    )
  },
];

const Menu = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [permission, setPermission] = useState([]);
  const [menuId, setMenuId] = useState('');
  const [level, setLevel] = useState(0);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
      level: level + 1,
      parent: menuId,

    }
    const res = await axios.post(
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
      <Table columns={columns} dataSource={tableData} loading={loading} rowKey='_id' />

      <Modal
        visible={isModalVisible}
        width={550}
        title='创建菜单'
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
            label='组件页面'
            name="key"
            rules={[
              { required: true, message: '组键页面不能为空' },
              { pattern: '^[^ ]+$', message: '组键页面不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              placeholder="请输入组键页面"
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
    </>
  )
}



export default Menu
