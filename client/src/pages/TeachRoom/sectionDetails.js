import React, { useState, useMemo } from "react";
import { Input, Button, Tabs } from "antd";
import { withRouter } from "react-router-dom";
import HeaderComponent from "@/components/header";
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "@/apis/teachRoom";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const SectionDetais = (props) => {
  console.log(props.location.state)
  const [roomData, setRoomData] = useState(props.location.state);

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableSetting = {
    page: 1,
    rows: 10,
  };

  useMemo(async () => {
    const params = {
      teachRoomId: roomData._id,
    };
    const res = await React.$axios.get(
      `${api.getTeacherByRoom}?${React.$qs.stringify(params)}`
    );
  }, []);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "操作",
      key: "active",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Button type="link">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="teach-details">
      <HeaderComponent title="教研室详情" />
      <div className="body-wrap">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="教师列表" key="1">
            <div className="header-wrap">
              <div className="search-box">
                <Input.Search
                  placeholder="请输入教师姓名"
                  allowClear
                  enterButton
                />
              </div>
              <div className="operation-wrap">
                <Button type="primary" icon={<PlusOutlined />}>
                  新增教师
                </Button>
                <Button type="primary" icon={<DeleteOutlined />}>
                  批量删除
                </Button>
              </div>
            </div>

            <div className="table-wrap">
              <TableComponent
                data={tableData}
                column={columns}
                settings={tableSetting}
                loading={loading}
              />
            </div>
          </TabPane>
          <TabPane tab="数据图表" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default withRouter(SectionDetais);
