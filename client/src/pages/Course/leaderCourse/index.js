import React, { useState, useEffect } from 'react';
import { Drawer, Table, Select, Row, Col, message, Radio, Input, Button, Modal, Form, InputNumber, Popconfirm, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import HeaderComponent from '../../../components/header'

import './index.less'

const Course = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);//弹窗新增和编辑
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const [pageSize, setPageSize] = useState(12)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showSizeChanger, setShowSizeChanger] = useState(true);
  const [showQuickJumper, setShowQuickJumper] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [header, setHeaderData] = useState([]);
  const [semester, setSemesterData] = useState([]);
  const [attrValue, setAttrValue] = useState("必修")
  const [cateValue, setCateValue] = useState("理论课");
  const [college, setCollegeData] = useState([]);
  const [system, setSystemData] = useState([]);
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 },
  }
  const courseColumns = [
    { title: '序号', align: 'center', fixed: 'left', render: (text, record, index) => `${index + 1}` },
    {
      title: '课程名字',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '课程编码',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: '课程负责人',
      dataIndex: 'header',
      align: 'center',
      render: (text, record) => {
        return record.header ? record.header.name : ''
      }
    },
    {
      title: '开课单位',
      dataIndex: 'unit',
      align: 'center',
      render: (text, record) => {
        return record.unit ? record.unit.name : ''
      }
    },
    {
      title: '开课学期',
      dataIndex: 'semester',
      align: 'center',
      render: (text, record) => {
        return record.semester ? record.semester.semesterName : ''
      }
    },
    {
      title: '是否产教融合课程',
      dataIndex: 'flag_fuse',
      align: 'center',
      render: text => text == true ? '是' : '否'
    },
    {
      title: '课程大纲',
      dataIndex: 'syllabus',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button type="link">课程大纲查看</Button>
        </div>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={()=>{edit(record)}}>编辑</Button>
          <Button type="link" onClick={() => { del(record) }}>删除</Button>
          <Button type="link" onClick={() => { showDrawer(record) }}>详情查看</Button>
        </div>
      ),
    },
  ];
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
  const rowSelection = {
    type: 'checkout',
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys)
      setSelectedRowKeys([...selectedRows])
    },
  };
  //新增
  const showAdd = () => {
    setIsEdit(false)
    setVisible(true);
    form.resetFields()
  };
  //编辑
  const edit = (record) => {
    setIsEdit(true)
    setVisible(true);
    form.resetFields()
    let data = {
      _id: record._id,
      name: record.name,
      code: record.code,
      // header: record.header?record.header.name:"",
      // unit: record.unit?record.unit.name:"",
      type: record.type,
      // semester: record.semester?record.semester.semesterName:"",
      weekly_hours: record.weekly_hours,
      within: record.within,
      credits: record.credits,
      outside: record.outside,
      computer: record.computer,
      other: record.other,
      nature: record.nature,
      attribute: record.attribute,
      category: record.category,
      degree: record.degree,
      direction: record.direction,
      introduce: record.introduce,
      // system:record.system?record.system.name:"",
      course_selection_group: record.course_selection_group,
      assessment_method: record.assessment_method,
      flag_fuse: record.flag_fuse
    }
    form.setFieldsValue(data)
  };
  //详情查看
  const showDrawer = (record) => {
    console.log(record)
    setDrawerData({
      _id: record._id,
      name: record.name,
      code: record.code,
      header: record.header?record.header.name:"",
      unit: record.unit?record.unit.name:"",
      type: record.type,
      semester: record.semester ? record.semester.semesterName : "",
      weekly_hours: record.weekly_hours,
      within: record.within,
      outside: record.outside,
      computer: record.computer,
      other: record.other,
      nature: record.nature,
      attribute: record.attribute,
      category: record.category,
      degree: record.degree,
      direction: record.direction,
      introduce: record.introduce,
      system:record.system?record.system.name:"",
      course_selection_group: record.course_selection_group,
      assessment_method: record.assessment_method,
      flag_fuse: record.flag_fuse
    })
    setDrawerVisible(true)
  };
  const manyDelete = async()=>{
    const res = await React.$axios.post('/delMany',selectedRowKeys);
    console.log(res)
    if (res.isSucceed) {
      message.success('批量删除成功');
      const res = await React.$axios.get(
        '/getCourse',
      )
      setCourseData(res.data);
      setTotal(res.total)
    } else {
      message.error('批量删除失败');
    }
  }
  const onClose = () => {
    setDrawerVisible(false)
  };
  //删除
  const del = async (record) => {
    const params = {
      _id: record._id,
    }
    const res = await React.$axios.post('/delCourse', params)
    if (res.isSucceed) {
      message.success(res.message);
      const newCourse = await React.$axios.get(
        '/getCourse'
      )
      setCourseData(newCourse.data);
    } else {
      message.error(res.message);
    }
  };
  const handleOk = async (e) => {
    setConfirmLoading(true);
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      const add = await React.$axios.post(
        '/addCourse',
        params,
      );
      if (add.isSucceed) {
        message.success("新增成功")
        const newCourse = await React.$axios.get(
          '/getCourse'
        )
        setCourseData(newCourse.data);
      } else {
        message.error("新增失败")
      }
    } else if (isEdit) {
      const res = await React.$axios.post(
        '/updateCourse',
        params,
      );
      if (res.isSucceed) {
        message.success('修改成功');
        const res = await React.$axios.get(
          '/getCourse'
        )
        setCourseData(res.data);
      } else {
        message.error(res.message);
      }
    }
    setVisible(false);

  };

  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    setLoading(true)
    const res = React.$axios.get('/getCourse').then((courseData) => {
      setCourseData(courseData.data)
      setTotal(courseData.total)
    })
    const res1 = React.$axios.get('/getTeacher').then((teacherData) => {
      setHeaderData(teacherData.data)
    })
    const newSem = React.$axios.get('/getSemester').then((newSemester) => {
      setSemesterData(newSemester.data);
    })
    const newCollege = React.$axios.get('/getCollege').then((newCollege) => {
      setCollegeData(newCollege.data);
    })
    const newCollegeSystem = React.$axios.get('/getCourseSystem').then((system) => {
      setSystemData(system.data);
    })
    setLoading(false)
  }, [])

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  return (
    <div className="courseInsLeader">
      <HeaderComponent title="课程管理" />
      <div className="body-wrap">
        <div className="queryContent">
          <div className="inputContent">
            <Input placeholder="请输入课程名" />
            <Input placeholder="请输入课程编码" />
            <Input placeholder="请输入任课教师" />
          </div>
          <Button type="primary" icon={<SearchOutlined />} >查询</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAdd}>新增</Button>
          <Button icon={<DeleteOutlined />} onClick={manyDelete}>批量删除</Button>
          <Button icon={<UploadOutlined />}>批量导入</Button>
          <Button icon={<DownloadOutlined />}>批量导出</Button>
        </div>
        <Modal
          title={isEdit ? "编辑信息" : "新增课程"}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          getContainer={false}
          destroyOnClose
          width={1000}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
              </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              确认
              </Button>
          ]}
        >
          <Form layout="vertical" hideRequiredMark form={form} {...formLayout} >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="课程名字"
                  rules={[{ required: true, message: '请输入名字!' }]}
                >
                  <Input placeholder="请输入课程名字" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="code" label="课程代码" rules={[{ required: true, message: '请输入课程代码!' }]}>
                  <Input placeholder="请输入课程代码" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="semester"
                  label="开课学期"
                >
                  <Select
                    placeholder="请选择开课学期"
                  >
                    {
                      semester && semester.map((item, index) => {
                        return <Select.Option key={index} value={item._id}>{item.semesterName}</Select.Option>
                      })
                    }
                  </Select>
                </Form.Item>

              </Col>
              <Col span={12}>
                <Form.Item
                  name="unit"
                  label="所属学院"
                >
                  <Select
                    placeholder="请选择学院"
                  >
                    {
                      college && college.map((item, index) => {
                        return <Select.Option key={index} value={item._id}>{item.name}</Select.Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="type" label="课程类型">
                      <Input placeholder="请输入课程类型" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="header" label="课程负责人" rules={[{ required: true, message: '请选择课程负责人!' }]}>
                      <Select
                        placeholder="请选择课程负责人"
                        showSearch
                        optionFilterProp="children"
                      >
                        {
                          header && header.map((item, index) => {
                            return <Select.Option key={index} value={item._id}>{item.name}</Select.Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="weekly_hours"
                      label="参考周学时"
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="within"
                      label="课内学时"
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>

                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="computer"
                      label="上机学时"
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="outside"
                      label="课外学时"
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>

              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="other"
                      label="其他学时"
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={12}>

                    <Form.Item
                      name="category"
                      label="课程类别"
                    >
                      <Radio.Group value={cateValue}>
                        <Radio value='理论课'>理论课</Radio>
                        <Radio value='实践课'>实验课</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="credits"
                      label="学分"
                    >
                      <Input placeholder="请输入课程学分" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="degree"
                      label="是否学位课"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="nature"
                      label="课程性质"
                    >
                      <Input placeholder="请输入课程性质" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="system"
                      label="课程体系"
                    >
                      <Select
                        placeholder="请选择课程体系"
                      >
                        {
                          system && system.map((item, index) => {
                            return <Select.Option key={index} value={item._id}>{item.name}</Select.Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="course_selection_group"
                  label="分配选课组"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="direction"
                  label="所属方向"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="attribute"
                  label="课程属性"
                >
                  <Radio.Group value={attrValue}>
                    <Radio value='选修'>选修</Radio>
                    <Radio value='必修'>必修</Radio>
                    <Radio value='限选'>限选</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Table
          dataSource={courseData}
          columns={courseColumns}
          bordered
          rowKey={record => record._id}
          pagination={paginationProps}
          rowSelection={rowSelection}
        >
        </Table>
        <Drawer
          width={640}
          title="课程详细信息"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={drawerVisible}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            课程信息
          </p>
          <p className="site-description-item-profile-p">基本信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程名字" content={drawerData.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程编码" content={drawerData.code} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程类别" content={drawerData.type} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程负责人" content={drawerData.header} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="开课单位" content={drawerData.unit} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="是否学位课" content={drawerData.degree ? '是' : '否'} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="考核方式" content={drawerData.assessment_method} />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">课程学时</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="参考周学时" content={drawerData.weekly_hours} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="总学时" content={drawerData.total} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="理论学时" content={drawerData.within} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="实践学时" content={drawerData.outside} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="上机学时" content={drawerData.computer} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="其他学时" content={drawerData.other} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="课程介绍"
                content={drawerData.introduce}
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">其他信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程体系" content={drawerData.system} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程性质" content={drawerData.nature} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程属性" content={drawerData.attribute} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="课程分类" content={drawerData.category} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="课程开课学期" content={drawerData.semester} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="是否产教融合" content={drawerData.flag_fuse ? '是' : '否'} />
            </Col>
          </Row>
        </Drawer>
      </div>
    </div>
  )
}
export default Course;