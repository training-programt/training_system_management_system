import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space,Modal, InputNumber, message, Select, Row, Col, Popconfirm, Form, Typography } from 'antd';
import "./index.less"

const Relation = () => {
  const [relation, setRelationData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [requirement, setRequirementData] = useState([]);
  const [point, setPointData] = useState([]);
  const goal = JSON.parse(localStorage.getItem('teachGoal'));
  const [req,setReqData] = useState([]);
  const [pointSecond,setPointSecond]= useState({})
  const [weight, setWeightData] = useState({})
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
      dataIndex: 'weight',
      algin: 'center',
      width: '40%',
      className: 'teach',
      render: (text, record) => (
        goal.map((data, index) => {
          const count = goal.length;
          const wid = 100 / count + '%';
          return (
            <div key={index} style={{ width: wid, height: '11vh' }}>
              <div className="target">目标{index + 1}</div>
              <div>{weight[index]}</div>
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
      setRelationData(rel.data)
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
    setIsEdit(false)
  };
  //编辑
  const edit = (record) => {
    setVisible(true);
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
  };
  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      major_requirement:req,
      point:pointSecond,
      weight,
    }
    if (!isEdit) {
      console.log(params)
      setRelationData([...relation,params]);
      message.info("添加成功")
      localStorage.setItem("relation", JSON.stringify([...relation,params]))
      setVisible(false)
    } else if (isEdit) {
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const inputChange = (currentIndex, value) => {
    const arr = [...weight]
    arr[currentIndex] = Number(value)
    setWeightData(arr)
  }
  const pointChange=(value)=>{
    point.map((item)=>{
      if(item._id==value){
        setPointSecond(item)
      }
    })
  }
  const requirementChange=(value)=>{
    // console.log(value)
    // console.log(requirement)
    requirement.map((item)=>{
      if(item._id==value){
        setReqData(item)
      }
    })
  }
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
            <Space direction="vertical" size="large">
            <Row>
              <Col span={24}>
                <span>毕业要求</span>
                <Select
                  style={{ width: 320 }}
                  placeholder="请选择毕业要求"
                  allowClear
                  onChange={(value) => {requirementChange(value)}}
                >
                  {requirement && requirement.map(item => {
                    return <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                  })}
                </Select>
              </Col>

            </Row>
            <Row>
              <Col span={24}>
                <span>指标点</span>
                <Select
                  style={{ width: 320 }}
                  placeholder="请选择指标点"
                  allowClear
                  onChange={(value) => {pointChange(value)}}
                >
                  {point && point.map(item => {
                    return <Select.Option value={item._id} key={item._id}>{item.content}</Select.Option>
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              {goal && goal.map((item, index) =>
                <Col span={24} key={index}>
                  <label>权重{index + 1}</label><Input onChange={e => { inputChange(index, e.target.value) }} />
                </Col>
                // <Form.Item
                //   key={index}
                //   name={`weight_${index}`}
                //   label={`目标${index+1}`}
                // >
                //   <Input />
                // </Form.Item>
              )}
            </Row>
            </Space>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Relation