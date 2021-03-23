import React, { useState,useEffect} from 'react'
import { Button, Steps, message } from 'antd'
import { Link,useLocation,useHistory, BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';

import BasicInfo from './basicInfo'
import TeachGoal from './teachGoal'
import Relation from './relation'
import Theory from './theory'
import Practice from './practice'
import ExamAndApp from './examAndApp'
import Assessment from './assessment'
import GoalAndAssessment from './goalAndAssessment'
import Book from './book'
const { Step } = Steps;
const SyllabusAdd = () => {
    const [current, setCurrent] = useState(0);
    let history = useHistory();
    const steps = [
        {
            title: '基本信息',
            content: <BasicInfo/>,
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
            title: '考核环节设置',
            content: <Assessment />,
        },
        {
            title: '课程目标与考核对应关系',
            content: <GoalAndAssessment />,
        },
        {
            title: '建议教材及教学参考书',
            content: <Book />,
        },
        {
            title: '审批',
            content: <ExamAndApp />,
        },
        
    ];

    const next = () => {
        setCurrent(current + 1);
        console.log(current);
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

                <Button icon={<RollbackOutlined />} style={{ color: '#000', marginLeft: '8px' }} onClick={()=>{history.push('/syllabus')}}>返回</Button>
            </div>

        </div>
    )
}

export default SyllabusAdd
