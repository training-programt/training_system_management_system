import React, { useState } from 'react'
import { Button, Steps, message } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import './index.less'

import InitPage from './initPage'
import TrainObject from './trainObject'
import Requirements from './requirements'
import MatrixRelation from './matrixRelation'
import StudyProgramme from './studyProgramme'

const { Step } = Steps;

const AddTrainingProject = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: '基础信息',
      content: <InitPage />,
    },
    {
      title: '培养目标',
      content: <TrainObject />,
    },
    {
      title: '毕业要求',
      content: <Requirements />,
    },
    {
      title: '矩阵关系',
      content: <MatrixRelation />,
    },
    {
      title: '课程修读计划',
      content: <StudyProgramme />,
    },
    {
      title: '审批',
      content: '选择审批人提交方案',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="training-project">
      <Steps current={current} size="small">
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} icon={<ArrowLeftOutlined />} onClick={() => prev()}>上一步</Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => next()}>下一步</Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>提交审批</Button>
        )}

        <Button icon={<SaveOutlined />}>暂存</Button>
        <Button icon={<RollbackOutlined />}><Link to="/trainingProject" style={{ color: '#000', marginLeft: '8px' }}>返回</Link></Button>
      </div>

    </div>
  )
}

export default AddTrainingProject
