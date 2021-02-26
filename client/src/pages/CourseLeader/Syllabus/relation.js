import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, InputNumber, Select, Popconfirm, Form, Typography } from 'antd';


const Relation = () => {
  const [form] = Form.useForm();
  const [relation, setRelationData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [requirement, setRequirementData] = useState([]);
  const [point, setPointData] = useState([]);

  useEffect(() => {
    const Rel = React.$axios.get('/getRelation').then((rel) => {
      setRelationData(rel.data)
    })
    const MajorRequirement = React.$axios.get('/getMajorRequirement').then((ma) => {
      setRequirementData(ma.data)
    })
    const Point = React.$axios.get('/getPoint').then((point) => {
      setPointData(point.data)
    })
  }, [])
  const columns = [
    {
      title: '毕业要求',
      dataIndex: 'major_requirement',
      width: '25%',
      algin: 'center',
      render: (text, record) => {
        // console.log(record)
        // return record.name
        // return record.major_requirement.name?record.major_requirement.name:''
      }
    },
    {
      title: '指标点',
      dataIndex: 'point',
      width: '15%',
      algin: 'center',
      render: (text, record) => {
        // console.log(record)
        return record.name
        // return record.point.content?record.point.content:''
      }
    },
    {
      title: '课程教学目标',
      dataIndex: 'teach_goal',
      algin: 'center',
      width: '40%',
      // render:(text,record)=>(
      //   <div>
      //     <Table>

      //     </Table>
      //   </div>
      // )
      children: [
        {
          title: '目标1',
          dataIndex: 'target1',
          render: (text, record) => {
            //  console.log(record)
            //  return record.teach_goal[0].weight
          }
        },
        {
          title: '目标2',
          dataIndex: 'target2',
          // render:(text,record)=>{
          //   console.log(record)
          //   return record.teach_goal[1].weight
          // }
        },
        {
          title: '目标3',
          dataIndex: 'target3',
          // render:(text,record)=>{
          //   console.log(record)
          //   return record.teach_goal[2].weight
          // }
        },
        {
          title: '目标4',
          dataIndex: 'target4',
          // render:(text,record)=>{
          //   console.log(record)
          //   return record.teach_goal[3].weight
          // }
        },
        {
          title: '目标5',
          dataIndex: 'target5',
          // render:(text,record)=>{
          //   console.log(record)
          //   return record.teach_goal[4].weight
          // }
        },
      ],
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Button type="link">编辑</Button>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  //新增
  const showAdd = () => {
    setVisible(true);
    form.resetFields()
    setIsEdit(false)
  };
  //编辑
  const edit = (record) => {
    setVisible(true);
    form.resetFields()
    setIsEdit(true)
    let data = {
      // _id: record._id,
      // name: record.name,
      // code: record.code,
      // introduce: record.introduce,
      // count: record.count,
    }
    form.setFieldsValue(data)
  };
  //删除
  const del = async (record) => {
    // const params = {
    //   _id: record._id,
    // }
    // const res = await React.$axios.post('/delMajor', params)
    // if (res && res.isSucceed) {
    //   message.success(res.message);
    //   const newMajor = await React.$axios.get(
    //     '/getMajor'
    //   )
    //   setMajorData(newMajor.data);
    // } else {
    //   message.error(res.message);
    // }
  };
  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    // if(!isEdit){
    //   const add = await React.$axios.post(
    //     '/addMajor',
    //     params,
    //   );
    //   console.log(add)
    //   if(add.isSucceed){
    //     message.success(add.message)
    //     const newMajor = await React.$axios.get(
    //       '/getMajor'
    //     )
    //     setMajorData(newMajor.data);
    //   }else{
    //     message.error(add.message)
    //   }
    // }else if(isEdit){
    //   const res = await React.$axios.post(
    //     '/updateMajor',
    //     params,
    //   );
    //   if (res && res.isSucceed) {
    //     message.success(res.message);
    //     const res = await React.$axios.get(
    //       '/getMajor'
    //     )
    //     setMajorData(res.data);
    //   } else {
    //     message.error(res.message);
    //   }
    // }
    setVisible(false);

  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">课程教学目标与毕业要求的对应关系</div>
        <div className="content-wrap">
          <Button type="primary" onClick={showAdd}>新增对应关系</Button>
          <Table
            bordered
            dataSource={relation}
            columns={columns}
            rowKey={record => record._id}
          />
          <Modal
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            destroyOnClose
            title={isEdit ? '编辑对应关系' : '新增对应关系'}
            footer={[
              <Button key="back" onClick={handleCancel}>
                取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                确认
              </Button>
            ]}
          >
            <Form form={form}>
              <Form.Item
                name="major_requirement"
                label="毕业要求"
                rules={[{ required: true, message: '请选择毕业要求!' }]}
              >
                <Select
                  style={{ width: 320 }}
                  placeholder="请选择毕业要求"
                  allowClear
                >
                  {requirement && requirement.map(item => {
                    return <Select.Option value={item.name} key={item._id}>{item.name}</Select.Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="point"
                label="指标点"
                rules={[{ required: true, message: '请选择指标点!' }]}>
                <Select
                  style={{ width: 320 }}
                  placeholder="请选择指标点"
                  allowClear
                >
                  {point && point.map(item => {
                    return <Select.Option value={item.content} key={item._id}>{item.content}</Select.Option>
                  })}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Relation