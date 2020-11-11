import React, { useEffect } from 'react';
import { Tabs, Tree } from 'antd';
import './index.less'
import { DownOutlined, } from '@ant-design/icons';

import echarts from 'echarts';

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
}

const treeData = [
  {
    title: '数学与计算机学院',
    key: '0',
    children: [
      {
        title: '软件工程',
        key: '0-1'
      },
      {
        title: '网络工程',
        key: '0-2'
      },
      {
        title: '信息与计算机科学',
        key: '0-3'
      },
      {
        title: '计算机科学与应用',
        key: '0-4'
      },
    ],
  },
];




const InfoView = () => {

  const initChart = () => {
    const element = document.getElementById('echarts');
    const myChart = echarts.init(element);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            position: 'inner'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: '直达', selected: true },
            { value: 679, name: '营销广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }
            }
          },
          data: [
            { value: 335, name: '直达' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1048, name: '百度' },
            { value: 251, name: '谷歌' },
            { value: 147, name: '必应' },
            { value: 102, name: '其他' }
          ]
        }
      ]
    };

    myChart.setOption(option);
  }

  useEffect(() => {
    initChart();
  })

  return (
    <div className="container">
      <Tabs onChange={callback} defaultActiveKey="1" >
        <TabPane tab="教研室" key="1" className="tab-box">
          {/* <Table 
            columns={columns} 
            dataSource={data} 
            bordered 
            pagination={false} 
            
          /> */}
          <div className="tree-container">
            <Tree
              showIcon
              defaultExpandedKeys={['0']}
              defaultSelectedKeys={['0-0']}
              switcherIcon={<DownOutlined />}
              treeData={treeData}
            />
          </div>
          <div className="data-container">
            <div id="echarts" style={{ width: 800, height: 400 }}></div>
          </div>
        </TabPane>
        <TabPane tab="师生信息" key="2">
          师生信息
      </TabPane>
      </Tabs>
    </div>
  )
}

export default InfoView
