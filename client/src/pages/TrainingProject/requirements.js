import React, { useState, useImperativeHandle, forwardRef, useMemo } from 'react'

import { Form, Input, Button, List, Collapse, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '@/apis/trainingProject'
const { Panel } = Collapse;

const data = [
  {
    name: '工程知识',
    description: '能够将数学、自然科学、工程基础和专业知识用于解决复杂软件工程问题'
  },
  {
    name: '问题分析',
    description: '能够应用数学、自然科学和工程科学的基本原理，识别、表达、并通过文献研究分析复杂软件工程问题，以获得有效结论'
  },
  {
    name: '设计/开发解决方案',
    description: '能够设计针对复杂软件工程问题的解决方案，设计满足特定需求的软件系统、可复用模块或组件，并能够在设计环节中体现创新意识，考虑社会、健康、安全、法律、文化以及环境等因素'
  },
  {
    name: '研究',
    description: '能够基于科学原理并采用科学方法对复杂软件工程问题进行研究，包括建立软件模型、设计实验、分析与解释数据，并通过信息综合得到合理有效的结论'
  },
  {
    name: '使用现代工具',
    description: '能够针对复杂软件工程问题，开发、选择与使用恰当的技术、资源、现代工程工具和信息技术工具，利用形式化方法完成复杂软件工程问题的预测与模拟，并能够理解其局限性'
  },
  {
    name: '工程与社会',
    description: '能够基于工程相关领域背景知识进行合理分析，评价专业工程实践和复杂软件工程问题解决方案对社会、健康、安全、法律以及文化的影响，并理解应承担的责任'
  },
  {
    name: '环境和可持续发展',
    description: '能够理解和评价针对复杂软件工程问题的专业工程实践对环境、社会可持续发展的影响'
  },
  {
    name: '职业规范',
    description: '具有人文社会科学素养、社会责任感，能够在软件工程实践中理解并遵守软件工程职业道德和规范，履行责任'
  },
  {
    name: '个人和团队',
    description: '能够在多学科背景下的软件项目团队中承担个体、团队成员以及负责人的角色'
  },
  {
    name: '沟通',
    description: '能够就复杂软件工程问题与业界同行及社会公众进行有效沟通和交流，包括撰写报告和设计文稿、陈述发言、清晰表达或回应指令，并具备一定的国际视野，能够在跨文化背景下进行沟通和交流'
  },
  {
    name: '项目管理',
    description: '理解并掌握复杂软件工程项目管理原理与经济决策方法，并能在多学科环境中应用，具有一定的软件项目管理能力'
  },
  {
    name: '终身学习',
    description: '具有自主学习和终身学习的意识，有不断学习和适应发展的能力'
  },
];

const Requirements = (props, ref) => {

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [formPoint] = Form.useForm();
  const [showMajorForm, setShowMajorForm] = useState(true)
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [requirementList, setRequirementList] = useState([])
  const [isPointVisible, setIsPointVisible] = useState(false);
  const [acRequirement, setAcRequirement] = useState(0)
  const [editRequirement, setEditRequirement] = useState(false);

  const getRequirementData = async () => {
    const params = {
      _id: props.requirement,
    }
    const res = await React.$axios.post(api.getRequirementById, params)
    if (res && res.isSucceed) {
      setShowMajorForm(false)
      setDescription(res.data.description);
      setRequirementList(res.data.majorRequirement)
    }
  }

  useMemo(() => {
    if (props.requirement) {
      getRequirementData()
    }
  }, [])

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const addMajorRequirement = () => {
    setDescription(form1.getFieldsValue().description);
    setShowMajorForm(false)
  }

  const addRequirementItem = () => {
    if (!editRequirement) {
      let params = {
        ...form2.getFieldsValue(),
        point: [],
      }
      let tempData = [...requirementList];
      tempData.push(params)
      setRequirementList(tempData)
    } else {
      const tempData = [...requirementList]
      tempData[acRequirement] = form2.getFieldValue();
      setRequirementList(tempData)
      setEditRequirement(false)
    }
    setShowForm(false)
    form2.resetFields()
  }

  useImperativeHandle(ref, () => {
    return {
      saveProject() {
        return {
          description: description,
          majorRequirement: requirementList,
        }
      }
    }
  })

  const showPointModal = (index) => {
    // console.log(item)
    setAcRequirement(index)
    formPoint.resetFields()
    setIsPointVisible(true);
  }

  const showEditModal = (record) => {
    form2.resetFields()
    setIsModalVisible(true)
    setIsEdit(true)
    form2.setFieldsValue(record)
  }

  const handlePointOk = async () => {
    let tempList = [...requirementList];
    tempList[acRequirement].point.push(formPoint.getFieldValue())
    setRequirementList(tempList)
    setIsPointVisible(false);
  }

  const handlePointCancel = () => {
    formPoint.resetFields(),
      setIsPointVisible(false);
  }

  const useRequirementItem = (item) => {
    const obj = {
      ...item,
      point: [],
    }
    setRequirementList([...requirementList, obj])
  }

  const delRequirementItem = (index) => {
    let tempData = [...requirementList]
    tempData.splice(index, 1);
    setRequirementList(tempData)
  }

  const editRequirementItem = index => {
    setEditRequirement(true)
    setShowForm(true)
    setAcRequirement(index)
    form2.setFieldsValue(requirementList[index]);
  }

  const listHeader = (item, index) => {
    return (
      <>
        <div style={{ color: 'rgba(0,0,0,0.85)' }}>毕业要求{index + 1}：{item.name}</div>
        <div style={{ color: 'rgba(0,0,0,0.45)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '90%' }}>{item.description}</div>
          <Space>
            <Button type='link' size='small' onClick={() => showPointModal(index)}>新增指标点</Button>
            <Button type='link' size='small' onClick={() => editRequirementItem(index)}>编辑</Button>
            <Button type='link' size='small' onClick={() => delRequirementItem(index)}>删除</Button>
          </Space>
        </div>
      </>
    )
  }

  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">新增毕业要求</div>
        <div className="content-wrap">
          <div className="major-object">
            <div>专业毕业要求：</div>
            {
              !showMajorForm
                ? (
                  <>
                    <div>{description}</div>
                    <div className="major-object-edit"><Button type="link" size="small" onClick={() => setShowMajorForm(true)}>编辑</Button></div>
                  </>
                )
                : (
                  <Form form={form1}>
                    <Form.Item
                      name='description'
                      rules={[{ required: true, message: '专业毕业要求描述不能为空' }]}
                    >
                      <Input.TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Button onClick={addMajorRequirement}>确定</Button>
                  </Form>
                )
            }

          </div>

          <Collapse accordion ghost>
            {
              requirementList.map((item, index) => {
                return (
                  <Panel header={listHeader(item, index)} key={index}>
                    <List
                      itemLayout="horizontal"
                      dataSource={item.point}
                      renderItem={(itemList, index) => (
                        <List.Item
                          actions={[
                            // <a key="list-loadmore-edit" style={{ fontSize: '12px' }}>编辑</a>,
                            <a key="list-loadmore-more" style={{ fontSize: '12px' }} onClick={() => delRequirementItem(index)}>删除</a>
                          ]}
                        >
                          <List.Item.Meta
                            title={'指标点' + (index + 1) + '：' + itemList.content}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                )
              })
            }
          </Collapse>
          {/* <List
            itemLayout="horizontal"
            dataSource={requirementList}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Button type="link" size='small'>编辑</Button>,
                  <Button type="link" size='small'>删除</Button>
                ]}
              >
                <List.Item.Meta
                  title={'毕业要求' + (index + 1) + '：' + item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          /> */}

          {
            showForm ? (
              <Form form={form2} {...formItemLayout}>
                <Form.Item
                  label="标题"
                  name='name'
                  rules={[{ required: true, message: '标题不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="描述"
                  name='description'
                  rules={[{ required: true, message: '描述不能为空' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Button onClick={addRequirementItem} >{editRequirement ? '确定' : '添加'}</Button>
                <Button onClick={() => setShowForm(false)} >取消</Button>
              </Form>
            )
              : <Button type="dashed" onClick={() => setShowForm(true)} block icon={<PlusOutlined />}>添加专业毕业要求</Button>
          }
        </div>
      </div>
      <div className="object-right">
        <div className="title">学校毕业要求参考</div>
        <div className="content-wrap">
          <div className="school-object">
            <div>学校毕业要求：</div>
            <div>本专业学生主要学习数学、自然科学和人文社会科学基本知识，掌握计算机科学、软件工程相关的基础理论和基本知识，接受软件工程实践和项目实施的基本训练，熟悉软件生命周期的各个环节；具备计算思维，能够运用先进的软件工程方法、技术和工具，从事软件工程应用领域的系统分析、设计、开发、管理和服务工作。</div>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                actions={[<Button type="link" onClick={() => useRequirementItem(item)}>应用</Button>]}
              >
                <List.Item.Meta
                  title={'毕业要求' + (index + 1) + '：' + item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <Modal
        visible={isPointVisible}
        width={680}
        title={'新增指标点'}
        centered
        maskClosable={true}
        destroyOnClose
        onOk={handlePointOk}
        onCancel={handlePointCancel}
        footer={[
          <Button key="back" onClick={handlePointCancel}>取消</Button>,
          <Button key="submit" type="primary" onClick={handlePointOk}>确认</Button>
        ]}
      >
        <Form {...formItemLayout} form={formPoint}>
          <Form.Item
            label='指标点内容'
            name="content"
            rules={[
              { required: true, message: '指标点内容不能为空' },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder="请输入指标点内容描述"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default forwardRef(Requirements)
