import React from 'react'
import { Table } from 'antd'
import './index.less'

const { Column } = Table;

const TableComponent = (props) => {

  const { data, column, settings } = props;

  return (
    <Table
      dataSource={data}
      pagination={false}
      bordered
      rowKey="id"
      loading={props.loading}
      onRow={record => {
        return {
          onClick: event => { console.log(event); }, // 点击行
          onDoubleClick: event => { console.log(event); },
        };
      }}
    >
      {/* {
        (settings.isMultiple && column.length) ? <Column filterMultiple /> : ''
      } */}
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
