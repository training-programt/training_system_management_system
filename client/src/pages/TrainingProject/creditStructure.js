import React, { useState, useMemo, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal, Table, Form, Select, Popconfirm, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '@/apis/trainingProject'

const CreditStructure = (props, ref) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [courseType, setCourseType] = useState([])
  const [description, setDescription] = useState('实践学分共59.9分，所占比例33.06%（实践学分包括以数学与自然科学实验1.5学分，课内实验4学分，专业方向课14学分，工程实验38学分，户外科技活动2学分）。')
  const [totalCredit, setTotalCredit] = useState(props.project.total_credits)
  const [acItem, setAcItem] = useState(0);

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const getCourseType = async () => {
    const res = await React.$axios.get(api.getAllCourseType)
    if (res && res.isSucceed) {
      setCourseType(res.data);
    }
  }

  const getTableData = async () => {
    const params = {
      _id: props.project.credits_required,
    }
    const res = await React.$axios.post(api.getCreditStructure, params)
    // const res = await React.$axios.get(
    //   `${api.getCreditStructure}?${React.$qs.stringify(params)}`
    // )
    if (res && res.isSucceed) {
      setTableData(res.data.content)
    }
  }

  useMemo(() => {
    if (props.project.credits_required) {
      getTableData();
    }
    getCourseType()
  }, [])

  const columns = [
    {
      width: 50,
      render: (text, record, index) => index + 1
    },
    {
      title: '课程类型',
      dataIndex: 'courseType',
      render: text => text.name
    },
    {
      title: '学分',
      dataIndex: 'credit',
    },
    {
      title: '所占比例',
      dataIndex: 'ratio',
    },
    {
      title: '操作',
      key: 'active',
      align: 'center',
      width: '20%',
      render: (text, record, index) => (
        <div style={{ textAlign: 'center' }}>
          <Button type="link" onClick={() => showEditModal(index)}>编辑</Button>
          &emsp;
          <Popconfirm title='您确定删除当前数据吗？' onConfirm={() => delData(index)}>
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      )
    },
  ]

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
    setIsEdit(false)
  }

  const showEditModal = (index) => {
    setAcItem(index)
    setIsModalVisible(true);
    form.resetFields();
    setIsEdit(true);
    let obj = {
      ...tableData[index],
      courseType: courseType.findIndex(item => item.name == tableData[index].courseType.name),
    }
    form.setFieldsValue(obj)
  }

  const handleOk = () => {
    if (isEdit) {
      let tempData = [...tableData];
      tempData[acItem] = {
        ...form.getFieldValue(),
        courseType: courseType[form.getFieldValue().courseType],
      }
      setTableData([...tempData])
    } else {
      let item = {
        ...form.getFieldValue(),
        _id: Math.random(),
        courseType: courseType[form.getFieldValue().courseType],
      }
      setTableData([...tableData, item])
    }

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const delData = (index) => {
    console.log(index)
    let tempData = [...tableData]
    tempData.splice(index, 1)
    setTableData(tempData)
  }

  const changeCredit = (val) => {
    let ratio = (val / totalCredit * 100).toFixed(2);
    form.setFieldsValue({
      ratio
    })
  }

  useImperativeHandle(ref, () => {
    return {
      saveProject() {
        let content = tableData.map(item => {
          delete item._id
          return {
            credit: item.credit,
            ratio: item.ratio,
            courseType: item.courseType._id
          }
        })
        return {
          total_credits: totalCredit,
          description: description,
          content: content,
        }
      }
    }
  })

  return (
    <div>
      <div style={{ marginBottom: '16px', textAlign: 'right' }}><Button type="primary" icon={<PlusOutlined />} onClick={showModal}>添加支撑关系</Button></div>

      <Table columns={columns} dataSource={tableData} bordered pagination={false} rowKey="_id" />
      <div>
        <strong>说明：</strong>
        {description}
      </div>
      <Modal
        visible={isModalVisible}
        width={550}
        title={isEdit ? '编辑' : '新增'}
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
            确定
          </Button>
        ]}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item
            label='课程类型'
            name="courseType"
            rules={[
              { required: true, message: '课程类型不能为空' },
            ]}
          >
            <Select
              showSearch
              placeholder="选择课程类型"
            >
              {
                courseType.map((item, index) => {
                  return <Select.Option value={index} key={index}>{item.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item

            label='学分'
            name="credit"
            rules={[
              { required: true, message: '学分不能为空' },
            ]}
          >
            <InputNumber
              style={{
                width: 200,
              }}
              placeholder="请输入学分"
              min={0}
              onChange={changeCredit}
            />
          </Form.Item>
          <Form.Item
            label='所占比例'
            name="ratio"
          >
            <InputNumber
              style={{
                width: 200,
              }}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default forwardRef(CreditStructure)