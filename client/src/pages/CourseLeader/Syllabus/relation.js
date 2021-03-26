import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Table, Input, Button, Space, Modal, InputNumber, message, Select, Row, Col, Popconfirm, Form, Typography } from 'antd';
import "./index.less"

const Relation = () => {
  const [relation, setRelationData] = useState([]);
  let info = useLocation()?.state?.data;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [requirement, setRequirementData] = useState([]);
  const [point, setPointData] = useState([]);
  const goal = JSON.parse(localStorage.getItem('teachGoal'));
  const [req, setReqData] = useState([]);
  const [pointSecond, setPointSecond] = useState({})
  const [weight, setWeightData] = useState([])
  const columns = [
    {
      title: '毕业要求',
      dataIndex: 'major_requirement',
      width: '25%',
      algin: 'center',
      key:'major_requirement',
      render: (text, record) => {
        return record.major_requirement.name ? record.major_requirement.name : ''
      }
    },
    {
      title: '指标点',
      dataIndex: 'point',
      width: '15%',
      algin: 'center',
      key:'point',
      render: (text, record) => {
        return record.point.content ? record.point.content : ''
      }
    },
    {
      title: '课程教学目标',
      dataIndex: 'teach_goal',
      algin: 'center',
      width: '40%',
      className: 'teach',
      key:'teach_goal',
      render: (text, record) => (
        <>
          {
            record.teach_goal.map((goal, index) => {
              const count = record.teach_goal.length;
              const wid = 100 / count + '%';
              return (
                <div key={index} style={{ width: wid, height: '11vh' }}>
                  <div className="target">目标{index + 1}</div>
                  <div>{goal}</div>
                </div>
              )
            })
          }
        </>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => (
        <div>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消">
            <Button type="link" onClick={() => { del(index) }}>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  useEffect(() => {
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
  };

  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      major_requirement: req,
      point: pointSecond,
      teach_goal: weight,
    }
    console.log(params)
    console.log([...relation, params])
    setRelationData([...relation, params]);
    message.success("添加成功")
    localStorage.setItem("relation", JSON.stringify([...relation, params]))
    setVisible(false)
  };
  //删除
  const del = async (index) => {
    let newRelation = [...relation]
    newRelation.splice(index, 1)
    setRelationData(newRelation)
    localStorage.setItem("relation", JSON.stringify(newRelation))
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const inputChange = (currentIndex, value) => {
    let arr = [...weight]
    arr[currentIndex] = Number(value)
    setWeightData(arr)
  }
  const pointChange = (value) => {
    point.map((item) => {
      if (item._id == value) {
        setPointSecond(item)
      }
    })
  }
  const requirementChange = (value) => {
    requirement.map((item) => {
      if (item._id == value) {
        setReqData(item)
      }
    })
  }
  useEffect(() => {
    if (info) {
      setRelationData(info.relation)
    } else {
      setRelationData(JSON.parse(localStorage.getItem('relation')) || [])
    }
  }, [])
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
            // rowKey={(record) => `${record?.requirement?.name} ${index}`}
          />
          <Modal
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            destroyOnClose
            title='新增对应关系'
            footer={[
              <Button key="back" onClick={handleCancel}>
                取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                确认
              </Button>
            ]}
          >
            <Space direction="vertical" size="large" style={{display: 'flex', justifyContent: 'center'}}>
              <Row>
                <Col span={4}>
                  <span>毕业要求</span>
                </Col>
                <Col span={20}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择毕业要求"
                    allowClear
                    onChange={(value) => { requirementChange(value) }}
                  >
                    {/* {console.log(req.name)} */}
                    {requirement && requirement.map(item => {
                      return <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                    })}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <span>指标点</span>
                </Col>
                <Col span={20}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择指标点"
                    allowClear
                    onChange={(value) => { pointChange(value) }}
                  >
                    {point && point.map(item => {
                      return <Select.Option value={item._id} key={item._id}>{item.content}</Select.Option>
                    })}
                  </Select>
                </Col>
              </Row>
              {goal && goal.map((item, index) =>
                <Row key={index}>
                  <Col span={4}><label>权重{index + 1}</label></Col>
                  <Col span={20}>
                    <Input onChange={e => { inputChange(index, e.target.value) }} />
                  </Col>
                </Row>
              )}
            </Space>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Relation