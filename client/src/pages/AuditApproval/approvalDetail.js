import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { RollbackOutlined } from '@ant-design/icons';


const ApprovalDetail = () => {
  return (
    <div>
      添加
      <Link to="/auditApproval/approval" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>
    </div>
  )
}

export default ApprovalDetail
