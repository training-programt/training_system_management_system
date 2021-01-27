import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const AddTrainingProject = () => {
  return (
    <div>
      新建培养方案
      <Button><Link to="/trainingProject">返回</Link></Button>
    </div>
  )
}

export default AddTrainingProject
