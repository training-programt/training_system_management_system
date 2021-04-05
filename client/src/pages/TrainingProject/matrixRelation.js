import React, { useState, useMemo } from 'react';
import { Tabs } from 'antd';
// import api from '@/apis/trainingProject'

import MajorObjReqRelation from './table/majorObjReqRelation'
import MajorNationCoverRelation from './table/majorNationCoverRelation'

const { TabPane } = Tabs;

const MatrixRelation = (props) => {
  const [projectId, setProjectId] = useState(props.project)

  // useMemo(() => {
  //   console.log(props.project, '1')
  // }, [])

  return (
    <div>
      <Tabs>
        <TabPane tab="专业培养目标与毕业要求关系矩阵" key="1">
          <MajorObjReqRelation project={projectId} />
        </TabPane>
        <TabPane tab="本专业毕业要求与认证标准毕业要求覆盖情况" key="2">
          <MajorNationCoverRelation project={projectId} />
        </TabPane>
        <TabPane tab="专业毕业要求与毕业要求指标点关系矩阵" key="3">
          Content of tab 3
        </TabPane>
        <TabPane tab="毕业要求指标点与课程关系矩阵" key="4">
          Content of tab 4
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MatrixRelation
