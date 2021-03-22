import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Table, Input, InputNumber, Popconfirm, Select, Form, message, Divider, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Practice = () => {
  const [form] = Form.useForm();
  const [practice, setPracticeData] = useState([]);
  const [isEdit, setEditData] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updateindex, setUpdateIndex] = useState(0)
  let info = useLocation()?.state?.data;

  useEffect(() => {
    // const theory = React.$axios.get('/getPractice').then(practice => {
    //   console.log(practice)
    //   setPracticeData(practice.data)
    // })
  }, [])

  const edit = (record, index) => {
    console.log(index)
    setUpdateIndex(index)
    form.resetFields()
    setEditData(true)
    setShowForm(true)
    form.setFieldsValue({
      ...record,
    });
  };

  const columns = [
    {
      title: '序号',
      align: 'center',
      fixed: 'center',
      render: (text, record, index) => `${index + 1}`
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      inputType: 'text',
      width: '10%',
      editable: true,
    },
    {
      title: '实验目的',
      dataIndex: 'objective',
      inputType: 'text',
      width: '30%',
      editable: true,
    },
    {
      title: '实验内容',
      dataIndex: 'content',
      inputType: 'text',
      width: '30%',
      editable: true,
    },
    {
      title: '选做/必做',
      dataIndex: 'practice_way',
      inputType: 'text',
      width: '5%',
      editable: true,
    },
    {
      title: '项目类型',
      dataIndex: 'type',
      inputType: 'text',
      width: '5%',
      editable: true,
    },
    {
      title: '教学方式',
      dataIndex: 'teaching_way',
      inputType: 'text',
      width: '5%',
      editable: true,
    },
    {
      title: '学时分配',
      dataIndex: 'time',
      inputType: 'number',
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
            <Typography.Link onClick={() => edit(record,index)}>
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
  const addPractice = () => {
    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      setPracticeData([...practice, params]);
      message.success("添加成功")
      form.resetFields();
      localStorage.setItem("practice", JSON.stringify([...practice, params]))
      setShowForm(false)
    } else {
      console.log(updateindex)
      console.log(params)
      console.log(isEdit)
      let updatePractice = [...practice];
      updatePractice[updateindex] = params
      setPracticeData(updatePractice)
      message.success("修改成功")
      localStorage.setItem("practice", JSON.stringify(updatePractice))
      setShowForm(false)
    }

  }
  const del = (index) => {
    let newPractice = [...practice]
    newPractice.splice(index, 1)
    setPracticeData(newPractice)
    localStorage.setItem("practice", JSON.stringify(newPractice))
  }
  const add = () => {
    setShowForm(true);
    form.resetFields();
    setEditData(false)
  }
  useEffect(() => {
    if (info) {
      setPracticeData(info.practice)
    } else {
      setPracticeData(JSON.parse(localStorage.getItem('practice')) || [])
    }
  }, [])
  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">课程实验（实践）教学内容及学时分配</div>
        <div className="content-wrap">
          <Form form={form} component={false}>
            <Table
              bordered
              rowKey={record => record._id}
              dataSource={practice}
              columns={columns}
              rowClassName="editable-row"
            />
          </Form>
          <Divider>编辑线</Divider>
          {
            showForm ? (
              <Form form={form} {...layout}>
                <Form.Item
                  label="项目名称"
                  name='name'
                  rules={[{ required: true, message: '项目名称不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="实验目的"
                  name='objective'
                  rules={[{ required: true, message: '实验目的不能为空' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="实验内容"
                  name='content'
                  rules={[{ required: true, message: '实验内容不能为空' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="选做/必做"
                  name='practice_way'
                  rules={[{ required: true, message: '類型不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="项目类型"
                  name='type'
                  rules={[{ required: true, message: '项目类型不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="教学方式"
                  name='teaching_way'
                  rules={[{ required: true, message: '教学方式不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="学时分配"
                  name='time'
                  rules={[{ required: true, message: '学时分配不能为空' }]}
                >
                  <InputNumber />
                </Form.Item>
                <Button onClick={addPractice} >确定</Button>
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
export default Practice