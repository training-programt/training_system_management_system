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
                for(let i = 0;i<record.role.length;i++){
                    sum = sum + record.role[i].roleName+'、'
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
                    <Popconfirm title='您确定删除当前数据吗？'>
                        <Button type="danger">删除</Button>
                    </Popconfirm>
                </div>
            )
        },
    ];
    const showEditModal = (record) => {

    }
    return (
        <div>
            <Button type="primary">新增</Button>
            <Table
                columns={columns}
                pagination={false}
                dataSource={tableData}
                loading={loading}
                rowKey={record => record._id}
                expandRowByClick={true}
                expandedRowRender={record =>
                    <div>
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                            <Descriptions.Item label="菜单展示">
                                <List
                                    bordered
                                    size='small'
                                    dataSource={record.menu}
                                    renderItem={menu => (
                                        <List.Item>
                                            <span><i className={'menu-icon iconfont ' + menu.icon}></i></span>
                                  &emsp;&emsp;
                                            {menu.name}
                                        </List.Item>
                                    )}
                                />
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                }
            />
        </div>
    )
}
export default User
