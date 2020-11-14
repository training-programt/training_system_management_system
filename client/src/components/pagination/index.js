import React from 'react'
import { Pagination } from 'antd'
import './index.less'
const Pagenation = (props) => {
  return (
    <Pagination
      total={props.pageparams.total}
      showTotal={total => `共 ${total} 条`}
      hideOnSinglePage
      pageSize={props.pageparams.pageSize}
      defaultCurrent={props.pageparams.page}
      onChange={(page) => props.handlePage(page)}
      showSizeChanger={false}
      className="pagenation-container"
    />
  )
}

export default Pagenation
