import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, InputNumber, Select, Popconfirm, Form, Typography } from 'antd';
import "./index.less"

const Relation = () => {
  const [form] = Form.useForm();
  const [relation, setRelationData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [requirement, setRequirementData] = useState([]);
  const [point, setPointData] = useState([]);
  const columns = [
    {
      title: '毕业要求',
      dataIndex: 'major_requirement',
      width: '25%',
      algin: 'center',
      render: (text, record) => {
        return record.major_requirement.name ? record.major_requirement.name : ''
      }
    },
    {
      title: '指标点',
      dataIndex: 'point',
      width: '15%',
      algin: 'center',
      render: (text, record) => {
        return record.point.content ? record.point.content : ''
      }
    },
    {
      title: '课程教学目标',
      dataIndex: 'teach_goal',
      algin: 'center',
      width: '40%',
      className:'teach',
      render: (text, record) => (
        record.teach_goal.map((data, index) => {
          const count = record.teach_goal.length;
          const wid = 100/count+'%';
          return (
              <div key={index} style={{ width: wid,height:'11vh'}}>
                <div className="target">目标{index + 1}</div>
                <div>{data.weight}</div>
              </div>
          )
        })
      )
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
  useEffect(() => {
    const Rel = React.$axios.get('/getRelation').then((rel) => {
      // console.log(rel.data)
      setRelationData(rel.data)
      // console.log(columns[2].children)
      // console.log(rel.data[0].teach_goal.length)
      // for(let i = 0;i<rel.data[0].teach_goal.length;i++){
      //   console.log(rel.data[0].teach_goal[i])
      //   columns[2].children.push(
      //     {
      //     title:rel.data[0].teach_goal[i].target_course_name,
      //     dataIndex:'target'+i,
      //     render:rel.data[0].teach_goal[i].weight
      //   }
      //   )
      // columns[2].children[i].title = 
      // columns[2].children[i].render = rel.data[0].teach_goal[i].weight

      // }
    })
    const MajorRequirement = React.$axios.get('/getMajorRequirement').then((ma) => {
      setRequirementData(ma.data)
    })
    const Point = React.$axios.get('/getPoint').then((point) => {
      setPointData(point.data)
    })
  }, [])

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