import React, { useState, useRef, useMemo } from 'react';
import { Table, Form, message, Radio, Descriptions, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import ImportComponent from '../../../components/importExport/import'
const { Option } = Select;

const User = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    useMemo(() => {
        const fetchData = async () => {
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
        }
        fetchData();
    }, [page, isModalVisible])
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
                    <Button type="primary" onClick={() => this.showEditModal(record)}>编辑</Button>
                    &emsp;
                    <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delTeacher(record)}>
                        <Button type="danger">删除</Button>
                    </Popconfirm>
                </div>
            )
        },
    ];
    const showEditModal = (record) => {

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
  
    return (
        <div>
            <ImportComponent/>
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
        </div>
    )
}
export default User
