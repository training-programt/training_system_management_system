import React, { useState,useEffect} from 'react'
import { Button, Steps, message } from 'antd'
import { Link,useLocation, BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';

import BasicInfo from './basicInfo'
import TeachGoal from './teachGoal'
import Relation from './relation'
import Theory from './theory'
import Practice from './practice'
import ExamAndApp from './examAndApp'
const { Step } = Steps;
const SyllabusAdd = () => {
    const [current, setCurrent] = useState(0);
    const steps = [
        {
            title: '基本信息',
            content: <BasicInfo />,
        },
        {
            title: '教学目标',
            content: <TeachGoal />,
        },
        {
            title: '教学目标与毕业要求对应关系',
            content: <Relation />,
        },
        {
            title: '理论教学及学时分配',
            content: <Theory />,
        },
        {
            title: '实践教学及学时分配',
            content: <Practice />,
        },
        {
            title: '审批',
            content: <ExamAndApp />,
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

                <Button icon={<RollbackOutlined />} style={{ color: '#000', marginLeft: '8px' }}>返回</Button>
            </div>

        </div>
    )
}

export default SyllabusAdd
