import React, { useState, useRef, useMemo } from 'react';
import { Table, Form, message, Radio, Descriptions, Select, InputNumber, TreeSelect, Input, Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import ImportExportComponent from '../../../components/importExport/importExport'
import HeaderComponent from '@/components/header'
import '../index.less'

const { Option } = Select;

const User = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(12)
    const [roleData, setRoleData] = useState([]);
    const [importData, setImportData] = useState();

    const [showSizeChanger, setShowSizeChanger] = useState(true);
    const [showQuickJumper, setShowQuickJumper] = useState(true)
    useMemo(() => {
        const fetchData = async () => {
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
        }
        fetchData();
    }, [pageSize, isModalVisible])
    useMemo(() => {
        const fetchData = async () => {
            const res = await React.$axios.get('/getRole')
            setRoleData(res.data);
        }
        fetchData();
    }, [])
    // const initColumn = [{
    //     title: '姓名',
    //     dataIndex: 'name',
    //     key: 'name',
    //     className: 'text-monospace',
    // }, {
    //     title: '年级',
    //     dataIndex: 'grade',
    //     key: 'grade',
    // }, {
    //     title: '部门',
    //     dataIndex: 'department',
    //     key: 'department',
    // }];


    // let attendanceInfoList = [
    //     {
    //         name: "张三",
    //         grade: "2017级",
    //         department: "前端部门"

    //     },
    //     {
    //         name: "李四",
    //         grade: "2017级",
    //         department: "程序部门"

    //     }];

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
    const importHandle = async (data) => {
        var params = []
        data.forEach(element => {
            params.push({
                name: element['姓名'],
                sex: element['性别'],
                birthday: element['出生年月'],
                job: element['专职/兼职'],
                position: element['专业技术职务'],
                lastInfo: element['学历'],
                graduateSchool: element['最后学历毕业学校'],
                professional: element['最后学历毕业专业'],
                researchDirection: element['研究领域'],
                degree: element['最后学历毕业学位']
            })
        })
        // console.log(params)
        const res = await React.$axios.post('/addTeacher', params);
        if (res && res.isSucceed) {
            message.success('添加成功');
            const res = await React.$axios.get(
                '/getTeacher',
            )
            setTableData(res.data);
            setTotal(res.total);
        } else {
            message.error('添加失败');
        }
    };
    // const exportHandle= async(data)=>{
    //     const res = await React.$axios.get('/getTeacher');
    //     console.log(res)
    // }
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
        <div className="page-container">
            <HeaderComponent title="用户管理" />
            <div className="body-wrap">
                <div className="header-wrap">
                    <div className="search-box">
                        <Input.Search placeholder="请输入用户姓名" allowClear enterButton />
                    </div>
                    <div className="operation-wrap">
                        <ImportExportComponent onImport={(data) => importHandle(data)} />
                        <Button type="primary" icon={<PlusOutlined />}>新增用户</Button>
                        <Button type="primary" icon={<DeleteOutlined />}>批量删除</Button>
                    </div>
                </div>

                <div className="table-wrap">
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={tableData}
                        loading={loading}
                        pagination={paginationProps}
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
            </div>
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
