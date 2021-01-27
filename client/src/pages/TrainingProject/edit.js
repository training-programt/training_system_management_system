import React from 'react'
import { withRouter,Link} from 'react-router-dom'
import { Button } from 'antd'
const EditTrainingProject = (props) => {
  console.log(props.location.state)
  return (
    <div>
      编辑培养方案
      <Button><Link to="/trainingProject">返回</Link></Button>
    </div>
  )
}

export default withRouter(EditTrainingProject)
