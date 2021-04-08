import React, { useState, useMemo, useEffect } from 'react'
import { Button,message, Select } from 'antd';
import HeaderComponent from '@/components/header'
import PaginationComponent from '@/components/pagination'
import TableComponent from "@/components/table";
import { SearchOutlined } from '@ant-design/icons';
import api from '@/apis/courseSystem'
import { getSession } from '@/utils'
import {  useHistory } from "react-router-dom";

const ShowCourse = () => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [grade, setGrade] = useState('')
    const [courseType, setCourseType] = useState('')
    const [gradeList, setGradeList] = useState([])
    const [courseTypeList, setCourseTypeList] = useState([])

    const tableSetting = {
        page: page,
        rows: 12,
        isMultiple: true,
        rowSelection: {
            type: 'checkbox',
            onChange: (selectedRowKeys) => {
                setSelectedRowKeys(selectedRowKeys)
            },
        }
    };

    const pageparams = {
        page: page,
        pageSize: tableSetting.rows,
        total: total,
    }

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        const teacher = JSON.parse(getSession('userInfo'));
        const params = {
            _id: teacher._id
        }
        React.$axios.post('/findCourseSystem', params).then((data) => {
            // console.log(data)
            setCourseData(data.data)
        })
       React.$axios.get(api.getGradeList).then(res=>{
            if (res && res.isSucceed) {
                setGradeList(res.data);
            }
        })
        React.$axios.get(api.getAllCourseType).then(res1=>{
            if (res1 && res1.isSucceed) {
                setCourseTypeList(res1.data);
            }
        })
    }, [])
    const columns = [
        {
            width: 50,
            render: (text, record, index) =>
                `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
        },
        {
            title: '课程名称',
            dataIndex: 'basicCourse',
            render: (text, record) => record.course?.name
        },
        {
            title: '年级',
            dataIndex: 'grade',
            render: (text, record) => record.grade?.name
        },
        {
            title: '开课学期',
            dataIndex: 'semester',
            align: 'center',
        },
        {
            title: '专业',
            dataIndex: 'major',
            render: (text, record) => record.major?.name
        },
        {
            title: '课程类型',
            dataIndex: 'courseType',
            render: (text, record) => record.courseType?.name
        },
        {
            title: '课程负责人',
            dataIndex: 'leader',
            render: (text, record) => record.leader?.name
        },
        {
            title: '操作',
            key: 'active',
            align: 'center',
            width: '20%',
            render: (text, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Button type="link" onClick={() => { showSyllabus(record) }}>查看课程大纲</Button>
                </div>
            )
        },
    ];
    const showSyllabus = (record) => {
        React.$axios.post('/findSyllabus', { courseSystemId: record._id }).then((sys) => {
            if (sys.isSucceed) {
                history.push(`/syllabus/show?id=${sys.data[0]._id}`);
            } else {
                message.error(sys.message)
            }
        })
    }
    const search=()=>{
        let params = {
            courseType:courseType,
            grade:grade
        }
        console.log(params)
        const courseSystem = React.$axios.post('/queryCourseSystem', params).then((data) => {
            console.log(data)
            setCourseData(data.data)
        })
    }
    return (
        <div className="page-container">
            <HeaderComponent title="课程体系管理" />
            <div className="body-wrap">
                <div className="header-wrap">
                    <div className="select-box">
                        <Select
                            placeholder="请选择课程类型"
                            allowClear
                            onChange={value => setCourseType(value)}
                        >
                            {
                                courseTypeList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
                            }
                        </Select>
                        <Select
                            placeholder="请选择年级"
                            allowClear
                            onChange={value => setGrade(value)}
                        >
                            {
                                gradeList.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
                            }
                        </Select>
                        <Button type="primary" icon={<SearchOutlined />} onClick={search}>查找</Button>
                    </div>
                </div>
                <div className="table-container">
                    <TableComponent
                        data={courseData}
                        column={columns}
                        settings={tableSetting}
                        loading={loading}
                    />
                </div>
                <PaginationComponent pageparams={pageparams} handlePage={v => setPage(v)} />
            </div>
        </div>
    )
}

export default ShowCourse
