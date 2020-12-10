import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, Descriptions, List } from 'antd';

const Role = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageparams = {
    page: page,
    pageSize: 10,
    total: total,
  }

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
      ></Modal>
    </>
  )
}

export default Role
