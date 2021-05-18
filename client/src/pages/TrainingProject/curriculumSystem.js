import React, { useState, useMemo } from 'react';
import { Table, Input, Button, Space, Form, Modal, Cascader, Select, message } from 'antd';
// const EditableContext = React.createContext(null);
import api from '@/apis/trainingProject'
import { PlusOutlined } from '@ant-design/icons';
import { mergeCells } from '@/utils'

const { Option } = Select;

const CurriculumSystem = (props) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([])
  const [pointList, setPointList] = useState([])
  const [courseList, setCourseList] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const formatData = data => {
    const arr = [];
    data.forEach(item => {
      let name = item.name
      item.point.forEach(p => {
        let point = p.content, pointId = p._id;
        p.course.forEach(c => {
          let obj = {
            _id: c._id,
            name: name,
            point: point,
            pointId: pointId,
            courseName: c.courseName,
            weight: c.weight
          }

          arr.push(obj)
        })
      })
    })
    setTableData(arr)
  }

  const getTableData = async () => {
    const params = {
      _id: props.requirement,
    }
    const res = await React.$axios.post(api.getRequirementById, params);
    if (res && res.isSucceed) {
      const data = res.data.majorRequirement;
      data.forEach(item => {
        item.content = item.name
        item.createTime = new Date(item.createTime).toLocaleString()
      });
      formatData(data)
      setPointList(data)
    }
  }

  const getCourseList = async () => {
    const res = await React.$axios.get(api.getCourse);
    if (res && res.isSucceed) {
      setCourseList(res.data)
    }
  }

  useMemo(() => {
    if (props.requirement) {
      getTableData()
    }
    getCourseList()
  }
    , [])

  const columns = [
    {
      title: '毕业要求',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        const obj = {
          children: text !== null ? ('毕业要求' + '：' + text) : '',
          props: {}
        }
        obj.props.rowSpan = mergeCells(text, tableData, 'name', index)
        return obj
      }
    },
    {
      title: '指标点',
      dataIndex: 'point',
      key: 'point',
      render: (text, record, index) => {
        const obj = {
          children: text !== null ? text : '',
          props: {}
        }
        obj.props.rowSpan = mergeCells(text, tableData, 'point', index)
        return obj
      }
    },
    {
      title: '主要课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text, record, index) => {
        return courseList.find(item => item._id == record._id)?.name
      }
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '操作',
      dataIndex: 'active',
      width: '100',
      render: (text, record, index) => (
        <div style={{ textAlign: 'center' }}>
          <Space size="small">
            <Button size="small" type="link">编辑</Button>
            <Button size="small" type="link" onClick={() => delCurrRelationship(record)}>删除</Button>
          </Space>
        </div>
      )
    },
  ];

  const showModal = () => {
    setIsAddVisible(true)
    form.resetFields()
  }

  const handleCancel = () => {
    setIsAddVisible(false)
    form.resetFields()
  }

  const handleOk = async () => {
    let obj = form.getFieldValue()
    const params = {
      name: obj.point[0],
      point: obj.point[1],
      courseName: courseList[obj.courseName].name,
      weight: obj.weight,
    }

    console.log(params)
    const res = await React.$axios.post(api.addCurrRelationship, params)

    setIsAddVisible(false)
    form.resetFields()

    getTableData()
  }

  const delCurrRelationship = async (record) => {
    const params = {
      _id: record._id,
      pointId: record.pointId,
    }
    const res = await React.$axios.post(api.delCurrRelationship, params);
    if (res && res.isSucceed) {
      message.success('删除成功');
      getTableData();
    }
  }

  function onChange(value) {
    console.log(value);
  }

  function displayRender(label) {
    return label[label.length - 1];
  }

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <div>
      <div style={{ marginBottom: '16px', textAlign: 'right' }}><Button type="primary" icon={<PlusOutlined />} onClick={showModal}>添加支撑关系</Button></div>

      <Table columns={columns} dataSource={tableData} bordered pagination={false} rowKey="_id" />

      <Modal
        visible={isAddVisible}
        width={680}
        title={'新增支撑关系'}
        centered
        maskClosable={true}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleOk}>确认</Button>
        ]}
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            label='指标点'
            name="point"
            rules={[
              { required: true, message: '指标点不能为空' },
            ]}
          >
            <Cascader
              options={pointList}
              displayRender={displayRender}
              onChange={onChange}
              fieldNames={{
                label: 'content',
                value: '_id',
                children: 'point'
              }}
            />
          </Form.Item>
          <Form.Item
            label='课程'
            name="courseName"
            rules={[
              { required: true, message: '课程不能为空' },
            ]}
          >
            <Select
              showSearch
              placeholder="选择课程"
              onChange={onChange}
              onSearch={onSearch}
            >
              {
                courseList.map((item, index) => {
                  return <Option value={index} key={index}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='权重'
            name="weight"
            rules={[
              { required: true, message: '课程权重不能为空' },
            ]}
          >
            <Input placeholder="请输入课程权重" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CurriculumSystem
