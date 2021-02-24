import React, { useState } from 'react'
import { Button, Steps, message } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';

// import BasicInfo from './basicInfo'
// import  BasicInfo  from '../Syllabus/basicInfo'
const { Step } = Steps;
const SyllabusAdd = () => {
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: '基本信息',
            // content: <BasicInfo />,
        },
        {
            title: '教学目标',
            // content: <BasicInfo />,
        },
        {
            title: '教学目标与毕业要求对应关系',
            // content: <BasicInfo />,
        },
        {
            title: '理论教学及学时分配',
            // content: <BasicInfo />,
        },
        {
            title: '实践教学及学时分配',
            // content: <BasicInfo />,
        },
        {
            title: '审批',
            // content: <BasicInfo />,
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

export default SyllabusAdd
