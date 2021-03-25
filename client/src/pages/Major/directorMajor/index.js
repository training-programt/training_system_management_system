import React, { useState, useMemo, useEffect } from "react";
import { Input, Button, Modal, Table, Select, message } from "antd";
import echarts from "echarts";
import { withRouter } from "react-router-dom";
import HeaderComponent from "@/components/header";
import TableComponent from "@/components/table";
import { PlusOutlined, DownloadOutlined, RollbackOutlined } from "@ant-design/icons";
import api from "@/apis/teachRoom";
import { getSession } from "../../../utils";

const { Option } = Select;

const DirectorMajor = (props) => {
  const [roomDetail, setRoomDetail] = useState({})
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointModal, setAppointModal] = useState(false)
  const [selectedList, setSelectedList] = useState([])
  const [director, setDirector] = useState('')
  const [teachQuery, setTeachQuery] = useState({
    query: '',
    position: '',
    job: ''
  })

  const tableSetting = {
    page: 1,
    rows: 10,
  };

  const teachTableSetting = {
    page: 1,
    rows: 5,
  };

  const getRomDetail = async () => {
    console.log(JSON.parse(getSession('userInfo')).teachRoom)
    const params = {
      _id: JSON.parse(getSession('userInfo')).teachRoom,
    };
    setLoading(true)
    const res = await React.$axios.get(
      `${api.getRoomDetail}?${React.$qs.stringify(params)}`
    );
    setLoading(false)
    if (res && res.isSucceed) {
      setRoomDetail(res.data)
    }
  }

  useMemo(() => {
    getRomDetail()
  }, []);

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
    if (!isModalVisible) return false;
    const params = {
      ...teachQuery,
      ...teachTableSetting,
    }
    const res = await React.$axios.get(`${api.getAllTeacher}?${React.$qs.stringify(params)}`)
    if (res && res.isSucceed) {
      setTeacherData(res.data)
    }
  }, [teachQuery]);



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
          <Button type="link" onClick={() => delTeacher(record._id)}>删除</Button>
        </div>
      ),
    },
  ];

  const teachColumn = [
    {
      width: 50,
      render: (text, record, index) =>
        `${index + 1 + (teachTableSetting.page - 1) * teachTableSetting.rows}`,
    },
    {
      title: "姓名",
      dataIndex: "name",
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
  ];

  const showModal = () => {
    setIsModalVisible(true);
    getAllTeacher()
  };

  const getAllTeacher = async () => {
    const res = await React.$axios.get(`${api.getAllTeacher}?${React.$qs.stringify(teachTableSetting)}`)
    if (res && res.isSucceed) {
      setTeacherData(res.data)
    }
  }

  const handleOk = async () => {
    let teachers = Array.from(new Set([...selectedList, ...roomDetail.teachers.map(item => item._id)]))
    const params = {
      _id: props.match.params.id,
      teachers
    }
    const res = await React.$axios.post(api.updateTeachRoom, params)
    if (res && res.isSucceed) {
      message.success('添加成功')
      getRomDetail()
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    getRomDetail()
  };

  const delTeacher = async (record) => {
    if(record == roomDetail.director._id) {
      message.error('不能删除教研室主任')
      return false;
    }
    let ids = roomDetail.teachers.map(item => item._id)
    ids.splice(ids.findIndex(item => item === record), 1)
    const params = {
      _id: props.match.params.id,
      teachers: ids
    }
    const res = await React.$axios.post(api.updateTeachRoom, params)
    if (res && res.isSucceed) {
      message.success('删除成功')
      getRomDetail()
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedList(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const goBack = () => {
    props.history.go(-1)
  }

  const exportTeacher = async () => {
    const params = {
      _id: props.match.params.id,
    };
    const res = await React.$axios.post(api.exportByRoom, params)
    console.log(res)
  }


  return (
    <div className="teach-details">
      <HeaderComponent title="教研室详情" />
      <div className="body-wrap">
        <div className="room-detail">
          <div className="detail-top">
            <div><strong>所属学院：</strong>{roomDetail.college ? roomDetail.college.name : ''}</div>
            <div><strong>教研室主任：</strong>{roomDetail.director ? roomDetail.director.name : ''}</div>
            <div><strong>类型：</strong>{roomDetail.type}</div>
            <div><strong>专业：</strong>{roomDetail.major ?   roomDetail.major.name : ''}</div>
          </div>
          <div className="detail-bottom"><strong>描述：</strong>{roomDetail.introduce}</div>
        </div>
        <div className="header-wrap">
          <div className="search-box">
            <Input.Search placeholder="请输入教师姓名" allowClear enterButton />
          </div>
          <div className="operation-wrap">
            <Button icon={<RollbackOutlined />} onClick={goBack}>
              返回
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              新增教师
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} onClick={exportTeacher}>
              导出教师
            </Button>
          </div>
        </div>

        <div className="table-wrap">
          <div className="left-table">
            <TableComponent
              data={roomDetail.teachers}
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
      <Modal
        visible={isModalVisible}
        width={1000}
        title="新增教师"
        centered
        maskClosable={false}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '10px' }}>
          <Input.Search placeholder="请输入教师姓名" allowClear enterButton onSearch={(value) => setTeachQuery({ ...teachQuery, query: value })} />
          <Select
            placeholder='全部'
            allowClear
            onChange={(value) => setTeachQuery({ ...teachQuery, position: value })}
            style={{ width: "80%", margin: " 0 20px " }}
          >
            <Option value="教授">教授</Option>
            <Option value="副教授">副教授</Option>
            <Option value="讲师">讲师</Option>
            <Option value="助教">助教</Option>
            <Option value="其他正高级">其他正高级</Option>
            <Option value="其他副高级">其他副高级</Option>
            <Option value="其他中级">其他中级</Option>
            <Option value="其他初级">其他初级</Option>
            <Option value="未评级">未评级</Option>

          </Select>
          <Select
            placeholder='全部'
            allowClear
            onChange={(value) => setTeachQuery({ ...teachQuery, job: value })}
            style={{ width: "80%" }}
          >
            <Option value="专职">专职</Option>
            <Option value="兼职">兼职</Option>
          </Select>
        </div>
        <Table
          dataSource={teacherData}
          columns={teachColumn}
          rowKey='_id'
          bordered
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        />
      </Modal>
    </div>
  );
};

export default withRouter(DirectorMajor);
