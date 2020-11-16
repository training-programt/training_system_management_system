import React from 'react'
import { Pagination } from 'antd'
import './index.less'
const PaginationComponent = (props) => {

  return (
    <Pagination
      total={props.pageparams.total}
      showTotal={total => `共 ${total} 条`}
      hideOnSinglePage
      size="small"
      pageSize={props.pageparams.pageSize}
      defaultCurrent={props.pageparams.page}
      onChange={(page) => props.handlePage(page)}
      showSizeChanger={false}
      className="pagenation-container"
    />
  )
}

export default PaginationComponent
