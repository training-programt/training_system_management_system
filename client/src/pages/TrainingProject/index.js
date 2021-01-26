import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd'

const TrainingProject = () => {
  return (
    <div className="training-project">
      测试
      <Button><Link to="trainingProject/add">新增</Link></Button>
      <Button><Link to="trainingProject/edit">编辑</Link></Button>
    </div>
  )
}

export default TrainingProject
