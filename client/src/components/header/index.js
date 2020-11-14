import React, { useState, useEffect } from 'react'
import './index.less'

const HeaderComponent = (props) => {

  const [nowtime, setNowTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    return () => {
      setNowTime(new Date().toLocaleString())
    }
  })

  return (
    <div className="title-container">
      <div className="header-title">{props.title}</div>
      <div className="header-time">当前统计截止时间：{nowtime}</div>
    </div>
  )
}

export default HeaderComponent
