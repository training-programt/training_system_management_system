import React, { useState, useMemo } from 'react'
import { Input, Button, Modal, Form, List, message, Select } from 'antd';
import HeaderComponent from '@/components/header'
import { PlusOutlined, DownloadOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import api from "@/apis/majorObjective";

const { Option } = Select;

const EditTrainingObject = (props) => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [majorData, setMajorData] = useState([])
  const [major, setMajor] = useState('')
  const [acItem, setAcItem] = useState(0)
  const [schoolObjective, setSchoolObjective] = useState('')
  const [showMajorForm, setShowMajorForm] = useState(true)

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const getMajor = async () => {
    const res = await React.$axios.get(api.getMajor);
    if (res && res.isSucceed) {
      setMajorData(res.data)
    }
  }

  const getDetail = async () => {
    const params = {
      _id: props.match.params.id,
    }
    const res = await React.$axios.post(api.getMajorObjectiveDetails, React.$qs.stringify(params))
    if(res && res.isSucceed) {
      setShowMajorForm(false)
      setMajor(res.data.major._id);
      setSchoolObjective(res.data.school_objective);
      setTableData(res.data.objectives)
    }
  }

  useMemo(() => {
    getMajor()
    if(props.match.params.id) {
      getDetail()
    }
  }, [])

  const addSchoolObjective = () => {
    setSchoolObjective(form1.getFieldsValue().schoolObjective);
    setShowMajorForm(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    const params = {
      ...form.getFieldValue(),
    }
    let tempData = [...tableData];
    if (!isEdit) {
      tempData.push(params)
    } else {
      tempData[acItem] = form.getFieldValue();
    }
    setTableData(tempData)
    setIsModalVisible(false);
  }

  const showEditModal = (index) => {
    form.resetFields()
    setIsModalVisible(true)
    setIsEdit(true)
    setAcItem(index)
    form.setFieldsValue(tableData[index])
  }

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
    setIsEdit(false)
  };

  const delObjective = async (index) => {
    let tempData = [...tableData]
    tempData.splice(index, 1);
    setTableData(tempData)
  }

  const listStyle = {
    padding: '20px',
    overflow: 'auto'
  }

  const saveData = async () => {
    if (!major) {
      message.error('请选择专业！');
      return false;
    }
    const params = {
      major: major,
      school_objective: schoolObjective,
      objectives: tableData,
    }
    const res = await React.$axios.post(api.addMajorObjective, params)
    if (res && res.isSucceed) {
      console.log(res);
      message.success('新增成功')
      setTimeout(() => {
        goBack()
      }, 500)
    }
  }
  const goBack = () => {
    props.history.go(-1)
  }

  return (
    <div className="page-container">
      <HeaderComponent title="培养目标管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box" style={{ width: '500px' }}>
            <span>专业选择：</span>
            <Select
              defaultValue={major}
              onChange={(value) => setMajor(value)}
              style={{ width: '300px' }}
            >
              {majorData.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="operation-wrap">
            <Button icon={<RollbackOutlined />} onClick={goBack}>返回</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增要求</Button>
            <Button type="primary" icon={<DownloadOutlined />}>导出目标</Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={saveData}>保存</Button>
          </div>
        </div>
        <div className='table-wrap' style={listStyle}>
          <div>
            <div>学校培养目标：</div>
            {
              !showMajorForm
                ? (
                  <>
                    <div style={{ textIndent: '2em' }}>{schoolObjective}</div>
                    <div className="major-object-edit"><Button type="link" size="small" onClick={() => setShowMajorForm(true)}>编辑</Button></div>
                  </>
                )
                : (
                  <Form form={form1}>
                    <Form.Item
                      name='schoolObjective'
                      rules={[{ required: true, message: '专业培养目标描述不能为空' }]}
                    >
                      <Input.TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Button onClick={addSchoolObjective}>确定</Button>
                  </Form>
                )
            }

          </div>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={tableData}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit" onClick={() => showEditModal(index)}>编辑</a>,
                  <a key="list-loadmore-more" onClick={() => delObjective(index)}>删除</a>
                ]}
              >
                <List.Item.Meta
                  title={'培养目标' + (index + 1) + '：' + item.objective_name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        width={680}
        title={isEdit ? '编辑要求' : '新建要求'}
        centered
        maskClosable={true}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>确认</Button>
        ]}
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            label='要求名称'
            name="objective_name"
            rules={[
              { required: true, message: '名称不能为空' },
              { pattern: '^[^ ]+$', message: '名称不能有空格' }
            ]}
          >
            <Input
              maxLength={32}
              style={{ width: 300 }}
              placeholder="请输入要求名称"
            />
          </Form.Item>
          <Form.Item
            label='要求描述'
            name="description"
            rules={[
              { required: true, message: '描述不能为空' },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder="请输入要求描述"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default withRouter(EditTrainingObject)
