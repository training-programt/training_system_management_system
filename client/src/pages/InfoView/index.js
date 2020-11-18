import React, { useEffect } from 'react';
import { Tabs, Tree } from 'antd';
import './index.less'
import echarts from 'echarts';

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
}

const InfoView = () => {

  return (
    <div className="info-view">
      <Tabs onChange={callback} defaultActiveKey="1" className="body-wrap">
        <TabPane tab="教研室" key="1" className="tab-box">
          
        </TabPane>
        <TabPane tab="师生信息" key="2">
          师生信息
      </TabPane>
      </Tabs>
    </div>
  )
}

export default InfoView
