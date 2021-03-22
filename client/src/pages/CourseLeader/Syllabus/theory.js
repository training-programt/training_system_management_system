import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Table, Input, InputNumber, Popconfirm, Select, message, Form, Divider, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Theory = () => {
  const [form] = Form.useForm();
  const [isEdit, setEditData] = useState(false);
  const [theory, setTheoryData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [updateindex, setUpdateIndex] = useState(0)
  let info = useLocation()?.state?.data;

  useEffect(() => {
    // const theory = React.$axios.get('/getTheory').then(thory => {
    //   setTheoryData(thory.data)
    // })
  }, [])



  const columns = [
    {
      title: '序号',
      align: 'center',
      fixed: 'center',
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: '教学单元',
      dataIndex: 'unit',
      inputType: 'text',
      width: '10%',
      editable: true,
    },
    {
      title: '教学内容',
      dataIndex: 'content',
      inputType: 'text',
      width: '30%',
      editable: true,
    },
    {
      title: '教学要求',
      dataIndex: 'requirements',
      inputType: 'text',
      width: '30%',
      editable: true,
    },
    {
      title: '课内学时',
      dataIndex: 'within',
      inputType: 'number',
      width: '5%',
      editable: true,
    },
    {
      title: '教学方式',
      dataIndex: 'way',
      inputType: 'text',
      width: '5%',
      editable: true,
    },
    {
      title: '课外学时',
      dataIndex: 'outside',
      inputType: 'number',
      width: '5%',
      editable: true,
    },
    {
      title: '课外环节',
      dataIndex: 'link',
      inputType: 'text',
      width: '5%',
      editable: true,
    },
    {
      title: '课程目标',
      dataIndex: 'target',
      inputType: 'text',
      width: '5%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record, index) => {
        return (
          <div>
            <Typography.Link onClick={() => edit(record, index)}>
              编辑
            </Typography.Link>
            <Typography.Link onClick={() => { del(index) }}>
              删除
            </Typography.Link>
          </div>
        );
      },
    },
  ];
  const edit = (record, index) => {
    // console.log(index)
    setUpdateIndex(index)
    form.resetFields()
    setEditData(true)
    setShowForm(true)
    form.setFieldsValue({
      ...record,
    });
  };
  const del = (index) => {
    let newTheory = [...theory]
    newTheory.splice(index, 1)
    setTheoryData(newTheory)
    localStorage.setItem("theory", JSON.stringify(newTheory))
  }
  const handleOk = () => {
    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      console.log(params)
      setTheoryData([...theory, params]);
      message.success("添加成功")
      localStorage.setItem("theory", JSON.stringify([...theory, params]))
      setShowForm(false)
    } else {
      let updateTheory = [...theory];
      updateTheory[updateindex] = params
      setTheoryData(updateTheory)
      message.success("修改成功")
      localStorage.setItem("theory",JSON.stringify(updateTheory))
      setShowForm(false)
    }

  }
 
  const add = () => {
    setShowForm(true);
    form.resetFields();
    setEditData(false)
  }
  useEffect(() => {
    if (info) {
      setTheoryData(info.theory)
    } else {
      setTheoryData(JSON.parse(localStorage.getItem('theory')) || [])
    }
  }, [])
  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">课程理论教学内容及学时分配</div>
        <div className="content-wrap">
          <Form form={form} component={false}>
            <Table
              bordered
              rowKey={record => record._id}
              dataSource={theory}
              columns={columns}
              rowClassName="editable-row"
            />
          </Form>
          <Divider>编辑线</Divider>
          {
            showForm ? (
              <Form form={form} {...layout}>
                <Form.Item
                  label="教学单元"
                  name='unit'
                  rules={[{ required: true, message: '教学单元不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="教学内容"
                  name='content'
                  rules={[{ required: true, message: '教学内容不能为空' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="教学要求"
                  name='requirements'
                  rules={[{ required: true, message: '教学要求不能为空' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="课内学时"
                  name='within'
                  rules={[{ required: true, message: '课内学时不能为空' }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="教学方式"
                  name='way'
                  rules={[{ required: true, message: '教学方式不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="课外学时"
                  name='outside'
                  rules={[{ required: true, message: '课外学时不能为空' }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="课外环节"
                  name='link'
                  rules={[{ required: true, message: '课外环节不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="课程目标"
                  name='target'
                  rules={[{ required: true, message: '课程目标不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Button onClick={handleOk} >确定</Button>
                <Button onClick={() => setShowForm(false)} >取消</Button>
              </Form>
            )
              : <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>添加具体专业培养目标</Button>
          }
        </div>
      </div>
    </div>
  );
};
export default Theory