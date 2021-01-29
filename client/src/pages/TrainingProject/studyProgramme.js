import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;


const StudyProgramme = () => {
  return (
    <div>
      <Tabs>
        <TabPane tab="必修课程教学计划" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="选修课程教学计划" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="实践环节课程教学计划" key="3">
          Content of tab 3
        </TabPane>
        <TabPane tab="第二课堂" key="4">
          Content of tab 4
        </TabPane>
      </Tabs>
    </div>
  )
}

export default StudyProgramme
