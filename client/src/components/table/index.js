import React from 'react'
import { Table } from 'antd'
import './index.less'

const { Column } = Table;

const TableComponent = (props) => {

  const { data, column, settings, loading } = props;
  
  return (
    <Table
      dataSource={data}
      pagination={false}
      bordered
      rowKey="id"
      loading={loading}
      onRow={record => {
        return {
          onClick: event => { }, // 点击行
          onDoubleClick: event => { },
          onContextMenu: event => { },
          onMouseEnter: event => { }, // 鼠标移入行
          onMouseLeave: event => { },
        };
      }}
    >
      {
        column.map((item, index) => {
          return (
            <Column
              title={item.title}
              dataIndex={item.dataIndex}
              width={item.width}
              key={index}
              render={item.render}
            />
          )
        })
      }
    </Table>
  )
}

export default TableComponent
