import React, { useState, useRef, useMemo } from 'react';
import { Table, Form, message, Radio, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

const User = () => {

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
            //   render: (text, record) => {
            //     return record.role.roleName
            //   }
        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: '20%',
            render: (text, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary">编辑</Button>
                    &emsp;
                    <Popconfirm title='您确定删除当前数据吗？'>
                        <Button type="danger">删除</Button>
                    </Popconfirm>
                </div>
            )
        },
    ];
    useMemo(() => {
        const fetchData = async () => {
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
            console.log(res.data)
        }
        fetchData();
    }, [page, isModalVisible])
    return (
        <div>
            <Button type="primary">新增</Button>
            <Table 
            columns={columns} 
            pagination={false} 
            dataSource={tableData} 
            loading={loading} 
            rowKey={record => record._id} />
        </div>
    )
}
export default User
