import React, { useEffect } from 'react';
import { Tabs, Card } from 'antd';
import './index.less'
import echarts from 'echarts';

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
}

const TrainingScheme = () => {

  return (
    <Card
    title='培养方案'
  >
  </Card>
  )
}

export default TrainingScheme
