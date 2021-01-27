import React, { useState } from 'react'
import { Button, Steps, message } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons';
import './index.less'
const { Step } = Steps;

const AddTrainingProject = () => {
  const [current, setCurrent] = useState(0);

  const initPage = (
    <div>初始化页面</div>
  )

  const steps = [
    {
      title: '初始化',
      content: initPage,
    },
    {
      title: '培养目标',
      content: 'First-content',
    },
    {
      title: '毕业要求',
      content: 'Second-content',
    },
    {
      title: '学制与学位',
      content: 'Last-content',
    },
    {
      title: '主干学科与主要课程',
      content: 'Last-content',
    },
    {
      title: '毕业学分要求',
      content: 'Last-content',
    },
    {
      title: '课程修读计划',
      content: 'Last-content',
    },
    {
      title: '审批',
      content: 'Last-content',
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

        <Button icon={<RollbackOutlined />}><Link to="/trainingProject" style={{ color: '#000', marginLeft: '8px' }}>返回</Link></Button>
      </div>

    </div>
  )
}

export default AddTrainingProject
