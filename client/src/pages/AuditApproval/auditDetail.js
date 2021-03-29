import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { RollbackOutlined } from '@ant-design/icons';

const AuditDetail = () => {
  return (
    <div>
      审核详情
      <Link to="/auditApproval/audit" style={{ color: '#000', marginLeft: '8px' }}><Button icon={<RollbackOutlined />}>返回</Button></Link>

    </div>
  )
}

export default AuditDetail
