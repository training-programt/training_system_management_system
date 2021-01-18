import React, { useState, useMemo,useEffect } from 'react';
import { Table, Input, Button, Modal, Form, message,  InputNumber, Popconfirm, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderComponent from '../../../components/header'
import { useSelector } from 'react-redux';
import './index.less'

const DirectorMajor = () => {
  const [name, setName] = useState('');
  const [form] = Form.useForm();
  const [majorData, setMajorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


    return (
      // 教研室主任
      <div className="teachDirector">
        <Descriptions
          bordered
          title="教研室主任-专业管理"
          extra={<Button type="primary">编辑</Button>}
        >
          <Descriptions.Item label="专业名字">软件工程</Descriptions.Item>
          <Descriptions.Item label="专业编码">10032</Descriptions.Item>
          <Descriptions.Item label="专业人数">182</Descriptions.Item>
          <Descriptions.Item label="专业介绍">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
      </div>
    )
}

export default DirectorMajor;