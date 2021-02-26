import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Select, Form, Divider, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};
const Theory = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [theory, setTheoryData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const isEditing = (record) => record.key === editingKey;
  useEffect(() => {
    const theory = React.$axios.get('/getTheory').then(thory => {
      console.log(thory)
      setTheoryData(thory.data)
    })
  }, [])

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...theory];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

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
      // render:(text,record)=>(
      //   <TextArea placeholder="" autoSize />
      // )
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
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="确定取消？" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </Typography.Link>
          );
      },
    },
  ];
  const addThory = () => {

  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">课程理论教学内容及学时分配</div>
        <div className="content-wrap">
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              rowKey={record => record._id}
              dataSource={theory}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
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
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="课程目标"
                  name='target'
                  rules={[{ required: true, message: '课程目标不能为空' }]}
                >
                  <Input/>
                </Form.Item>
                <Button onClick={addThory} >添加</Button>
                <Button onClick={() => setShowForm(false)} >取消</Button>
              </Form>
            )
              : <Button type="dashed" onClick={() => setShowForm(true)} block icon={<PlusOutlined />}>添加具体专业培养目标</Button>
          }
        </div>
      </div>
    </div>
  );
};
export default Theory