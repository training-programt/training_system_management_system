import React, { useState, useMemo } from 'react'
import { Input, Button, Modal, Form, List, message, Collapse, Space } from 'antd';
import HeaderComponent from '@/components/header'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import api from "@/apis/nationalRequirement";
import { downloadFile } from '@/utils'

const { Panel } = Collapse;

const GraduationRequirement = () => {
  // const [form] = Form.useForm();
  // const [formPoint] = Form.useForm();
  // const [loading, setLoading] = useState(false);
  // const [tableData, setTableData] = useState([]);
  // const [query, setQuery] = useState('');
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isPointVisible, setIsPointVisible] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  // const [acRequirement, setAcRequirement] = useState('')

  // const formItemLayout = {
  //   labelCol: { span: 4 },
  //   wrapperCol: { span: 20 },
  // };

  // const getRequirement = async () => {
  //   setLoading(true);
  //   const params = {
  //     national_name: query
  //   }
  //   const res = await React.$axios.get(
  //     `${api.getNationalRequirement}?${React.$qs.stringify(params)}`
  //   )
  //   setTableData(res.data);
  //   setLoading(false);
  // }

  // useMemo(() => {
  //   getRequirement()
  // }, [query, isModalVisible])

  // const handleCancel = () => {
  //   form.resetFields()
  //   setIsModalVisible(false);
  // };

  // const handleOk = async (e) => {
  //   e.preventDefault();
  //   const params = {
  //     ...form.getFieldValue(),
  //   }
  //   if (!isEdit) {
  //     const res = await React.$axios.post(
  //       api.addNationalRequirement,
  //       params,
  //     );
  //     res && res.isSucceed && message.success(res.message)
  //   }
  //   else {
  //     const res = await React.$axios.post(
  //       api.updateNationalRequirement,
  //       params,
  //     );
  //     res && res.isSucceed && message.success(res.message)
  //   }
  //   setIsModalVisible(false);
  // }

  // const showEditModal = (record) => {
  //   form.resetFields()
  //   setIsModalVisible(true)
  //   setIsEdit(true)
  //   form.setFieldsValue(record)
  // }

  // const showModal = () => {
  //   setIsModalVisible(true);
  //   setIsEdit(false)
  // };

  // const showPointModal = (item) => {
  //   setAcRequirement(item)
  //   formPoint.resetFields()
  //   setIsPointVisible(true);
  // }

  // const delRequirement = async (record) => {
  //   if (!record.point.length) {
  //     message.error('指标点不为空，无法删除！')
  //     return false;
  //   }
  //   const params = {
  //     _id: record._id,
  //   }
  //   const res = await React.$axios.post(
  //     api.delNationalRequirement,
  //     params,
  //   );
  //   if (res && res.isSucceed) {
  //     message.success(res.message)
  //     setLoading(true);
  //     const data = await React.$axios.get(
  //       api.getNationalRequirement,
  //     )
  //     setTableData(data.data);
  //     setLoading(false);
  //   }
  // }

  // const downloadRequirement = async () => {
  //   // const res = await React.$axios.post(
  //   //   api.downloadRequirement
  //   // )

  //   // var blob = new Blob(['测试'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' });
  //   // downloadFile(blob, 'example', 'docx')

  //   // console.log(res)
  // }

  // const listHeader = (item, index) => {
  //   return (
  //     <>
  //       <div style={{ color: 'rgba(0,0,0,0.85)' }}>毕业要求{index + 1}：{item.national_name}</div>
  //       <div style={{ color: 'rgba(0,0,0,0.45)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //         <div style={{ width: '90%' }}>{item.nation_description}</div>
  //         <Space>
  //           <Button type='link' size='small' onClick={() => showPointModal(item._id)}>新增指标点</Button>
  //           <Button type='link' size='small' onClick={() => showEditModal(item)}>编辑</Button>
  //           <Button type='link' size='small' onClick={() => delRequirement(item)}>删除</Button>
  //         </Space>
  //       </div>
  //     </>
  //   )
  // }

  // const handlePointOk = async () => {
  //   const params = {
  //     _id: acRequirement,
  //     pointData: formPoint.getFieldValue(),
  //   }
  //   const res = await React.$axios.post(api.addPoint, params);
  //   (res && res.isSucceed) ? message.success('新增成功') : message.error('新增失败')
  //   getRequirement()
  //   setIsPointVisible(false);
  // }

  // const handlePointCancel = () => {
  //   formPoint.resetFields(),
  //     setIsPointVisible(false);
  // }

  // return (
  //   <div className="page-container">
  //     <HeaderComponent title="国家毕业要求管理" />
  //     <div className="body-wrap">
  //       <div className="header-wrap">
  //         <div className="search-box">
  //           <Input.Search placeholder="请输入毕业要求名称" onSearch={value => setQuery(value)} allowClear enterButton />
  //         </div>
  //         <div className="operation-wrap">
  //           <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增要求</Button>
  //           <Button type="primary" icon={<DownloadOutlined />} onClick={downloadRequirement}>导出要求</Button>
  //         </div>
  //       </div>
  //       <div className='table-wrap' style={{ overflow: 'auto' }}>
  //         <Collapse accordion ghost>
  //           {
  //             tableData.map((item, index) => {
  //               return (
  //                 <Panel header={listHeader(item, index)} key={index}>
  //                   <List
  //                     itemLayout="horizontal"
  //                     dataSource={item.point}
  //                     renderItem={(itemList, index) => (
  //                       <List.Item
  //                         actions={[<a key="list-loadmore-edit" style={{fontSize: '12px'}}>编辑</a>, <a key="list-loadmore-more" style={{fontSize: '12px'}}>删除</a>]}
  //                       >
  //                         <List.Item.Meta
  //                           title={'指标点' + (index + 1) + '：' + itemList.name}
  //                           description={itemList.description}
  //                         />
  //                       </List.Item>
  //                     )}
  //                   />
  //                 </Panel>
  //               )
  //             })
  //           }

  //           {/* <Panel header="This is panel header 2" key="2">
  //             <p>{text}</p>
  //           </Panel>
  //           <Panel header="This is panel header 3" key="3">
  //             <p>{text}</p>
  //           </Panel> */}
  //         </Collapse>
  //       </div>
  //     </div>
  //     <Modal
  //       visible={isModalVisible}
  //       width={680}
  //       title={isEdit ? '编辑要求' : '新建要求'}
  //       centered
  //       maskClosable={true}
  //       destroyOnClose
  //       onOk={handleOk}
  //       onCancel={handleCancel}
  //       footer={[
  //         <Button key="back" onClick={handleCancel}>取消</Button>,
  //         <Button key="submit" type="primary" loading={loading} onClick={handleOk}>确认</Button>
  //       ]}
  //     >
  //       <Form {...formItemLayout} form={form}>
  //         {
  //           isEdit ? (
  //             <Form.Item
  //               name="_id"
  //               label="ID"
  //             >
  //               <Input
  //                 maxLength={32}
  //                 disabled
  //               />
  //             </Form.Item>
  //           ) : ''
  //         }
  //         <Form.Item
  //           label='要求名称'
  //           name="national_name"
  //           rules={[
  //             { required: true, message: '名称不能为空' },
  //             { pattern: '^[^ ]+$', message: '名称不能有空格' }
  //           ]}
  //         >
  //           <Input
  //             maxLength={32}
  //             style={{ width: 300 }}
  //             placeholder="请输入要求名称"
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           label='要求描述'
  //           name="nation_description"
  //           rules={[
  //             { required: true, message: '描述不能为空' },
  //           ]}
  //         >
  //           <Input.TextArea
  //             autoSize={{ minRows: 5, maxRows: 5 }}
  //             placeholder="请输入要求描述"
  //           />
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //     <Modal
  //       visible={isPointVisible}
  //       width={680}
  //       title={'新增指标点'}
  //       centered
  //       maskClosable={true}
  //       destroyOnClose
  //       onOk={handlePointOk}
  //       onCancel={handlePointCancel}
  //       footer={[
  //         <Button key="back" onClick={handlePointCancel}>取消</Button>,
  //         <Button key="submit" type="primary" onClick={handlePointOk}>确认</Button>
  //       ]}
  //     >
  //       <Form {...formItemLayout} form={formPoint}>
  //         <Form.Item
  //           label='指标名称'
  //           name="name"
  //           rules={[
  //             { required: true, message: '名称不能为空' },
  //             { pattern: '^[^ ]+$', message: '名称不能有空格' }
  //           ]}
  //         >
  //           <Input
  //             maxLength={32}
  //             style={{ width: 300 }}
  //             placeholder="请输入要求名称"
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           label='指标描述'
  //           name="description"
  //           rules={[
  //             { required: true, message: '描述不能为空' },
  //           ]}
  //         >
  //           <Input.TextArea
  //             autoSize={{ minRows: 5, maxRows: 5 }}
  //             placeholder="请输入要求描述"
  //           />
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //   </div>
  // )


  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        national_name: query
      }
      console.log(params)
      const res = await React.$axios.get(
        `${api.getNationalRequirement}?${React.$qs.stringify(params)}`
      )
      setTableData(res.data);
      setLoading(false);
    }
    fetchData();

  }, [query, isModalVisible])

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = async (e) => {
    e.preventDefault();
    const params = {
      ...form.getFieldValue(),
    }
    if (!isEdit) {
      const res = await React.$axios.post(
        api.addNationalRequirement,
        params,
      );
      res && res.isSucceed && message.success(res.message)
    }
    else {
      const res = await React.$axios.post(
        api.updateNationalRequirement,
        params,
      );
      res && res.isSucceed && message.success(res.message)
    }
    setIsModalVisible(false);
  }
  const showEditModal = (record) => {
    form.resetFields()
    setIsModalVisible(true)
    setIsEdit(true)
    form.setFieldsValue(record)
  }

  const showModal = () => {
    form.resetFields()
    setIsModalVisible(true);
    setIsEdit(false)
  };

  const delRequirement = async (record) => {
    const params = {
      _id: record._id,
    }
    const res = await React.$axios.post(
      api.delNationalRequirement,
      params,
    );
    if (res && res.isSucceed) {
      message.success(res.message)
      setLoading(true);
      const data = await React.$axios.get(
        api.getNationalRequirement,
      )
      setTableData(data.data);
      setLoading(false);
    }
  }

  const listStyle = {
    padding: '20px',
    overflow: 'auto'
  }

  return (
    <div className="page-container">
      <HeaderComponent title="培养目标管理" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入毕业要求名称" onSearch={value => setQuery(value)} allowClear enterButton />
          </div>
          <div className="operation-wrap">
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>新增要求</Button>
            <Button type="primary" icon={<DownloadOutlined />}>导出目标</Button>
          </div>
        </div>
        <div className='table-wrap' style={listStyle}>
          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={tableData}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit" onClick={() => showEditModal(item)}>编辑</a>,
                  <a key="list-loadmore-more" onClick={() => delRequirement(item)}>删除</a>
                ]}
              >
                <List.Item.Meta
                  title={'培养目标' + (index + 1) + '：' + item.national_name}
                  description={item.nation_description}
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
          {
            isEdit ? (
              <Form.Item
                name="_id"
                label="ID"
              >
                <Input
                  maxLength={32}
                  disabled
                />
              </Form.Item>
            ) : ''
          }
          <Form.Item
            label='要求名称'
            name="national_name"
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
            name="nation_description"
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

export default GraduationRequirement
