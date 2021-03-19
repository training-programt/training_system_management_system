import React from 'react'
import { Pagination } from 'antd'
import './index.less'
const PaginationComponent = (props) => {

  
  return (
    // <Pagination
    //   total={props.pageparams.total}
    //   showTotal={total => `共 ${total} 条`}
    //   hideOnSinglePage
    //   pageSize={props.pageparams.pageSize}
    //   defaultCurrent={props.pageparams.page}
    //   onChange={(page) => props.handlePage(page)}
    //   className="pagenation-container"
    // />
    <Pagination
      total={props.pageparams.total}
      showQuickJumper
      pageSize={props.pageparams.pageSize}
      defaultCurrent={props.pageparams.page}
      onChange={(page) => props.handlePage(page)}
      showTotal={total => `共 ${total} 条`}
      hideOnSinglePage
      className="pagenation-container"
    />
  )
}

export default PaginationComponent
