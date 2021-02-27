import React, { useState, useMemo, useEffect } from "react";
import { Input, Button,  } from "antd";
import echarts from "echarts";
import { withRouter } from "react-router-dom";
import HeaderComponent from "@/components/header";
import TableComponent from "@/components/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "@/apis/teachRoom";


const SectionDetais = (props) => {
  console.log(props.match.params)
  const [roomData, setRoomData] = useState(props.match.params);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableSetting = {
    page: 1,
    rows: 10,
  };

  useEffect(() => {
    const topEchart = echarts.init(document.getElementById("top-echart"));
    const bottomEchart = echarts.init(document.getElementById("bottom-echart"));
    const optionData = [
      { value: 1048, name: "教授" },
      { value: 735, name: "副教授" },
      { value: 580, name: "助理" },
      { value: 484, name: "教师" },
    ];
    initEchart(topEchart, optionData);
    initEchart(bottomEchart, optionData);
  }, []);

  useMemo(async () => {
    const params = {
      teachRoomId: roomData.id,
    };
    const res = await React.$axios.get(
      `${api.getTeacherByRoom}?${React.$qs.stringify(params)}`
    );

    if (res && res.isSucceed) {
      setTableData(res.data);
    }
  }, []);

  const initEchart = (dom, optionData) => {
    let color = [
      "#A0D911",
      "#36CFC9",
      "#9254DE",
      "#F759AB",
      "#40A9FF",
      "#52C41A",
      "#FAAD14",
      "#FF7A45",
      "#ADC6FF",
      "#B37FEB",
    ];

    let option = {
      color: color,
      title: {
        text: "教师职称占比",
        bottom: 20,
        left: "center",
      },  
      tooltip: {
        trigger: "item",
      },
      legend: {
        show: true,
        right: "20%",
        align: "left",
        icon: "circle",
        itemGap: 10,
        padding: [20, 0],
        textStyle: {
          color: "#333333",
          fontFamily: "PingFangSC-Regula",
          fontSize: 12,
          padding: [0, 30, 0, 0],
        },
      },

      series: [
        {
          name: "教师职称占比",
          type: "pie",
          radius: ["35%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: optionData,
        },
      ],
    };

    dom.setOption(option);
  };

  const columns = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (tableSetting.page - 1) * tableSetting.rows}`,
    },
    {
      title: "名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "职称",
      dataIndex: "position",
    },
    {
      title: "专职/兼职",
      dataIndex: "job",
    },
    {
      title: "备注",
      dataIndex: "note",
    },
    {
      title: "操作",
      key: "active",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="teach-details">
      <HeaderComponent title="教研室详情" />
      <div className="body-wrap">
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入教师姓名" allowClear enterButton />
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
          <div className="left-table">
            <TableComponent
              data={tableData}
              column={columns}
              settings={tableSetting}
              loading={loading}
            />
          </div>
          <div className="right-echart">
            <div className="top-echart" id="top-echart"></div>
            <div className="bottom-echart" id="bottom-echart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SectionDetais);
