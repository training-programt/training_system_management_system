import React, { useState, useRef, useMemo } from 'react'
import { Button, Steps, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import './index.less'
import api from '@/apis/trainingProject'
import { setSession, getSession } from '@/utils'

import InitPage from './initPage'
import TrainObject from './trainObject'
import Requirements from './requirements'
import CurriculumSystem from './curriculumSystem'
import MatrixRelation from './matrixRelation'
// import StudyProgramme from './studyProgramme'
import CreditStructure from './creditStructure'
import Examine from './examine'

const { Step } = Steps;

const AddTrainingProject = (props) => {
  const [current, setCurrent] = useState(0);
  const [acProject, setAcProject] = useState({})
  const [writer, setWriter] = useState(JSON.parse(getSession('userInfo'))._id)
  const [requirementId, setRequirementId] = useState('')
  const [objectId, setObjectId] = useState('')
  const [creditStructureId, setCreditStructureId] = useState('')

  const childRef = useRef()

  const steps = [
    {
      title: '基础信息',
      content: <InitPage ref={childRef} project={acProject._id || ''} />,
    },
    {
      title: '培养目标',
      content: <TrainObject ref={childRef} object={objectId || ''} />,
    },
    {
      title: '毕业要求',
      content: <Requirements ref={childRef} requirement={requirementId || ''} />,
    },
    {
      title: '课程体系',
      content: <CurriculumSystem requirement={requirementId || ''} />
    },
    {
      title: '矩阵关系',
      content: <MatrixRelation project={acProject} />,
    },
    {
      title: '学分结构',
      content: <CreditStructure ref={childRef} project={acProject} />,
    },
    {
      title: '审批',
      content: <Examine project={acProject._id || ''}/>,
    },
  ];

  const getProjectDetail = async (id) => {
    const params = {
      _id: id
    }
    const res = await React.$axios.post(api.getProjectDetail, params);
    if (res && res.isSucceed) {
      setAcProject(res.data)
      setObjectId(res.data.trainingObjective || '')
      setRequirementId(res.data.graduationRequirement || '')
      setCreditStructureId(res.data.credits_required || '')
    }
  }

  useMemo(() => {
    if (props.match.params.id) {
      getProjectDetail(props.match.params.id)
    }
  }, [])

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
      case 4: {
        getProjectDetail(acProject._id);
        setCurrent(current + 1);
        break;
      }
      case 5: {
        const data = childRef.current.saveProject()
        saveCreditStructure(data)
        break;
      }
      default: {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    if(current == 5) {
      getProjectDetail(acProject._id)
    }
    setCurrent(current - 1);
  };

  const initProject = async (data) => {
    const newTime = new Date().getTime()
    const params = {
      ...data,
      writer,
      newTime,
    }
    const res = await React.$axios.post(api.createProject, params)
    if (res && res.isSucceed) {
      setAcProject(res.data)
      setCurrent(current + 1);
    }
  }

  const saveObject = async (data) => {
    const params = {
      ...data,
      _id: acProject._id,
      objectId,
    }
    const res = await React.$axios.post(api.updateObject, params)
    if (res && res.isSucceed) {
      setObjectId(res.data._id)
      setCurrent(current + 1);
    }
  }

  const saveRequirement = async (data) => {
    const params = {
      ...data,
      _id: acProject._id,
      requirementId,
    }
    const res = await React.$axios.post(api.updateRequirement, params)
    if (res && res.isSucceed) {
      setRequirementId(res.data._id)
      setCurrent(current + 1);
    }
  }

  const saveCreditStructure = async (data) => {
    const params = {
      ...data,
      _id: acProject._id,
      creditStructureId,
    }
    const res = await React.$axios.post(api.saveCreditStructure, params)
    if (res && res.isSucceed) {
      setCreditStructureId(res.data._id)
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
        <Button icon={<SaveOutlined />}>暂存</Button>
        <Link to="/trainingProject" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
      </div>

    </div>
  )
}

export default withRouter(AddTrainingProject)
