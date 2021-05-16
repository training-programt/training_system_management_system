import React, { useState, useMemo } from "react";
import { Input, Select, Space, Button, Form, Modal, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import PaginationComponent from "@/components/pagination";
import HeaderComponent from "@/components/header";
import TableComponent from "@/components/table";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import "./index.less";

import api from "@/apis/teachRoom";

const { Option } = Select;

const TeachRoom = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [type, setType] = useState("0");
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [majorData, setMajorData] = useState([]);
  const [teacherData, setTeacherData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const tableSetting = {
    page: 1,
    rows: 12,
    isMultiple: true,
  };

  const pageparams = {
    page: page,
    pageSize: 12,
    total: total,
  };

  const column = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
    },
    { title: "名称", dataIndex: "name", key: "name" },
    // {
    //   title: "专业",
    //   dataIndex: "major",
    //   key: "major",
    //   render: (text, record) => (text ? text.name : ""),
    // },
    {
      title: "教师人数",
      dataIndex: "teacherCount",
      key: "teacherCount",
      render: (text, record) => record.teachers.length,
    },
    {
      title: "教研室主任",
      dataIndex: "director",
      key: "director",
      render: (text, record) => record.director ? record.director.name : ''
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link to={{ pathname: `teachRoom/details/${text._id}` }}>
              <Button size="small" type="link">
                详情
              </Button>
            </Link>
            <Button
              size="small"
              type="link"
              onClick={() => showEditModal(record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => delTeachRoom(record)}
            >
              <Button type="link"> 删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  useMemo(() => {
    const fetchData = async () => {
      const res = await React.$axios.get(api.getMajor);
      setMajorData(res.data);
      teacherList();
    };
    fetchData();
  }, []);

  useMemo(() => {
    const fetchData = async () => {
      const params = {
        page: pageparams.page,
        rows: tableSetting.rows,
        type: type,
        query: query,
      };
      setLoading(true);
      const res = await React.$axios.get(
        `${api.getTeachRoom}?${React.$qs.stringify(params)}`
      );
      setTableData(res.data);
      setTotal(res.total);
      setLoading(false);
    };

    fetchData();
  }, [type, query, page, isModalVisible]);

  const teacherList = async () => {
    const res = await React.$axios.get(api.getTeacher)
    if (res && res.isSucceed) {
      setTeacherData(res.data)
    }
  }

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
    setIsEdit(false);
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    form.resetFields();
    setIsEdit(true);
    let data = {
      _id: record._id,
      name: record.name,
      // major: record.major._id,
      type: record.type,
      director: record.director.name,
      introduce: record.introduce,
    };
    form.setFieldsValue(data);
  };

  const handleOk = async (e) => {
    e.preventDefault();

    const params = {
      ...form.getFieldValue(),
    };
    if (!isEdit) {
      const res = await React.$axios.post(api.addTeachRoom, params);
      if (res && res.isSucceed) {
        message.success(res.message);
        setIsModalVisible(false);
      } else {
        message.error("新增失败");
        setIsModalVisible(false);
      }
    } else {
      const res = await React.$axios.post(api.updateTeachRoom, params);
      if (res && res.isSucceed) {
        message.success(res.message);
        setIsModalVisible(false);
      } else {
        message.error("修改失败");
        setIsModalVisible(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const delTeachRoom = async (record) => {
    if (record.teachers.length != 1) {
      message.error('还存在其他教师，不能删除')
      return false;
    }
    const params = {
      _id: record._id,
    };
    const res = await React.$axios.post(api.delTeachRoom, params);
    if (res && res.isSucceed) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    const params2 = {
      page: pageparams.page,
      rows: tableSetting.rows,
      type: type,
      query: query,
    };
    setLoading(true);
    const res2 = await React.$axios.get(
      `${api.getTeachRoom}?${React.$qs.stringify(params2)}`
    );
    setTableData(res2.data);
    setTotal(res2.total);
    setLoading(false);
  };

  return (
    <div className="teach-section">
      <HeaderComponent title="教研室管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-type">
            {/* <span>教研室分类：</span>
            <Select
              className="select-type"
              defaultValue={type}
              onChange={(value) => setType(value)}
            >
              <Option value="0">全部</Option>
              {selectData.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.name}
                </Option>
              ))}
            </Select> */}
          </div>
          <div className="search-box">

            <Input.Search
              placeholder="请输入教研室名称"
              onSearch={(value) => setQuery(value)}
              allowClear
              enterButton
            />
            <Space size='small'>
              <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                添加教研室
            </Button>
              <Button type="primary" icon={<DownloadOutlined />} >
                导出数据
            </Button>
            </Space>
          </div>
        </div>
        <div className="table-container">
          <TableComponent
            data={tableData}
            column={column}
            settings={tableSetting}
            loading={loading}
          />
        </div>
        <PaginationComponent
          pageparams={pageparams}
          handlePage={(v) => setPage(v)}
        />
      </div>
      <Modal
        visible={isModalVisible}
        width={700}
        title={isEdit ? "编辑教研室" : "新增教研室"}
        centered
        maskClosable={false}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            确定
          </Button>,
        ]}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="major" label="专业" rules={[{ required: true }]}>
            <Select className="select-type">
              {majorData.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="director" label="主任" rules={[{ required: true }]}>
            <Select className="select-type">
              {teacherData.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};
export default TeachRoom;
