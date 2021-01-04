import React, { useState, useRef, useMemo } from 'react';
import { Table, Form, message, Radio, Descriptions, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import ImportComponent from '../../../components/importExport/import'
const { Option } = Select;

const User = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [roleData, setRoleData] = useState([]);

    useMemo(() => {
        const fetchData = async () => {
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
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
    const columns = [
        {
            title: '名字',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '密码',
            dataIndex: 'password',
            align: 'center'
        },
        {
            title: '角色',
            dataIndex: 'role',
            align: 'center',
            render: (text, record) => {
                let sum = ''
                for (let i = 0; i < record.role.length; i++) {
                    sum = sum + record.role[i].roleName + '、'
                }
                return sum
            }
        },
        {
            title: '操作',
            align: 'center',
            width: '20%',
            render: (text, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" onClick={() => showEditModal(record)}>编辑</Button>
                    &emsp;
                    <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delTeacher(record)}>
                        <Button type="danger">删除</Button>
                    </Popconfirm>
                </div>
            )
        },
    ];
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 },
    };
    const showEditModal = (record) => {
        form.resetFields()
        console.log(record)
        setIsModalVisible(true)
        let data = {
            _id: record._id,
            name: record.name,
            password: record.password,
            role: record.role.roleName,
        }
        form.setFieldsValue(data)
    }
    const delTeacher = async (record) => {
        const params = {
            _id: record._id
        }
        const res = await React.$axios.post('/delTeacher', params)
        if (res && res.isSucceed) {
            message.success('删除成功');
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
            setTotal(res.total);
        } else {
            message.error('删除失败');
        }
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk = async (e) => {
        e.preventDefault();

        const params = {
            ...form.getFieldValue(),
        }
        const res = await React.$axios.post(
            '/updataTeacher',
            params,
        );
        if (res && res.isSucceed) {
            message.success('修改成功');
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
            setTotal(res.total);
        } else {
            message.error('修改失败');
        }
        setIsModalVisible(false);
    };

    return (
        <div>
            <ImportComponent />
            <Button type="primary" icon={<DownloadOutlined />}>
                导出
            </Button>
            <Table
                columns={columns}
                pagination={false}
                dataSource={tableData}
                loading={loading}
                rowKey={record => record._id}
                expandedRowRender={record =>
                    <div>
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                            <Descriptions.Item label="信息展示还没写">
                                {record.lastInfo}
                            </Descriptions.Item>
                            <Descriptions.Item label="信息展示">
                                {record.position}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                }
            />
            <Modal
                visible={isModalVisible}
                width={550}
                title='信息编辑'
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
                        确认
              </Button>
                ]}
            >
                <Form form={form} {...formItemLayout}>
                    <Form.Item name="name" label="名字" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='选择账户'
                        name="role"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Select
                            style={{ width: 310 }}
                            placeholder="请选择账户"
                            mode="multiple"
                            allowClear
                        >
                            {roleData.map(item => {
                                return <Select.Option value={item._id} key={item._id}>{item.roleName}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default User
