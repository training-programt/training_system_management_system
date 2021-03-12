import React, { useState, useRef } from 'react'
import { Button, Steps, message } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import './index.less'
import api from '@/apis/trainingProject'
import { setSession, getSession } from '@/utils'


import InitPage from './initPage'
import TrainObject from './trainObject'
import Requirements from './requirements'
import CurriculumSystem from './curriculumSystem'
import MatrixRelation from './matrixRelation'
import StudyProgramme from './studyProgramme'
import Examine from './examine'

const { Step } = Steps;

const AddTrainingProject = () => {
  const [current, setCurrent] = useState(0);
  const [acProject, setAcProject] = useState({})
  const [writer, setWriter] = useState(JSON.parse(getSession('userInfo'))._id)
  const [requirementId, setRequirementId] = useState('')

  const childRef = useRef()

  const steps = [
    {
      title: '基础信息',
      content: <InitPage ref={childRef} />,
    },
    {
      title: '培养目标',
      content: <TrainObject ref={childRef} />,
    },
    {
      title: '毕业要求',
      content: <Requirements ref={childRef} />,
    },
    {
      title: '课程体系',
      content: <CurriculumSystem requirementId={requirementId} />
    },
    {
      title: '矩阵关系',
      content: <MatrixRelation project={acProject._id} />,
    },
    {
      title: '课程修读计划',
      content: <StudyProgramme />,
    },
    {
      title: '审批',
      content: <Examine />,
    },
  ];

  const next = () => {
    switch (current) {
      case 0: {
        const data = childRef.current.saveProject()
        initProject(data)
        break;
      }
      case 1: {
        const data = childRef.current.saveProject()
        saveObject(data)
        break;
      }
      case 2: {
        const data = childRef.current.saveProject()
        saveRequirement(data)
        break;
      }
      default: {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const initProject = async (data) => {
    if (!acProject) return false;
    const newTime = new Date().getTime()
    const params = {
      ...data,
      writer,
      newTime,
    }
    const res = await React.$axios.post(api.createProject, params)
    if(res && res.isSucceed) {
      setAcProject(res.data)
      setCurrent(current + 1);
    }
  }

  const saveObject = async (data) => {
    if (!acProject) return false;
    const params = {
      ...data,
      _id: acProject._id,
    }
    const res = await React.$axios.post(api.updateObject, params)
    if(res && res.isSucceed) {
      setCurrent(current + 1);
    }
  }

  const saveRequirement = async (data) => {
    if (!acProject) return false;
    const params = {
      ...data,
      _id: acProject._id,
    }
    const res = await React.$axios.post(api.updateRequirement, params)
    if(res && res.isSucceed) {
      setRequirementId(res.data._id)
      setCurrent(current + 1);
    }
  }

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
        <Link to="/trainingProject" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
      </div>

    </div>
  )
}

export default AddTrainingProject
