import React from 'react'
import { Spin } from "antd";

const Loading = () => {
  return (
    <div>
      <Spin size="large" tip="Loading..."/>
    </div>
  )
}

export default Loading
