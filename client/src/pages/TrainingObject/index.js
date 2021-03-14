
import React, { useState, useMemo } from "react";
import { Input, Select, Space, Button, Form, Modal, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import PaginationComponent from "@/components/pagination";
import HeaderComponent from "@/components/header";
import TableComponent from "@/components/table";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";

import api from "@/apis/majorObjective";

const { Option } = Select;

const TrainingObject = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("0");
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

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
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
      render: (text, record) => (text ? text.name : ""),
    },
    {
      title: "学校培养目标",
      dataIndex: "school_objective",
    },
    {
      title: "培养方案数",
      dataIndex: "objectCount",
      key: "objectCount",
      render: (text, record) => record.objectives.length,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link to={{ pathname: `trainingObject/edit/${text._id}` }}>
              <Button size="small" type="link">
                详情
              </Button>
            </Link>
            <Popconfirm
              title="确定删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => delMajorObjective(record)}
            >
              <Button type="link"> 删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const selectData = [
    { value: "1", name: "专业类" },
    { value: "2", name: "管理类" },
    { value: "3", name: "学科类" },
  ];

  const getObjectives = async () => {
    const params = {};
    const res = await React.$axios.get(api.getMajorObjective, params);
    if (res && res.isSucceed) {
      console.log(res)
      setTableData(res.data)
    }
  }

  useMemo(() =>
    getObjectives()
    , [])

  const delMajorObjective = async (record) => {
    const params = {
      _id: record._id,
    };
    const res = await React.$axios.post(api.delMajorObjective, params);
    if (res && res.isSucceed) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    getObjectives()
  };

  return (
    <div className="teach-section">
      <HeaderComponent title="培养目标管理" />
      <div className="body-wrap">
        <div className="filter-container">
          <div className="filter-type">
            <span>学院分类：</span>
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
            </Select>
          </div>
          <div className="search-box">

            <Input.Search
              placeholder="请输入专业名称"
              onSearch={(value) => setQuery(value)}
              allowClear
              enterButton
            />
            <Link to="trainingObject/add"><Button type="primary" icon={<PlusOutlined />}>添加专业目标</Button></Link>
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
    </div>
  );
};
export default TrainingObject;